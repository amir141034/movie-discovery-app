import { useInfiniteQuery } from '@tanstack/react-query'
import { tmdbFetch } from '../api/tmdb'
import { endpoints } from '../api/endpoints'
import type { Movie, TMDBResponse } from '../types/tmdb'

export function useSearchMovies(query: string) {
  return useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: ({ pageParam }) =>
      tmdbFetch<TMDBResponse<Movie>>(endpoints.search(), {
        query,
        page: String(pageParam),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.trim().length > 0, // don't fire the query on an empty string
  })
}