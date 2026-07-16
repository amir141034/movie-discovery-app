import { useState } from 'react'
import { useDebounce } from '../features/search/useDebounce'
import { GenreSelector } from '../components/GenreSelector'
import { MovieGrid } from '../components/layout/MovieGrid'
import { SearchBar } from '../components/search/SearchBar'
import { SearchResults } from '../components/search/SearchResults'

export function BrowsePage() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 400)

  const isSearching = debouncedSearch.trim().length > 0

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-gray-600 dark:text-gray-400 text-5xl md:text-6xl font-extrabold tracking-tight">
          Discover Your Next Favorite Movie
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Search thousands of movies, explore trending titles, and save the ones you
          want to watch later.
        </p>
      </div>
      <SearchBar value={searchInput} onChange={setSearchInput} />

      {isSearching ? (
        <SearchResults query={debouncedSearch} />
      ) : (
        <>
          <GenreSelector selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
          <MovieGrid genreId={selectedGenre} />
        </>
      )}
    </div>
  )
}