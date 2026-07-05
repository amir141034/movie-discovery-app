export function MovieCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded aspect-[2/3] w-full" />
      <div className="h-4 bg-gray-700 rounded mt-2 w-3/4" />
    </div>
  )
}