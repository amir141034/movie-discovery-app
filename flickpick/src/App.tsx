import { Routes, Route } from 'react-router-dom'
import { BrowsePage } from './components/BrowsePage'
import { MovieDetailPage } from './components/MovieDetailPage'
import { WatchlistPage } from './components/WatchListPage'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="flex justify-between items-center p-4 text-white">
        <Link to="/" className="font-bold text-lg">🎬 MovieDB</Link>
        <Link to="/watchlist" className="text-sm hover:underline">My Watchlist</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </div>
  )
}

export default App