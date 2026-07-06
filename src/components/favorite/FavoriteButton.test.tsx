import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { FavoriteButton } from './FavoriteButton'
import favoritesReducer from '../../composables/favoritesSlice'
import type { Movie } from '../../types/tmdb'

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test.jpg',
  overview: 'A movie for testing',
  vote_average: 8.5,
  release_date: '2024-01-01',
  genre_ids: [28],
}

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({ reducer: { favorites: favoritesReducer } })
  return render(<Provider store={store}>{ui}</Provider>)
}

describe('FavoriteButton', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows an empty heart when the movie is not favorited', () => {
    renderWithStore(<FavoriteButton movie={mockMovie} />)
    expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument()
  })

  it('toggles to a filled heart when clicked', async () => {
    const user = userEvent.setup()
    renderWithStore(<FavoriteButton movie={mockMovie} />)

    await user.click(screen.getByRole('button'))

    expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument()
  })

  it('toggles back to an empty heart on a second click', async () => {
    const user = userEvent.setup()
    renderWithStore(<FavoriteButton movie={mockMovie} />)

    const button = screen.getByRole('button')
    await user.click(button)
    await user.click(button)

    expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument()
  })
})