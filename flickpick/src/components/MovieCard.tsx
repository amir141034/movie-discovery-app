import { Link } from 'react-router-dom'
import type { Movie } from '../types/tmdb'
import { FavoriteButton } from './FavoriteButton'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.id}`} className="text-gray-900 dark:text-white relative block">
      <FavoriteButton
        movie={movie}
        className="absolute top-2 right-2 text-2xl z-10 drop-shadow"
      />
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : 'https://placehold.co/300x450?text=No+Poster'
        }
        alt={movie.title}
        className="rounded aspect-2/3 object-cover w-full"
      />
      <p className="text-sm mt-1 truncate">{movie.title}</p>
    </Link>
  )
}