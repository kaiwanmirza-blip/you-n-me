import { useEffect, useState } from 'react'
import { checkApiHealth } from './api'

export default function ApiConnection() {
  const [status, setStatus] = useState('Checking local API connection…')
  useEffect(() => {
    const controller = new AbortController()
    void checkApiHealth(controller.signal).then(() => {
      setStatus('Local API connected · health only. Working capabilities remain unavailable.')
    }).catch(() => {
      if (!controller.signal.aborted) setStatus('Local API unavailable. Start the API to check the connection.')
    })
    return () => controller.abort()
  }, [])
  return <p className="scope-note" role="status">{status}</p>
}
