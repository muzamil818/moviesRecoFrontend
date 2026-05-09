import { useEffect, useState } from "react";
import { getRecommendations } from "../api/api";

// TYPE for recommendation item
type Recommendation = {
  MovieID: number;
  Title: string;
  ReleaseYear: number;
  AvgRating?: number;
  Genres?: string;
  RecommendationReason?: string;
};

function Recommendations() {
  const [movies, setMovies] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // temporary user (we will connect Home page later)
  const userId: number = 1;

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async (): Promise<void> => {
    try {
      const data = await getRecommendations(userId);
      setMovies(data.recommendations || []);
    } catch (error) {
      console.log("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        Loading recommendations...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-10">

      <h1 className="text-3xl font-bold text-white mb-2">
        Recommended for You
      </h1>

      <p className="text-zinc-500 mb-8">
        Based on your ratings & preferences
      </p>

      {movies.length === 0 ? (
        <p className="text-zinc-400">
          No recommendations yet. Rate more movies.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {movies.map((movie) => (
            <div
              key={movie.MovieID}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
            >

              {/* Title */}
              <h2 className="text-white text-lg font-semibold">
                {movie.Title}
              </h2>

              <p className="text-zinc-400 text-sm">
                {movie.ReleaseYear}
              </p>

              {/* Genres */}
              <p className="text-zinc-500 text-xs mt-1">
                {movie.Genres}
              </p>

              {/* Rating */}
              <p className="text-yellow-400 mt-2">
                ⭐ {movie.AvgRating ?? "No rating"}
              </p>

              {/* Reason (IMPORTANT - shows intelligence) */}
              {movie.RecommendationReason && (
                <p className="text-red-500 text-xs mt-2">
                  {movie.RecommendationReason === "genre"
                    ? "🎯 Based on your favorite genres"
                    : "🔥 Top rated movie"}
                </p>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Recommendations;