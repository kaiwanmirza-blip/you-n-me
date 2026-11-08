// Public origin only. Never accepts credentials, paths, or a laptop loopback backend.
export function resolveApiOrigin(native: boolean, configured?: string): string | null {
  if (!configured?.trim()) return native ? null : ''
  const url = new URL(configured)
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.hostname.endsWith('.localhost')) {
    throw new Error('API configuration requires a public HTTPS origin without credentials or a path.')
  }
  return url.origin
}
