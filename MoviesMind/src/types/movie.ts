export interface User {
  UserID: number;
  UserName: string;
  UserEmail: string;
}

export interface Movie {
  MovieID: number;
  Title: string;
  ReleaseYear: number;
  Description: string;
  PosterURL: string | null;
  AvgRating: number;
  Genres: string;
}

export interface Recommendation {
  MovieID: number;
  Title: string;
  ReleaseYear: number;
  AvgRating: number;
  Genres: string;
  RecommendationReason: string;
}