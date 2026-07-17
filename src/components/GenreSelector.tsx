import { useGenres } from '../features/genre/useGenres'

interface GenreSelectorProps {
  selectedGenre: number | null
  onSelect: (genreId: number | null) => void
}

export function GenreSelector({ selectedGenre, onSelect }: GenreSelectorProps) {
  const { data, isLoading } = useGenres()

  if (isLoading) return null

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <div className="px-4">
      <div
        className="flex gap-3 overflow-x-auto overscroll-contain py-3"
        onWheel={handleWheel}
      >
        <button
          onClick={() => onSelect(null)}
          className={`shrink-0 rounded-xl border px-5 text-sm font-medium
            ${
              selectedGenre === null
                ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-white dark:hover:bg-gray-900"
            }
          `}
        >
          Trending
        </button>

        {data?.genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelect(genre.id)}
            className={`rounded-xl border px-5 text-sm font-medium
              ${
                selectedGenre === genre.id
                  ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-white dark:hover:bg-gray-900"
              }
            `}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  )
}