import { Routes, Route, Link } from 'react-router-dom'
import { BrowsePage } from './pages/BrowsePage'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { WatchlistPage } from './pages/WatchListPage'
import { MoodPage } from './pages/MoodPage'

import { DarkModeToggle } from './components/DarkModeToggle'
import { NotFound } from './components/Error'

import { Clapperboard } from "lucide-react";

function App() {
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
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/moods" element={<MoodPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App