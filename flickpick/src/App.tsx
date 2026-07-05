import { useState } from 'react'
import { useDebounce } from './composables/useDebounce'
import { GenreSelector } from './components/GenreSelector'
import { MovieGrid } from './components/MovieGrid'
import { SearchBar } from './components/SearchBar'
import { SearchResults } from './components/SearchResults'

function App() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounce(searchInput, 400)

  const isSearching = debouncedSearch.trim().length > 0

  return (
    <div className="min-h-screen bg-gray-900">
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

export default App