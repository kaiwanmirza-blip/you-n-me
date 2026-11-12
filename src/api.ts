import { Capacitor } from '@capacitor/core'
import {
  assessRecomposition,
  conversationTurnSchema,
  healthSchema,
  makeConversationTurn,
  recompAssessmentSchema,
  type ConversationTurn,
  type Health,
  type IntakeRequest,
  type RecompAssessment,
  type RecompAssessmentRequest,
} from '../shared/contracts'
import { resolveApiOrigin } from './runtimeConfig'
export function apiOrigin() { return resolveApiOrigin(Capacitor.isNativePlatform(), import.meta.env.VITE_API_BASE_URL) }
export async function checkApiHealth(signal?: AbortSignal): Promise<Health> {
  const origin = apiOrigin()
  if (origin === null) throw new Error('No mobile API configured. Bundled sample mode works offline.')
  const response = await fetch(`${origin}/api/health`, { signal, cache: 'no-store' })
  if (!response.ok) throw new Error('API unavailable')
  return healthSchema.parse(await response.json())
}
export async function submitIntakeTurn(payload: IntakeRequest, signal?: AbortSignal): Promise<ConversationTurn> {
  const origin = apiOrigin()
  if (origin === null) return makeConversationTurn(payload)
  try {
    const response = await fetch(`${origin}/api/intake/converse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
      cache: 'no-store',
    })
    if (!response.ok) return makeConversationTurn(payload)
    return conversationTurnSchema.parse(await response.json())
  } catch {
    return makeConversationTurn(payload)
  }
}
export async function evaluateRecompProgress(payload: RecompAssessmentRequest, signal?: AbortSignal): Promise<RecompAssessment> {
  const origin = apiOrigin()
  if (origin === null) return assessRecomposition(payload)
  try {
    const response = await fetch(`${origin}/api/recomp/assess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
      cache: 'no-store',
    })
    if (!response.ok) return assessRecomposition(payload)
    return recompAssessmentSchema.parse(await response.json())
  } catch {
    return assessRecomposition(payload)
  }
}
