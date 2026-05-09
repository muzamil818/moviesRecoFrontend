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
 ratedScore?: number;
};
function MovieCard({ movie, onRate, ratedScore }: Props) {
  return (
    <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">

      {/* IMAGE */}
      <div className="relative h-52 bg-zinc-800">
        <img
          src={
            movie.PosterURL ||
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                        className={
                        star <= (ratedScore || 0)
                            ? "text-red-500 text-xl"
                            : "text-zinc-500 hover:text-red-500 text-xl"
                        }
                    >
                        ★
                    </button>
        ))}
        {ratedScore && (
<p className="text-xs text-red-400 mt-2">
You rated this ⭐ {ratedScore}
</p>
)}
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