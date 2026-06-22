# Merkle Games App

A game library built with **Nuxt 3** + **TypeScript**. Browse top-rated games, search and sort, and view game details with reviews. Server-rendered, with loading shimmers, error states, dark mode, and accessibility built in.

## Tech

- **Nuxt 3** (Vue 3, SSR)
- **TypeScript** (strict)
- **SCSS** (design tokens for light/dark theme)
- **Vitest** + axe-core (accessibility tests)

## Setup

```bash
# install deps
npm install

# dev server → http://localhost:3000
npm run dev
```

Configure the API base via env (defaults to `http://localhost:8000/api/v1`):

```bash
NUXT_PUBLIC_API_BASE=http://localhost:8000/api/v1
```

## Scripts

| Command             | Description        |
| ------------------- | ------------------ |
| `npm run dev`       | Dev server         |
| `npm run build`     | Production build   |
| `npm run start`     | Preview built app  |
| `npm run typecheck` | TypeScript check   |
| `npm run test`      | Run tests (Vitest) |

## Structure

- components/
  - games/
    - GameDetailCard.vue
    - GameReviewList.vue
    - GameCard.vue
  - ui/
    - AppShimmer.vue
    - AppError.vue
    - GameCardShimmer.vue
  - AppHeader.vue
- composables/
  - useApi.ts
  - useGames.ts
  - useDebounce.js
- constants/
  - app.constants.ts
- layouts/
  - default.vue
- pages/
  - index.vue
  - games/[id].vue
- models/
  - game.model.ts

This README focuses on the key folders used by the app; see the repository for additional directories like `assets/`, `tests/`, and `utils/`.

## Notes

- **Data**: `useApi` wraps `useAsyncData` → returns `{ data, pending, error, refresh }`; pages drive loading/error UI from those.
- **Theme**: dark mode toggles `html.dark`, persisted in `localStorage`, falls back to system preference.
- **Accessibility**: skip link, `sr-only` labels, focus-visible rings, `prefers-reduced-motion`, ARIA live regions for loading.
- **Image fallback**: `components/BaseImage.vue` swaps to `/fallback.svg` on load error.
