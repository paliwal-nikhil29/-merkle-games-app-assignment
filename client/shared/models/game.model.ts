export interface GameAttributes {
  id: number;
  title: string;
  description: string;
  genre_id: number;
  platform: string;
  release_date: string;
  developer_id: number;
  publisher_id: number;
  createdAt: string;
  updatedAt: string;
  genre: Genre;
  developer: Company;
  publisher: Company;
  images: GameImage[];
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

export interface Genre {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  name: string;
  country: string;
  founded_year: number;
  logo: string | null;
  company_type: 'Developer' | 'Publisher';
  createdAt: string;
  updatedAt: string;
}

export interface GameImage {
  id: number;
  image_url: string;
  image_type: 'Screenshot' | 'Cover' | 'Artwork';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  game_id: number;
  user_id: number;
  rating: number;
  review_text: string;
  review_date: string | null;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
}

export interface ReviewUser {
  id: number;
  username: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GamesApiResponse {
  data: GameAttributes[];
  _metadata: PaginationMeta;
}

export interface GameDetailApiResponse {
  data: GameAttributes;
}

export interface GenresApiResponse {
  data: Genre[];
}