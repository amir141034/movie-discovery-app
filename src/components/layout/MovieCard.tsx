import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Movie } from '../../types/tmdb'
import { FavoriteButton } from '../favorite/FavoriteButton'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://placehold.co/300x450?text=No+Poster';

  useEffect(() => {
    const img = new Image();
    img.src = posterUrl;
  }, [posterUrl]);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block text-gray-900 dark:text-white transition-transform duration-300 hover:-translate-y-1"
    >
      <FavoriteButton
        movie={movie}
        className="absolute top-2 right-2 text-2xl z-10 drop-shadow transition-transform duration-200 hover:scale-125 active:scale-90"
      />

      <div className="relative overflow-hidden rounded shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <img
          src={posterUrl}
          alt={movie.title}
          className="aspect-2/3 object-cover w-full transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <p className="text-center text-sm mt-1 truncate transition-colors duration-200 group-hover:text-blue-500 dark:group-hover:text-blue-400">
        {movie.title}
      </p>
    </Link>
  );
}