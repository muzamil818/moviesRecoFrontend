import { useEffect, useState } from "react";
import { getMovies, submitRating, getUserRatings } from "../api/api";
import MovieCard from "../../components/MovieCard";

type Movie = {
  MovieID: number;
  Title: string;
  ReleaseYear: number;
  Genres?: string;
  AvgRating?: number;
};

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [ratedMovies, setRatedMovies] = useState<Record<number, number>>({});

  const userId = 1;

  // ✅ FIXED: correct function name
useEffect(() => {
  const loadData = async () => {
    try {
      const [moviesData, ratingsData] = await Promise.all([
        getMovies(),
        getUserRatings(userId),
      ]);

      setMovies(moviesData);

      // convert ratings into map
      const ratedMap: Record<number, number> = {};

      ratingsData.forEach((r: any) => {
        ratedMap[r.MovieID] = r.Score;
      });

      setRatedMovies(ratedMap);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);
  // RATE MOVIE
  const handleRating = async (movieId: number, score: number) => {
    try {
      await submitRating({
        UserID: userId,
        MovieID: movieId,
        Score: score,
      });

      setRatedMovies((prev) => ({
        ...prev,
        [movieId]: score,
      }));

      // optional refresh trigger (if you still use recommendations page)
      localStorage.setItem(
        "recommendationRefresh",
        Date.now().toString()
      );

    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10">

      <h1 className="text-3xl font-bold text-white mb-8">
        All Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {movies.map((movie) => (
          <MovieCard
            key={movie.MovieID}
            movie={movie}
            onRate={handleRating}
            ratedScore={ratedMovies[movie.MovieID]}
          />
        ))}

      </div>

    </div>
  );
}

export default Movies;