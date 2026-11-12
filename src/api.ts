import { Capacitor } from '@capacitor/core'
import { healthSchema, type Health } from '../shared/contracts'
import { resolveApiOrigin } from './runtimeConfig'
export function apiOrigin() { return resolveApiOrigin(Capacitor.isNativePlatform(), import.meta.env.VITE_API_BASE_URL) }
export async function checkApiHealth(signal?: AbortSignal): Promise<Health> {
  const origin = apiOrigin()
  if (origin === null) throw new Error('No mobile API configured. Bundled sample mode works offline.')
  const response = await fetch(`${origin}/api/health`, { signal, cache: 'no-store' })
  if (!response.ok) throw new Error('API unavailable')
  return healthSchema.parse(await response.json())
}
