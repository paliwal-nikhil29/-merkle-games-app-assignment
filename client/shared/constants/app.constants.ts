export const API_ENDPOINTS = {
  GAMES: '/games',
} as const;

export const API_ERRORS = {
  UNAUTHORIZED: 'You are not authorized to view this content.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  UNKNOWN: 'An unexpected error occurred.',
  TIMEOUT: 'The request timed out. Please try again.',
} as const;

export const UI_MESSAGES = {
  NO_GAMES_FOUND: 'No games found. Try adjusting your filters.',
  BACK_BUTTON: '← Back to Games',
} as const;

export const SORT_OPTIONS = [
  { label: 'Top Rated', value: 'rating' },
  { label: 'Release Date', value: 'release_date' },
] as const;

export const SORT_ORDER_OPTIONS = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
] as const;

export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_PAGE_SIZE: 15,
} as const;

export const DEFAULT_SORT = 'rating';
