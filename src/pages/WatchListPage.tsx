import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { MovieCard } from '../components/layout/MovieCard'

export function WatchlistPage() {
  const favorites = useAppSelector((state: any) => state.favorites.items)

  if (favorites.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600 dark:text-gray-400">
        <p>No favorites yet.</p>
        <Link to="/" className="text-white underline mt-2 inline-block">
          Browse movies
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {favorites.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}