import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Movie } from '../../types/tmdb'

interface FavoritesState {
  items: Movie[]
}

const loadFromStorage = (): Movie[] => {
  try {
    const raw = localStorage.getItem('favorites')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const initialState: FavoritesState = {
  items: loadFromStorage(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.some((m) => m.id === action.payload.id)
      state.items = exists
        ? state.items.filter((m) => m.id !== action.payload.id)
        : [...state.items, action.payload]
      localStorage.setItem('favorites', JSON.stringify(state.items))
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer