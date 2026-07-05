import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { SearchResults } from './SearchResults'
import { tmdbFetch } from '../api/tmdb'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import favoritesReducer from '../composables/favoritesSlice'

vi.mock('../../../api/tmdb', () => ({
  tmdbFetch: vi.fn(),
}))

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const store = configureStore({ reducer: { favorites: favoritesReducer } })
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{ui}</MemoryRouter>
      </QueryClientProvider>
    </Provider>
  )
}

describe('SearchResults', () => {
  it('shows the empty state when no movies are returned', async () => {
    vi.mocked(tmdbFetch).mockResolvedValue({
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    })

    renderWithProviders(<SearchResults query="zzzzxyz" />)

    await waitFor(() => {
      expect(screen.getByText(/no results found for "zzzzxyz"/i)).toBeInTheDocument()
    })
  })

  it('renders movie cards when results are returned', async () => {
    vi.mocked(tmdbFetch).mockResolvedValue({
      page: 1,
      results: [
        {
          id: 1,
          title: 'Found Movie',
          poster_path: '/test.jpg',
          overview: 'desc',
          vote_average: 7,
          release_date: '2024-01-01',
          genre_ids: [],
        },
      ],
      total_pages: 1,
      total_results: 1,
    })

    renderWithProviders(<SearchResults query="found" />)

    await waitFor(() => {
      expect(screen.getByText('Found Movie')).toBeInTheDocument()
    })
  })
})