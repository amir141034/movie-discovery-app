import { useTrending } from './hooks/useTrending'

function App() {
  const { data, isLoading, isError, error } = useTrending()

  if (isLoading) return <p className="text-white p-4">Loading...</p>
  if (isError) return <p className="text-red-500 p-4">Error: {error.message}</p>

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
        {data?.results.map((movie) => (
          <div key={movie.id} className="text-white">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />
            <p className="text-sm mt-1">{movie.title}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
