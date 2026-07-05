# 🎬 MovieDB — Movie Discovery App

A frontend-only movie discovery app built to explore state management, data fetching/caching, and testing patterns in a modern React stack — no backend required.

**Live demo:** [your-vercel-url-here]

## Features

- 🔍 **Debounced search** across TMDB's full movie catalog
- 🎞️ **Infinite-scroll browsing** by trending or genre
- 🎭 **Mood-based recommender** — pick a mood, get genre-matched picks
- ❤️ **Favorites/watchlist** — persisted to `localStorage`, no login required
- 🌗 **Dark mode** with system preference detection + persistence
- 📱 **Fully responsive** — 2 to 5 column grid depending on viewport
- 💀 **Loading skeletons** instead of spinners
- 🎬 **Detail pages** — poster, synopsis, cast, rating, runtime, genres

## Stack

- **React 18 + TypeScript** + **Vite**
- **Tailwind CSS v4**
- **Redux Toolkit** — favorites state, persisted to `localStorage`
- **TanStack Query v5** — server state, caching, infinite scroll pagination
- **React Router DOM** — client-side routing
- **TMDB API** — movie data
- **Vitest + React Testing Library** — unit and component tests

## Architecture notes

- **Feature-organized folder structure** (`features/browse`, `features/search`, `features/favorites`, `features/movieDetail`, `features/mood`) rather than type-organized — each feature owns its hooks and components
- **Redux for client state, React Query for server state** — favorites is the only Redux slice, since it's the only truly persisted client-side data; everything else (trending, search, detail, mood results) is server data handled by React Query hooks
- **`useInfiniteMovies`** consolidates trending and genre-filtered browsing into a single hook based on whether a `genreId` is passed
- **Mood recommender** maps moods to TMDB genre combinations (OR logic) with a minimum vote-count floor to filter out obscure/unrated titles

## Running locally

```bash
git clone https://github.com/YOUR_USERNAME/movie-discovery-app.git
cd movie-discovery-app
npm install
```

Create a `.env` file in the root:
