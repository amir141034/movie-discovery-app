import { useQuery } from '@tanstack/react-query'
import { tmdbFetch } from '../api/tmdb'
import { endpoints } from '../api/endpoints'
import type { Genre } from '../types/tmdb'

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => tmdbFetch<{ genres: Genre[] }>(endpoints.genreList()),
    staleTime: Infinity, // genre list basically never changes
  })
}