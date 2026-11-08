import { randomBytes, createHash } from 'node:crypto'
import type { DatabaseSync } from 'node:sqlite'
import { entitlementSchema, profileSchema, savedPlanSchema, progressEventSchema, type Profile, type SavedPlan, type ProgressEvent, type SimulatedEntitlement } from '../shared/contracts.js'
import { transaction } from './database.js'

export const DAY = 86_400_000
export const IDLE = 7 * DAY
export const MAX_AGE = 30 * DAY
const free = { simulated: true, tier: 'Free', comparisonEnabled: false } as const
export class StorageFault extends Error {
  constructor(public readonly code: 'UNAUTHENTICATED' | 'NOT_FOUND' | 'CONFLICT', public readonly status: 401 | 404 | 409) { super(code) }
}
export class Persistence {
  constructor(public readonly db: DatabaseSync, public readonly now: () => number = Date.now) {}
  private hash(token: string) { return createHash('sha256').update(token).digest('hex') }
  createSession() {
    const token = randomBytes(32).toString('base64url')
    const time = this.now(), expiresAt = time + IDLE
    this.db.prepare('INSERT INTO sessions(id,created_at,expires_at) VALUES (?,?,?)').run(this.hash(token), time, expiresAt)
    return { token, expiresAt }
  }
  sessionInfo(token: string | undefined) {
    if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null
    const row = this.db.prepare('SELECT id,created_at,expires_at FROM sessions WHERE id=?').get(this.hash(token))
    return row && Number(row.expires_at) > this.now() && Number(row.created_at) + MAX_AGE > this.now()
      ? { id: String(row.id), createdAt: Number(row.created_at), expiresAt: Number(row.expires_at) } : null
  }
  private act<T>(token: string | undefined, fn: (id: string) => T): T {
    return transaction(this.db, () => {
      const session = this.sessionInfo(token)
      if (!session) throw new StorageFault('UNAUTHENTICATED', 401)
      const result = fn(session.id)
      this.db.prepare('UPDATE sessions SET expires_at=? WHERE id=?').run(Math.min(this.now() + IDLE, session.createdAt + MAX_AGE), session.id)
      return result
    })
  }
  cleanup() {
    return transaction(this.db, () => Number(this.db.prepare('DELETE FROM sessions WHERE expires_at<=? OR created_at<=?').run(this.now(), this.now() - MAX_AGE).changes))
  }
  deleteSession(token: string | undefined) {
    this.act(token, id => this.db.prepare('DELETE FROM sessions WHERE id=?').run(id))
  }
  getProfile(token: string | undefined) {
    return this.act(token, id => {
      const row = this.db.prepare('SELECT body FROM profiles WHERE session_id=?').get(id)
      return row ? profileSchema.parse(JSON.parse(String(row.body))) : null
    })
  }
  putProfile(token: string | undefined, value: Profile) {
    const profile = profileSchema.parse(value)
    return this.act(token, id => {
      this.db.prepare('INSERT INTO profiles(session_id,body) VALUES (?,?) ON CONFLICT(session_id) DO UPDATE SET body=excluded.body').run(id, JSON.stringify(profile))
      return profile
    })
  }
  private readPlan(id: string, planId: string, version?: number): SavedPlan {
    const row = version === undefined
      ? this.db.prepare('SELECT body FROM plan_versions WHERE session_id=? AND plan_id=? ORDER BY version DESC LIMIT 1').get(id, planId)
      : this.db.prepare('SELECT body FROM plan_versions WHERE session_id=? AND plan_id=? AND version=?').get(id, planId, version)
    if (!row) throw new StorageFault('NOT_FOUND', 404)
    return savedPlanSchema.parse(JSON.parse(String(row.body)))
  }
  getPlan(token: string | undefined, planId: string, version?: number) { return this.act(token, id => this.readPlan(id, planId, version)) }
  listPlans(token: string | undefined) {
    return this.act(token, id => this.db.prepare('SELECT body FROM plan_versions WHERE session_id=? ORDER BY plan_id,version').all(id).map(r => savedPlanSchema.parse(JSON.parse(String(r.body)))))
  }
  private insertPlan(id: string, plan: SavedPlan) {
    const encoded = JSON.stringify(plan)
    const existing = this.db.prepare('SELECT body FROM plan_versions WHERE session_id=? AND plan_id=? AND version=?').get(id, plan.id, plan.version)
    if (existing) {
      if (existing.body !== encoded) throw new StorageFault('CONFLICT', 409)
      return plan
    }
    const maximum = Number(this.db.prepare('SELECT COALESCE(MAX(version),0) AS v FROM plan_versions WHERE session_id=? AND plan_id=?').get(id, plan.id)!.v)
    if (!maximum && plan.version !== 1) throw new StorageFault('NOT_FOUND', 404)
    if (plan.version !== maximum + 1) throw new StorageFault('CONFLICT', 409)
    this.db.prepare('INSERT INTO plan_versions(session_id,plan_id,version,body) VALUES (?,?,?,?)').run(id, plan.id, plan.version, encoded)
    return plan
  }
  savePlan(token: string | undefined, value: SavedPlan) {
    const plan = savedPlanSchema.parse(value)
    return this.act(token, id => this.insertPlan(id, plan))
  }
  deletePlan(token: string | undefined, planId: string) {
    this.act(token, id => {
      if (!this.db.prepare('DELETE FROM plan_versions WHERE session_id=? AND plan_id=?').run(id, planId).changes) throw new StorageFault('NOT_FOUND', 404)
    })
  }
  private progress(id: string, planId: string, version: number) {
    const plan = this.readPlan(id, planId, version)
    const actions = plan.plan.journey === 'fitness' ? plan.plan.actions : plan.plan.meals
    const completedActionIds = this.db.prepare('SELECT action_id FROM completions WHERE session_id=? AND plan_id=? AND version=? ORDER BY action_id').all(id, planId, version).map(r => String(r.action_id))
    return { completedActionIds, completedCount: completedActionIds.length, totalActions: actions.length }
  }
  getProgress(token: string | undefined, planId: string, version: number) { return this.act(token, id => this.progress(id, planId, version)) }
  applyProgress(token: string | undefined, value: ProgressEvent) {
    const event = progressEventSchema.parse(value)
    return this.act(token, id => {
      const plan = this.readPlan(id, event.planId, event.planVersion)
      const actions = plan.plan.journey === 'fitness' ? plan.plan.actions : plan.plan.meals
      if (event.journey !== plan.plan.journey || !actions.some(a => a.id === event.actionId)) throw new StorageFault('NOT_FOUND', 404)
      const encoded = JSON.stringify(event)
      const prior = this.db.prepare('SELECT body FROM progress_events WHERE session_id=? AND event_id=?').get(id, event.eventId)
      if (prior) {
        if (prior.body !== encoded) throw new StorageFault('CONFLICT', 409)
        // A retry must not reapply an old completion after a later undo.
        return this.progress(id, event.planId, event.planVersion)
      }
      this.db.prepare('INSERT INTO progress_events(session_id,event_id,plan_id,version,action_id,operation,body) VALUES (?,?,?,?,?,?,?)').run(id, event.eventId, event.planId, event.planVersion, event.actionId, event.operation, encoded)
      if (event.operation === 'complete') this.db.prepare('INSERT INTO completions(session_id,plan_id,version,action_id) VALUES (?,?,?,?) ON CONFLICT DO NOTHING').run(id, event.planId, event.planVersion, event.actionId)
      else this.db.prepare('DELETE FROM completions WHERE session_id=? AND plan_id=? AND version=? AND action_id=?').run(id, event.planId, event.planVersion, event.actionId)
      return this.progress(id, event.planId, event.planVersion)
    })
  }
  getEntitlement(token: string | undefined) {
    return this.act(token, id => {
      const row = this.db.prepare('SELECT body FROM entitlements WHERE session_id=?').get(id)
      return row ? entitlementSchema.parse(JSON.parse(String(row.body))) : free
    })
  }
  putEntitlement(token: string | undefined, value: SimulatedEntitlement) {
    const entitlement = entitlementSchema.parse(value)
    return this.act(token, id => {
      this.db.prepare('INSERT INTO entitlements(session_id,body) VALUES (?,?) ON CONFLICT(session_id) DO UPDATE SET body=excluded.body').run(id, JSON.stringify(entitlement))
      return entitlement
    })
  }
  seed(token: string | undefined, profile: Profile, plan: SavedPlan) {
    if (profile.dataOrigin !== 'fictional' || plan.profileSnapshot.dataOrigin !== 'fictional' || plan.provenance.source !== 'sample') throw new StorageFault('CONFLICT', 409)
    return this.act(token, id => {
      const existing = this.db.prepare('SELECT body FROM profiles WHERE session_id=?').get(id)
      const other = this.db.prepare('SELECT 1 FROM plan_versions WHERE session_id=? AND plan_id<>?').get(id, plan.id)
      if ((existing && existing.body !== JSON.stringify(profile)) || other) throw new StorageFault('CONFLICT', 409)
      this.insertPlan(id, plan)
      this.db.prepare('INSERT INTO profiles(session_id,body) VALUES (?,?) ON CONFLICT DO NOTHING').run(id, JSON.stringify(profile))
      return { fictional: true as const, seeded: true as const, planId: plan.id }
    })
  }
}
