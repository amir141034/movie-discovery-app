# FlickPick — Movie Browsing App

A frontend-only, responsive movie browsing app built for state management, data fetching/caching, and basic testing in a modern React stack — no backend required.

**Live demo:** (https://flickpick-rosy.vercel.app)

## Features

- **Debounced search** across TMDB's full movie catalog
- **Infinite-scroll browsing** by trending or genre
- **Mood-based recommender** — pick a mood, get genre-matched picks
- **Favorites/watchlist** — persisted to `localStorage`, no login required
- **Dark mode** with system preference detection
- **Fully responsive** — 2 to 5 column grid depending on viewport
- **Loading skeletons** instead of spinners
- **Detail pages** — poster, synopsis, cast, rating, runtime, genres

## Stack

- **React 18 + TypeScript** + **Vite**
- **Tailwind CSS v4**
- **Redux Toolkit** — favorites state, persisted to `localStorage`
- **TanStack Query v5** — server state, caching, infinite scroll pagination
- **React Router DOM** — client-side routing
- **TMDB API** — movie data
- **Vitest + React Testing Library** — unit and component tests

## Architecture notes

- **Reusability-focused folder structure** (`components/search`, `components/favorites`, `composables/search`, `composables/favorites`) separates the project by the role of the code rather than by feature. I found this makes components and logic easier to locate and reuse as the application grows.
- **Redux for client state, React Query for server state** — Favorites are the only data stored entirely on the client, so they live in a single Redux slice. Everything fetched from the TMDB API (trending, search, movie details, and mood recommendations) is managed through React Query hooks.
- **useInfiniteMovies** combines trending and genre-filtered browsing into a single hook. When a genreId is provided, it fetches movies for that genre; otherwise, it falls back to trending movies. This avoids duplicating pagination and fetching logic.
- **Mood recommender** maps each mood to a predefined combination of TMDB genres using OR logic. A minimum vote-count threshold is also applied to reduce obscure or unrated recommendations.

## Running locally

```bash
git clone https://github.com/amir141034/flickpick.git
cd flickpick
npm install
```
