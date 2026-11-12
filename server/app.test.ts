import { describe, expect, it } from 'vitest'
import { createApp } from './app'
import { apiErrorSchema, healthSchema } from '../shared/contracts'
import { profile, progress, saved } from '../tests/fixtures'
import { conversationTurnSchema, recompAssessmentSchema } from '../shared/contracts'
import { personaTokenStateSchema } from '../shared/contracts'

describe('persona token preview endpoint', () => {
  const app = createApp()
  const path = '/api/persona/token-eval'
  const input = { action: 'claim-initial-set', firstSetClaimed: false, studioTokens: 0, dailyAdsWatched: 0, weeklyAdsWatched: 0 }
  const post = (body: unknown) => app.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  it('claims Day Zero free and returns a typed sample with no session cookie', async () => {
    const response = await post(input)
    expect(response.status).toBe(200)
    expect(response.headers.get('Set-Cookie')).toBeNull()
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(personaTokenStateSchema.parse(await response.json())).toMatchObject({ allowed: true, firstSetClaimed: true, tokenCost: 0, provenance: { source: 'sample', persisted: false } })
  })
  it('redeems weekly watches and returns a denial rather than fabricated restyle success', async () => {
    const minted = await post({ ...input, action: 'evaluate', dailyAdsWatched: 10, weeklyAdsWatched: 60 })
    expect(personaTokenStateSchema.parse(await minted.json())).toMatchObject({ tokensMinted: 1, studioTokens: 1, remainingWeeklyAds: 0 })
    const denied = await post({ ...input, action: 'restyle', firstSetClaimed: true })
    expect(denied.status).toBe(200)
    expect(personaTokenStateSchema.parse(await denied.json())).toMatchObject({ allowed: false, reason: 'insufficient-tokens' })
  })
  it.each([{}, { ...input, dailyAdsWatched: 11 }, { ...input, mode: 'live' }, { ...input, studioTokens: -1 }])('rejects invalid payload %# with structured errors', async payload => {
    const response = await post(payload)
    expect(response.status).toBe(400)
    expect(apiErrorSchema.parse(await response.json()).error.code).toBe('VALIDATION_ERROR')
  })
  it('enforces JSON, size and method boundaries without echoing private data', async () => {
    expect((await app.request(path, { method: 'POST', body: '{}' })).status).toBe(415)
    const malformed = await app.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
    expect(malformed.status).toBe(400)
    expect(apiErrorSchema.parse(await malformed.json()).error.code).toBe('INVALID_JSON')
    expect((await post({ privateField: 'x'.repeat(70000) })).status).toBe(413)
    expect(await (await post({ ...input, privateField: 'secret-test-marker' })).text()).not.toContain('secret-test-marker')
    expect((await app.request(path)).status).toBe(404)
  })
})

describe('local API boundary', () => {
  const app = createApp()
  const post = (path: string, body: unknown) => app.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  it('returns only a minimal typed health response with no session or configuration', async () => {
    const response = await app.request('/api/health')
    expect(response.status).toBe(200)
    expect(healthSchema.parse(await response.json())).toEqual({ status: 'ok', service: 'you-n-me-api' })
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(response.headers.get('Set-Cookie')).toBeNull()
  })
  it.each([
    ['/api/profiles', profile], ['/api/plan-requests', { mode: 'demo', profile }],
    ['/api/plans', saved], ['/api/progress-events', progress],
    ['/api/entitlements', { simulated: true, tier: 'Free', comparisonEnabled: false }],
  ])('validates %s but never fabricates implemented success', async (path, body) => {
    const response = await post(path as string, body)
    expect(response.status).toBe(501)
    expect(apiErrorSchema.parse(await response.json()).error.code).toBe('CAPABILITY_UNAVAILABLE')
    expect(response.headers.get('Set-Cookie')).toBeNull()
  })
  it.each(['/api/profiles', '/api/plan-requests', '/api/plans', '/api/progress-events', '/api/entitlements'])('rejects invalid payloads on %s', async path => {
    const response = await post(path, {})
    expect(response.status).toBe(400)
    const body = apiErrorSchema.parse(await response.json())
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.issues?.length).toBeGreaterThan(0)
  })
  it('does not echo sensitive input in errors', async () => {
    const response = await post('/api/profiles', { ...profile, displayName: 123, secret: 'private-test-value' })
    expect(await response.text()).not.toContain('private-test-value')
  })
  it('returns predictable malformed JSON, media type and body-size errors', async () => {
    const malformed = await app.request('/api/profiles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
    expect(malformed.status).toBe(400)
    expect(apiErrorSchema.parse(await malformed.json()).error.code).toBe('INVALID_JSON')
    const media = await app.request('/api/profiles', { method: 'POST', body: '{}' })
    expect(media.status).toBe(415)
    const oversized = await post('/api/profiles', { value: 'x'.repeat(70000) })
    expect(oversized.status).toBe(413)
    expect(apiErrorSchema.parse(await oversized.json()).error.code).toBe('PAYLOAD_TOO_LARGE')
  })
  it('keeps retrieval explicitly unavailable and unknown routes/methods distinct', async () => {
    expect((await app.request('/api/plans/plan-1')).status).toBe(501)
    expect((await app.request('/api/profiles')).status).toBe(501)
    const response = await app.request('/api/missing')
    expect(response.status).toBe(404)
    expect(apiErrorSchema.parse(await response.json()).error.code).toBe('NOT_FOUND')
    expect((await app.request('/api/health', { method: 'DELETE' })).status).toBe(404)
  })
  it('sanitizes unexpected errors', async () => {
    const broken = createApp()
    broken.get('/api/test-failure', () => { throw new Error('sensitive-internal-detail') })
    const response = await broken.request('/api/test-failure')
    expect(response.status).toBe(500)
    expect(apiErrorSchema.parse(await response.json()).error.code).toBe('INTERNAL_ERROR')
    expect(JSON.stringify(await (await broken.request('/api/test-failure')).json())).not.toContain('sensitive-internal-detail')
  })
})

