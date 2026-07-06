import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '../../api/tmdb'
import { endpoints } from '../../api/endpoints'
import type { MovieDetail } from '../../types/tmdb'

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () =>
      tmdbFetch<MovieDetail>(endpoints.movieDetail(id), {
        append_to_response: 'credits',
      }),
    enabled: !!id,
  })
}