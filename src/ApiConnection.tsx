import { useEffect, useState } from 'react'
import { apiOrigin, checkApiHealth } from './api'
export default function ApiConnection() {
  const [status, setStatus] = useState('Checking API configuration…')
  useEffect(() => {
    try {
      if (apiOrigin() === null) { setStatus('No mobile API configured. Bundled sample mode works offline.'); return }
    } catch { setStatus('Invalid API configuration. Sample mode remains available.'); return }
    const controller = new AbortController()
    void checkApiHealth(controller.signal).then(() => {
      setStatus('API connected · health only. Live AI and persistence remain unavailable.')
    }).catch(() => {
      if (!controller.signal.aborted) setStatus('API unavailable. Sample mode remains available; no live fallback.')
    })
    return () => controller.abort()
  }, [])
  return <p className="scope-note" role="status">{status}</p>
}
