import { useCallback } from 'react'
import { useMoodMovies } from '../../composables/useMoodMovies'
import { useIntersectionObserver } from '../../composables/useIntersectionObserver'
import { MovieCard } from '../layout/MovieCard'
import { MovieGridSkeleton } from '../skeleton/MovieGridSkeleton'
import type { Mood } from '../../composables/moodConfig'

interface MoodResultsProps {
  mood: Mood
}

export function MoodResults({ mood }: MoodResultsProps) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMoodMovies(mood)

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

  if (movies.length === 0) {
    return <p className="text-gray-600 dark:text-gray-400 p-4">No matches for this mood right now.</p>
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {isFetchingNextPage && <MovieGridSkeleton count={4} />}

      <div ref={observerTarget} className="h-4" />
    </>
  )
}