type Movie = {
  MovieID: number;
  Title: string;
  ReleaseYear: number;
  Genres?: string;
  AvgRating?: number;
  PosterURL?: string | null;
};

type Props = {
  movie: Movie;
  onRate: (movieId: number, score: number) => void;
};

function MovieCard({ movie, onRate }: Props) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">

      {/* IMAGE */}
      <div className="relative h-52 bg-zinc-800">
        <img
          src={
            movie.PosterURL ||
            "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="w-full h-full object-cover"
        />

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(movie.MovieID, star)}
                className="text-white hover:text-red-500 text-xl"
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="p-3">
        <h2 className="text-white font-semibold text-md">
          {movie.Title}
        </h2>

        <p className="text-zinc-400 text-sm">
          {movie.ReleaseYear}
        </p>

        <p className="text-zinc-500 text-xs mt-1">
          {movie.Genres}
        </p>

        <p className="text-yellow-400 mt-2 text-sm">
          ⭐ {movie.AvgRating ?? "No rating"}
        </p>
      </div>

    </div>
  );
}

export default MovieCard;