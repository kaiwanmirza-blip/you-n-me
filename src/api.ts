import { healthSchema, type Health } from '../shared/contracts'

// Development uses the Vite proxy; a future deployment must explicitly route /api.
export async function checkApiHealth(signal?: AbortSignal): Promise<Health> {
  const response = await fetch('/api/health', { signal, cache: 'no-store' })
  if (!response.ok) throw new Error('API unavailable')
  return healthSchema.parse(await response.json())
}
