import { useState } from 'react'
import { useDebounce } from '../composables/useDebounce'
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