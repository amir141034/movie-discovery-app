import { useParams, useNavigate } from 'react-router-dom'
import { useMovieDetail } from '../composables/useMovieDetail'
import { MovieDetailSkeleton } from './MovieDetailSkeleton'
import { FavoriteButton } from './FavouriteButton'

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useMovieDetail(Number(id))

  if (isLoading) return <MovieDetailSkeleton />
  if (isError) return <p className="text-red-500 p-4">Error: {error.message}</p>
  if (!data) return null

  return (
    <div className="p-4 text-white max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-gray-400 hover:text-white">
        ← Back
      </button>

      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w400${data.poster_path}`
              : 'https://placehold.co/400x600?text=No+Poster'
          }
          alt={data.title}
          className="rounded w-64 shrink-0"
        />

        <div className='flex items-center gap-3'>
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <FavoriteButton movie={data} className="text-2xl" />
          {data.tagline && <p className="text-gray-400 italic mt-1">{data.tagline}</p>}

          <div className="flex gap-4 text-sm text-gray-300 mt-3">
            <span>⭐ {data.vote_average.toFixed(1)}</span>
            {data.runtime && <span>{data.runtime} min</span>}
            <span>{data.release_date?.slice(0, 4)}</span>
          </div>

          <div className="flex gap-2 flex-wrap mt-3">
            {data.genres.map((genre) => (
              <span key={genre.id} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-4 text-gray-200">{data.overview}</p>

          <h2 className="text-lg font-semibold mt-6 mb-2">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {data.credits.cast.slice(0, 10).map((member) => (
              <div key={member.id} className="text-center w-20 shrink-0">
                <img
                  src={
                    member.profile_path
                      ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                      : 'https://placehold.co/200x300?text=No+Photo'
                  }
                  alt={member.name}
                  className="rounded aspect-2/3 object-cover w-full"
                />
                <p className="text-xs mt-1 truncate">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}