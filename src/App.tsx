import { Routes, Route, Link } from 'react-router-dom'
import { BrowsePage } from './pages/BrowsePage'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { WatchlistPage } from './pages/WatchListPage'
import { MoodPage } from './pages/MoodPage'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <nav className="flex justify-between items-center p-4 text-gray-900 dark:text-white">
        <Link to="/" className="font-bold text-lg">🎬 MovieDB</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/moods" className="hover:underline">Moods</Link>
          <Link to="/watchlist" className="hover:underline">My Watchlist</Link>
          <ThemeToggle />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/moods" element={<MoodPage />} />
      </Routes>
    </div>
  )
}

export default App