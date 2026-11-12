import { useEffect, useRef } from 'react'
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'
// Registration is cleaned up even if StrictMode unmounts before addListener resolves.
export function useAndroidBack(onBack: () => boolean) {
  const latest = useRef(onBack)
  latest.current = onBack
  useEffect(() => {
    if (Capacitor.getPlatform() !== 'android') return
    const listener = App.addListener('backButton', () => {
      const focused = document.activeElement
      if (focused instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(focused.tagName)) { focused.blur(); return }
      if (!latest.current()) void App.minimizeApp()
    })
    return () => { void listener.then(handle => handle.remove()) }
  }, [])
}
