import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { createApp } from './app.js'
export function createWebApp() {
  const app = new Hono()
  const api = createApp()
  app.all('/api/*', c => api.fetch(c.req.raw))
  app.all('/api', c => api.fetch(c.req.raw))
  app.use('*', serveStatic({ root: './dist' }))
  app.get('/', serveStatic({ path: './dist/index.html' }))
  return app
}
