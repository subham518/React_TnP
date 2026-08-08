import { Link } from "react-router-dom";

function MovieList({ movies }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <section className="mb-8 rounded-3xl bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
        <p className="mb-2 text-sm uppercase tracking-[0.35em] text-emerald-400">Now Streaming</p>
        <h1 className="text-4xl font-semibold text-slate-100">Discover your next movie night.</h1>
        <p className="mt-3 max-w-2xl text-slate-400">Browse the latest releases and reserve your seat in a few clicks.</p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map(movie => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 transition shadow-lg shadow-slate-950/40 hover:-translate-y-1 hover:border-emerald-400 hover:bg-slate-900"
          >
            <img src={movie.poster} alt={movie.title} className="h-72 w-full object-cover transition duration-300 group-hover:scale-105" />
            <div className="space-y-2 p-5">
              <h2 className="text-xl font-semibold text-slate-100">{movie.title}</h2>
              <p className="text-sm uppercase tracking-[0.18em] text-emerald-300">{movie.genre}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span>⭐ {movie.rating}</span>
                <span>{movie.duration}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;