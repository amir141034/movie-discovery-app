export function MovieDetailSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      <div className="bg-gray-700 rounded aspect-2/3 w-64 mb-4" />
      <div className="h-6 bg-gray-700 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-700 rounded w-full mb-1" />
      <div className="h-4 bg-gray-700 rounded w-3/4" />
    </div>
  )
}