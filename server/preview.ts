import { serve } from '@hono/node-server'
import { createWebApp } from './web.js'
const port = Number(process.env.PORT ?? 5174)
const hostname = process.env.HOST ?? '127.0.0.1'
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be 1–65535')
const server = serve({ fetch: createWebApp().fetch, hostname, port }, () => console.info(`You&Me preview listening at http://${hostname}:${port}`))
server.on('error', () => { console.error('Preview failed to start; check host and port.'); process.exitCode = 1 })
for (const signal of ['SIGINT', 'SIGTERM'] as const) process.on(signal, () => server.close(() => process.exit(0)))
