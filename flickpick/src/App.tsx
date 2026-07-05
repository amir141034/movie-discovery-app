import { useTrending } from './composables/useTrending'
import { MovieCard } from './components/MovieCard'
import { MovieGridSkeleton } from './components/MovieGridSkeleton'

function App() {
  const { data, isLoading, isError, error } = useTrending()

  if (isLoading) return <MovieGridSkeleton />
  if (isError) return <p className="text-red-500 p-4">Error: {error.message}</p>

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      {data?.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default App
