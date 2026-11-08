import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import { z } from 'zod'
import { apiErrorSchema, entitlementSchema, healthSchema, planRequestSchema, profileSchema, progressEventSchema, savedPlanSchema, type ApiError } from '../shared/contracts.js'

function error(code: ApiError['error']['code'], message: string, issues?: ApiError['error']['issues']): ApiError {
  return apiErrorSchema.parse({ error: { code, message, ...(issues ? { issues } : {}) } })
}

export function createApp() {
  const app = new Hono()
  app.use('/api/*', async (c, next) => { c.header('Cache-Control', 'no-store'); await next() })
  app.use('/api/*', bodyLimit({ maxSize: 64 * 1024, onError: c => c.json(error('PAYLOAD_TOO_LARGE', 'Request exceeds 64 KiB.'), 413) }))
  app.get('/api/health', c => c.json(healthSchema.parse({ status: 'ok', service: 'you-n-me-api' })))

  const routes = [
    ['/api/profiles', profileSchema],
    ['/api/plan-requests', planRequestSchema],
    ['/api/plans', savedPlanSchema],
    ['/api/progress-events', progressEventSchema],
    ['/api/entitlements', entitlementSchema],
  ] as const
  for (const [path, schema] of routes) {
    app.post(path, async c => {
      if (!c.req.header('content-type')?.split(';')[0]?.trim().toLowerCase().match(/^application\/json$/)) {
        return c.json(error('UNSUPPORTED_MEDIA_TYPE', 'Use application/json.'), 415)
      }
      let data: unknown
      try { data = await c.req.json() } catch { return c.json(error('INVALID_JSON', 'Body must be valid JSON.'), 400) }
      const parsed = (schema as z.ZodType).safeParse(data)
      if (!parsed.success) {
        // Return issue locations/codes only; never echo input values or parser internals.
        return c.json(error('VALIDATION_ERROR', 'Request does not match the contract.', parsed.error.issues.map(i => ({ path: i.path.map(p => typeof p === 'number' ? p : String(p)), code: i.code }))), 400)
      }
      return c.json(error('CAPABILITY_UNAVAILABLE', 'Contract validated; this capability is not implemented. Nothing was generated or saved.'), 501)
    })
  }
  app.get('/api/profiles', c => c.json(error('CAPABILITY_UNAVAILABLE', 'Profile storage is not implemented.'), 501))
  app.get('/api/plans/:id', c => c.json(error('CAPABILITY_UNAVAILABLE', 'Saved plan retrieval is not implemented.'), 501))
  app.notFound(c => c.json(error('NOT_FOUND', 'Route or method not found.'), 404))
  app.onError(() => new Response(JSON.stringify(error('INTERNAL_ERROR', 'An internal error occurred.')), { status: 500, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }))
  return app
}
