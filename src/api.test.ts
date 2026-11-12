import { afterEach, expect, it, vi } from 'vitest'
import { checkApiHealth } from './api'

afterEach(() => vi.unstubAllGlobals())
it('uses the same-origin development API and validates its response', async () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: 'ok', service: 'you-n-me-api' })))
  vi.stubGlobal('fetch', fetchMock)
  expect((await checkApiHealth()).status).toBe('ok')
  expect(fetchMock).toHaveBeenCalledWith('/api/health', { signal: undefined, cache: 'no-store' })
})
it('rejects unavailable and malformed health responses instead of showing success', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('offline', { status: 503 })))
  await expect(checkApiHealth()).rejects.toThrow('API unavailable')
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ status: 'ok', secret: 'unexpected' }))))
  await expect(checkApiHealth()).rejects.toThrow()
})
