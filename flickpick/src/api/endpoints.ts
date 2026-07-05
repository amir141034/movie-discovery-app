export const endpoints = {
  trending: (timeWindow: 'day' | 'week' = 'day') => `/trending/movie/${timeWindow}`,
  genreMovies: (genreId: number) => `/discover/movie${genreId}`,
  search: () => `/search/movie`,
  movieDetail: (id: number) => `/movie/${id}`,
}