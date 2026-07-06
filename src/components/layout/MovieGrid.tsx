import { useCallback } from 'react'
import { useInfiniteMovies } from '../../composables/useInfiniteMovies'
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'
import { MovieCard } from './MovieCard'
import { MovieGridSkeleton } from '../skeleton/MovieGridSkeleton'

interface MovieGridProps {
  genreId: number | null
}

export function MovieGrid({ genreId }: MovieGridProps) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMovies(genreId)

  const handleIntersect = useCallback(() => {
    if (hasNextPage) fetchNextPage()
  }, [hasNextPage, fetchNextPage])

  const observerTarget = useIntersectionObserver({
    onIntersect: handleIntersect,
    enabled: !!hasNextPage,
  })

  if (isLoading) return <MovieGridSkeleton />
  if (isError) return <p className="text-red-500 p-4">Error: {error.message}</p>

  const movies = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {isFetchingNextPage && <MovieGridSkeleton count={4} />}

      {/* Sentinel element — triggers next page when it scrolls into view */}
      <div ref={observerTarget} className="h-4" />
    </>
  )
}