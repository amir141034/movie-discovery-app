import { useInfiniteQuery } from '@tanstack/react-query'
import { tmdbFetch } from '../../lib/tmdb'
import { endpoints } from '../../lib/endpoints'
import type { Movie, TMDBResponse } from '../../types/tmdb'

export function useInfiniteMovies(genreId: number | null) {
  return useInfiniteQuery({
    queryKey: ['movies', genreId],
    queryFn: ({ pageParam }) =>
      genreId
        ? tmdbFetch<TMDBResponse<Movie>>(endpoints.discover(), {
            with_genres: String(genreId),
            page: String(pageParam),
          })
        : tmdbFetch<TMDBResponse<Movie>>(endpoints.trending(), {
            page: String(pageParam),
          }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  })
}