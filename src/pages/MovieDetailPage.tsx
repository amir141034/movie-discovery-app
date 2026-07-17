import { useParams, useNavigate } from 'react-router-dom'
import { useMovieDetail } from '../features/movie/useMovieDetail'
import { MovieDetailSkeleton } from '../components/skeleton/MovieDetailSkeleton'
import { FavoriteButton } from '../components/favorite/FavoriteButton'
import { EmptyState } from '../components/error/EmptyState'
import { ErrorPage } from '../components/error/ErrorPage'
import { TmdbError } from "../lib/tmdb"; // adjust path

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isError, error, refetch } = useMovieDetail(Number(id))

  if (isLoading) return <MovieDetailSkeleton />
  if (isError) {
  if (error instanceof TmdbError && error.status === 404) {
      return (
        <EmptyState
          title="Movie not found"
          message="This movie doesn't exist or may have been removed."
          actionLabel="Back to browse"
          actionHref="/"
        />
      );
    }
    return <ErrorPage fullPage={false} onRetry={refetch} />;
  }
  if (!data) return null

  return (
    <div className="p-4 text-gray-900 dark:text-white m-12">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-gray-600 dark:text-gray-400 hover:text-white hover:-translate-x-2.5 transition-transform duration-300">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w400${data.poster_path}`
              : 'https://placehold.co/400x600?text=No+Poster'
          }
          alt={data.title}
          className="rounded w-64 shrink-0 mx-auto md:mx-0"
        />

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <FavoriteButton movie={data} className="text-2xl" />
          </div>

          {data.tagline && (
            <p className="text-gray-600 dark:text-gray-400 italic mt-1">{data.tagline}</p>
          )}

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

          <p className="mt-4 text-gray-200 shrink-0">{data.overview}</p>

          <h2 className="text-lg font-semibold mt-6 mb-2">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2" onWheel={(e) => {
              if (e.deltaY !== 0) {
                e.currentTarget.scrollLeft += e.deltaY;
                e.preventDefault();
              }
            }}>
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