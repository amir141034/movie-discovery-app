export interface Movie {
  id: number
  title: string
  poster_path: string | null
  overview: string
  vote_average: number
  release_date: string
  genre_ids: number[]
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface MovieDetail extends Movie {
  runtime: number | null
  genres: Genre[]
  tagline: string | null
  credits: {
    cast: CastMember[]
  }
}