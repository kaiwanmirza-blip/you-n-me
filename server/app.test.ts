import { describe, expect, it } from 'vitest'
import { createApp } from './app'
import { apiErrorSchema, healthSchema } from '../shared/contracts'
import { profile, progress, saved } from '../tests/fixtures'

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
