import { useLocation, Link } from "react-router-dom";

function BookingSummary() {
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-center text-slate-200">
        <h1 className="mb-4 text-3xl font-semibold">No Booking Found</h1>
        <p className="mb-6 text-slate-400">It looks like you haven't reserved a movie yet.</p>
        <Link
          to="/"
          className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  const { movie, showTime, screen, seats, total, userName, userEmail } = state;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/30">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-3xl text-slate-950">✓</div>
          <div>
            <h1 className="text-3xl font-semibold text-slate-100">Booking Confirmed!</h1>
            <p className="mt-2 text-slate-400">Your MovieStack pass is ready.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl bg-slate-950/90 p-6 text-slate-300 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Movie</p>
            <p className="text-lg font-semibold text-slate-100">{movie}</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Showtime</p>
            <p className="text-lg text-slate-100">{showTime}</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Screen</p>
            <p className="text-lg text-slate-100">{screen}</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Seats</p>
            <p className="text-lg text-slate-100">{seats.join(", ")}</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900/90 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Booked By</p>
              <p className="mt-1 text-slate-100">{userName} ({userEmail})</p>
            </div>
            <div className="rounded-full bg-slate-800 px-4 py-2 text-lg font-semibold text-emerald-300">Total: ${total.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-8 text-right">
          <Link
            to="/"
            className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
          >
            Back to Movies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;