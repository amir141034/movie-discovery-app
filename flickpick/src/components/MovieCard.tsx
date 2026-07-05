import type { Movie } from '../types/tmdb'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="text-white">
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
    </div>
  )
}