import { useEffect, useState } from "react";
import { getRecommendations } from "../api/api";
import MovieCard from "../../components/MovieCard";

type Movie = {
  MovieID: number;
  Title: string;
  ReleaseYear: number;
  Genres?: string;
  AvgRating?: number;
  PosterURL?: string | null;
};

function Recommendations() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ GET USER FROM LOCALSTORAGE (FIX)
  const userId = localStorage.getItem("userId");

useEffect(() => {
  const fetchRecommendations = async () => {
    try {
      if (!userId) return;

      const data = await getRecommendations(Number(userId));
      setMovies(data.recommendations || data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchRecommendations();

  // 🔥 LISTEN FOR CHANGES
  const interval = setInterval(() => {
    const refreshFlag = localStorage.getItem("refreshRecommendations");

    if (refreshFlag) {
      fetchRecommendations();
      localStorage.removeItem("refreshRecommendations");
    }
  }, 1000);

  return () => clearInterval(interval);
}, [userId]);
  // LOADING STATE
  if (loading) {
    return (
      <p className="text-white text-center mt-10">
        Loading recommendations...
      </p>
    );
  }

  // NO USER SELECTED
  if (!userId) {
    return (
      <p className="text-white text-center mt-10">
        Please select a user first
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10">

      <h1 className="text-3xl font-bold text-white mb-8">
        Recommended for You 🎯
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {movies.map((movie) => (
          <MovieCard
            key={movie.MovieID}
            movie={movie}
            onRate={() => {}}
          />
        ))}

      </div>

    </div>
  );
}

export default Recommendations;