import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { MovieCard } from '../components/movie/MovieCard'
import { Heart, Film } from "lucide-react";

export function WatchlistPage() {
  const favorites = useAppSelector((state: any) => state.favorites.items)

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <Heart className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <div className="space-y-1">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            No favorites yet
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Movies you favorite will show up here.
          </p>
        </div>
        <NavLink
          to="/"
          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          <Film className="h-4 w-4" />
          Browse movies
        </NavLink>
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