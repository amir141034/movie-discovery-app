export const endpoints = {
  trending: (timeWindow: 'day' | 'week' = 'day') => `/trending/movie/${timeWindow}`,
  discover: () => `/discover/movie`,
  genreList: () => `/genre/movie/list`,
  search: () => `/search/movie`,
  movieDetail: (id: number) => `/movie/${id}`,
}