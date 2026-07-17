const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '413f6608a632f106ca4a1c0f78cd2b8e'
export class TmdbError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TmdbError";
    this.status = status;
  }
}

export async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new TmdbError(`TMDB request failed: ${res.status}`, res.status)
  }
  return res.json()
}