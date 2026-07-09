import { Routes, Route, Link } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import { DarkModeToggle } from './components/DarkModeToggle'
import { ErrorPage } from './components/error/ErrorPage'
import Loading from './components/Loading'


import { Clapperboard } from "lucide-react";

function App() {
  const BrowsePage = lazy(() => import("./pages/BrowsePage").then(m => ({ default: m.BrowsePage })))
  const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage").then(m => ({ default: m.MovieDetailPage })))
  const WatchlistPage = lazy(() => import("./pages/WatchlistPage").then(m => ({ default: m.WatchlistPage })))
  // const MoodPage = lazy(() => import("./pages/MoodPage"))

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="flex justify-between items-center p-4 text-gray-900 dark:text-white">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold"
        >
          <Clapperboard size={22} className="text-blue-600 dark:text-blue-400" />
          <span>FlickPick</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {/* <Link to="/moods" className="hover:underline">Moods</Link> */}
          <Link to="/watchlist" className='dark:hover:text-blue-600'>My Watchlist</Link>
          <DarkModeToggle />
        </div>
      </nav>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          {/* <Route path="/moods" element={<MoodPage />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App