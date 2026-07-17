import { useMode } from '../../hooks/useDarkModeToggle'
import { Sun, Moon } from 'lucide-react';

export function DarkModeToggle() {
  const { mode, toggleDarkMode } = useMode()

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-full
                text-gray-600 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-gray-800
                transition-colors duration-200"
    >
      <Sun
        className={`absolute h-5 w-5 ${
          mode === 'dark' ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 ${
          mode === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </button>
  )
}