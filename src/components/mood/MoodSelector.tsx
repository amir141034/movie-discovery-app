import { moods, type Mood } from '../../composables/moodConfig'

interface MoodSelectorProps {
  selectedMood: Mood | null
  onSelect: (mood: Mood | null) => void
}

export function MoodSelector({ selectedMood, onSelect }: MoodSelectorProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
        What are you in the mood for?
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Pick a mood and we'll match movies to it.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelect(selectedMood?.id === mood.id ? null : mood)}
            className={`flex flex-col items-center gap-1 p-4 rounded-lg text-sm font-medium transition-colors ${
              selectedMood?.id === mood.id
                ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  )
}