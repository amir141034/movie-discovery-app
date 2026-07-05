import { useAppDispatch, useAppSelector } from '../app/hooks'
import { toggleFavorite } from '../composables/favoritesSlice'
import type { Movie } from '../types/tmdb'

interface FavoriteButtonProps {
  movie: Movie
  className?: string
}

export function FavoriteButton({ movie, className = '' }: FavoriteButtonProps) {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector((state: any) =>
    state.favorites.items.some((m: any) => m.id === movie.id)
  )

  return (
    <button
      onClick={(e) => {
        e.preventDefault() // stop the click bubbling into the parent <Link> on MovieCard
        e.stopPropagation()
        dispatch(toggleFavorite(movie))
      }}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`${className} ${isFavorite ? 'text-red-500' : 'text-white'}`}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  )
}