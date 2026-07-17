import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '../../lib/tmdb'
import { endpoints } from '../../lib/endpoints'
import type { Genre } from '../../types/tmdb'

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => tmdbFetch<{ genres: Genre[] }>(endpoints.genreList()),
    retry: 3,
    staleTime: Infinity, // genre list basically never changes
  })
}