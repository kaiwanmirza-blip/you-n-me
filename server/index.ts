import { serve } from '@hono/node-server'
import { createApp } from './app.js'

const server = serve({ fetch: createApp().fetch, hostname: '127.0.0.1', port: 8787 }, () => {
  console.info('You&Me API listening at http://127.0.0.1:8787')
})
server.on('error', () => { console.error('API failed to start; check whether port 8787 is in use.'); process.exitCode = 1 })
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => { server.close(() => process.exit(0)) })
}
