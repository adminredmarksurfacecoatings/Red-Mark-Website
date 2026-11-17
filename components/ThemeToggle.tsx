'use client'
import { useEffect, useState } from 'react'
import { THEME_KEY, type ThemePreference } from '@/lib/theme'

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>('system')
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    let selected: ThemePreference = 'system'
    try { const saved = localStorage.getItem(THEME_KEY); if (saved === 'light' || saved === 'dark') selected = saved } catch {}
    const apply = () => { document.documentElement.dataset.theme = selected === 'system' ? (media.matches ? 'dark' : 'light') : selected }
    const sync = (event: StorageEvent) => {
      if (event.key !== THEME_KEY && event.key !== null) return
      selected = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'system'
      setPreference(selected); apply()
    }
    const choose = (event: Event) => { selected = (event as CustomEvent<ThemePreference>).detail; apply() }
    setPreference(selected); apply()
    media.addEventListener('change', apply)
    window.addEventListener('storage', sync)
    window.addEventListener('redmark-theme', choose)
    return () => { media.removeEventListener('change', apply); window.removeEventListener('storage', sync); window.removeEventListener('redmark-theme', choose) }
  }, [])
  function choose(value: ThemePreference) {
    setPreference(value)
    try { localStorage.setItem(THEME_KEY, value) } catch {}
    window.dispatchEvent(new CustomEvent('redmark-theme', { detail: value }))
  }
  return <div className="theme-control"><span id="theme-label">Appearance</span><div className="theme-options" role="group" aria-labelledby="theme-label">{(['system', 'light', 'dark'] as const).map(value => <button key={value} type="button" aria-pressed={preference === value} onClick={() => choose(value)}>{value === 'system' ? 'System' : value === 'light' ? 'Light' : 'Dark'}</button>)}</div><span className="theme-control__hint">System follows your device</span></div>
}
