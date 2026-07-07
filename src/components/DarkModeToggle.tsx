import { useMode } from '../composables/useDarkModeToggle'

export function DarkModeToggle() {
  const { mode, toggleDarkMode } = useMode()

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="text-lg px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      {mode === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}