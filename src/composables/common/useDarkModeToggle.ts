import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialMode(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useMode() {
  const [mode, setMode] = useState<Theme>(getInitialMode)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    localStorage.setItem('theme', mode)
  }, [mode])

  const toggleDarkMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { mode, toggleDarkMode }
}