const BASE_URL = "http://localhost:3001";

// TYPES
export type Movie = {
  MovieID: number;
  Title: string;
  ReleaseYear: number;
  Description?: string;
  PosterURL?: string | null;
  AvgRating?: number;
  Genres?: string;
};

export type User = {
  UserID: number;
  UserName: string;
  UserEmail: string;
};

// USERS
export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

// MOVIES
export const getMovies = async (): Promise<Movie[]> => {
  const res = await fetch(`${BASE_URL}/movies`);
  return res.json();
};

export const getMovieById = async (id: number): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movies/${id}`);
  return res.json();
};

// RATINGS
export const submitRating = async (data: {
  UserID: number;
  MovieID: number;
  Score: number;
}): Promise<any> => {
  const res = await fetch(`${BASE_URL}/ratings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// RECOMMENDATIONS
export const getRecommendations = async (userId: number): Promise<any> => {
  const res = await fetch(`${BASE_URL}/recommend/${userId}`);
  return res.json();
};