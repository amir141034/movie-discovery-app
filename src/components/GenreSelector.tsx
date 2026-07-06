import { useGenres } from '../composables/useGenres'

interface GenreSelectorProps {
  selectedGenre: number | null
  onSelect: (genreId: number | null) => void
}

export function GenreSelector({ selectedGenre, onSelect }: GenreSelectorProps) {
  const { data, isLoading } = useGenres()

  if (isLoading) return null

  return (
    <div className="flex gap-2 overflow-x-auto p-4">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
          selectedGenre === null
            ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
            : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
        }`}
      >
        Trending
      </button>
      {data?.genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            selectedGenre === genre.id 
            ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
            : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}