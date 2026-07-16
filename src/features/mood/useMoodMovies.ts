import { useInfiniteQuery } from '@tanstack/react-query'
import { tmdbFetch } from '../../api/tmdb'
import { endpoints } from '../../api/endpoints'
import type { Movie, TMDBResponse } from '../../types/tmdb'
import type { Mood } from './moodConfig'

export function useMoodMovies(mood: Mood | null) {
  return useInfiniteQuery({
    queryKey: ['mood', mood?.id],
    queryFn: ({ pageParam }) =>
      tmdbFetch<TMDBResponse<Movie>>(endpoints.discover(), {
        with_genres: mood!.genreIds.join('|'),
        sort_by: mood!.sortBy,
        'vote_count.gte': '100', // filters out obscure/unrated titles
        page: String(pageParam),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !!mood,
  })
}