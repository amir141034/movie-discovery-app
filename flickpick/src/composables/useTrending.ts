import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '../api/tmdb'
import { endpoints } from '../api/endpoints'
import type { Movie, TMDBResponse } from '../types/tmdb'

export function useTrending(timeWindow: 'day' | 'week' = 'day', page: number = 1) {
  return useQuery({
    queryKey: ['trending', timeWindow, page],
    queryFn: () =>
      tmdbFetch<TMDBResponse<Movie>>(endpoints.trending(timeWindow), {
        page: String(page),
      }),
  })
}