describe('stateless deterministic preview routes', () => {
  const app = createApp()
  const post = (path: string, body: unknown) => app.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const intake = { guideSelection: 'Both', userMessage: 'motivation: Stay consistent; equipment: none; exclusions: none; 20 minutes' }
  const baseline = { dayIndex: 0, recordedAt: '2026-01-01T00:00:00Z', photoCheckInCompleted: true,
    measurements: { waistCm: 90, chestCm: 100, shouldersCm: 110, hipsCm: 100, armCm: 30, thighCm: 55, calfCm: 35, scaleWeightKg: 80 } }
  const assessment = { baseline, latest: { ...baseline, dayIndex: 14, recordedAt: '2026-01-15T00:00:00Z', measurements: { ...baseline.measurements, waistCm: 88 } }, checkInDay: 14, checkInDue: true }

  it.each(['Jane', 'Kay', 'Both'])('converses with %s and returns a validated sample response', async guideSelection => {
    const response = await post('/api/intake/converse', { ...intake, guideSelection })
    expect(response.status).toBe(200)
    const body = conversationTurnSchema.parse(await response.json())
    expect(body.guideResponses.map(r => r.guide)).toEqual(guideSelection === 'Both' ? ['Jane', 'Kay'] : [guideSelection])
    expect(body.memoryChips.durationMinutes).toBe(20)
    expect(body.readiness.readyToBuildProgram).toBe(true)
    expect(body.provenance.source).toBe('sample')
    expect(body.provenance.persisted).toBe(false)
  })
  it('does not remember previous requests and requests missing information explicitly', async () => {
    await post('/api/intake/converse', intake)
    const body = conversationTurnSchema.parse(await (await post('/api/intake/converse', { guideSelection: 'Kay', userMessage: 'What next?' })).json())
    expect(body.memoryChips).toEqual({})
    expect(body.readiness.readyToBuildProgram).toBe(false)
    expect(body.readiness.missingDataPoints).toContain('durationMinutes')
  })
  it('assesses a possible recomposition pattern and applies a one-star due-check-in penalty', async () => {
    const response = await post('/api/recomp/assess', assessment)
    expect(response.status).toBe(200)
    const body = recompAssessmentSchema.parse(await response.json())
    expect(body.assessment).toBe('possible-recomposition')
    expect(body.waistChangeCm).toBe(-2)
    expect(body.checkInStarImpact).toBe(0)
    const missing = recompAssessmentSchema.parse(await (await post('/api/recomp/assess', { ...assessment, latest: undefined })).json())
    expect(missing.checkInStarImpact).toBe(-1)
    expect(missing.assessment).toBe('insufficient-data')
  })
  it.each([['/api/intake/converse', intake], ['/api/recomp/assess', assessment]] as const)('%s is deterministic and does not create sessions', async (path, payload) => {
    const first = await post(path, payload)
    expect(first.headers.get('Cache-Control')).toBe('no-store')
    expect(first.headers.get('Set-Cookie')).toBeNull()
    expect(await first.json()).toEqual(await (await post(path, payload)).json())
  })
  it.each([['/api/intake/converse', intake], ['/api/recomp/assess', assessment]] as const)('%s rejects live and invalid requests with the existing safe error shape', async (path, payload) => {
    for (const data of [{}, { ...payload, mode: 'live' }, { ...payload, privateField: 'sensitive-test-input' }]) {
      const response = await post(path, data)
      expect(response.status).toBe(400)
      const body = apiErrorSchema.parse(await response.json())
      expect(body.error.code).toBe('VALIDATION_ERROR')
      expect(body.error.issues?.length).toBeGreaterThan(0)
      expect(JSON.stringify(body)).not.toContain('sensitive-test-input')
    }
  })
  it.each(['/api/intake/converse', '/api/recomp/assess'])('%s keeps media, malformed JSON, size and method boundaries', async path => {
    const malformed = await app.request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
    expect(malformed.status).toBe(400)
    expect(apiErrorSchema.parse(await malformed.json()).error.code).toBe('INVALID_JSON')
    expect((await app.request(path, { method: 'POST', body: '{}' })).status).toBe(415)
    const oversized = await post(path, { userMessage: 'x'.repeat(70000) })
    expect(oversized.status).toBe(413)
    expect(apiErrorSchema.parse(await oversized.json()).error.code).toBe('PAYLOAD_TOO_LARGE')
    expect((await app.request(path)).status).toBe(404)
  })
  it('rejects bad measurements, chronology, invalid guide and blank text at the API boundary', async () => {
    for (const data of [{ ...assessment, baseline: { ...baseline, dayIndex: 1 } }, { ...assessment, latest: { ...assessment.latest, measurements: {} } }]) {
      expect((await post('/api/recomp/assess', data)).status).toBe(400)
    }
    for (const data of [{ ...intake, guideSelection: 'Ava' }, { ...intake, userMessage: '   ' }]) {
      expect((await post('/api/intake/converse', data)).status).toBe(400)
    }
  })
})
