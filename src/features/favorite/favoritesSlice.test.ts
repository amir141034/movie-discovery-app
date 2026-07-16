import { describe, it, expect, beforeEach } from 'vitest'
import favoritesReducer, { toggleFavorite } from './favoritesSlice'
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

const mockMovie2: Movie = { ...mockMovie, id: 2, title: 'Second Movie' }

describe('favoritesSlice', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty items array by default', () => {
    const state = favoritesReducer(undefined, { type: 'unknown' })
    expect(state.items).toEqual([])
  })

  it('adds a movie to favorites when not already present', () => {
    const state = favoritesReducer({ items: [] }, toggleFavorite(mockMovie))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].id).toBe(mockMovie.id)
  })

  it('removes a movie from favorites when already present', () => {
    const initialState = { items: [mockMovie] }
    const state = favoritesReducer(initialState, toggleFavorite(mockMovie))
    expect(state.items).toHaveLength(0)
  })

  it('does not affect other favorites when toggling one movie', () => {
    const initialState = { items: [mockMovie, mockMovie2] }
    const state = favoritesReducer(initialState, toggleFavorite(mockMovie))
    expect(state.items).toEqual([mockMovie2])
  })

  it('persists updated favorites to localStorage', () => {
    favoritesReducer({ items: [] }, toggleFavorite(mockMovie))
    const stored = JSON.parse(localStorage.getItem('favorites') ?? '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].id).toBe(mockMovie.id)
  })
})