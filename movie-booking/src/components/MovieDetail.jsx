import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import movies from "../data";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const movie = movies.find(m => m.id === parseInt(id));
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(new Set());

  useEffect(() => {
    if (movie) {
      const initialBooked = new Set();
      movie.shows.forEach(show => {
        show.seats.forEach(seat => {
          if (seat.isBooked) {
            initialBooked.add(seat.id);
          }
        });
      });
      setBookedSeats(initialBooked);
    }
  }, [movie]);

  if (!movie) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10 text-center text-slate-200">
        <h2 className="mb-4 text-3xl font-semibold">Movie not found</h2>
        <Link
          to="/"
          className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
        >
          Back to Movies
        </Link>
      </div>
    );
  }

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    setSelectedSeats([]);
  };

  const handleSeatClick = (seat) => {
    if (seat.isBooked || bookedSeats.has(seat.id)) return;
    const idx = selectedSeats.findIndex(s => s.id === seat.id);
    if (idx > -1) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBook = () => {
    if (selectedSeats.length === 0 || !selectedShow) return;
    if (!user) {
      navigate("/login");
      return;
    }
    const seatIds = selectedSeats.map(s => s.id);
    setBookedSeats(prev => {
      const next = new Set(prev);
      seatIds.forEach(id => next.add(id));
      return next;
    });
    const bookingData = {
      movie: movie.title,
      showTime: selectedShow.time,
      screen: selectedShow.screen,
      seats: selectedSeats.map(s => `${s.row}${s.number}`),
      total: selectedSeats.length * 12.99,
      userName: user.name,
      userEmail: user.email,
    };
    navigate("/booking", { state: bookingData });
  };

  const rows = "ABCDEF";
  const cols = 10;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/40">
        <button
          className="self-start rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 transition hover:border-emerald-400 hover:bg-slate-800"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <img src={movie.poster} alt={movie.title} className="h-[420px] w-full rounded-3xl object-cover shadow-xl shadow-slate-950/40" />
          <div className="space-y-4 text-slate-100">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300">
              {movie.genre}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">{movie.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span>⭐ {movie.rating} / 10</span>
              <span>{movie.duration}</span>
            </div>
            <p className="max-w-xl leading-7 text-slate-300">{movie.description}</p>
          </div>
        </div>
      </div>

      <section className="space-y-6 rounded-3xl bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <div>
          <h2 className="mb-3 text-2xl font-semibold text-slate-100">Select Showtime</h2>
          <div className="flex flex-wrap gap-3">
            {movie.shows.map(show => (
              <button
                key={show.id}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${selectedShow?.id === show.id ? 'border-emerald-400 bg-emerald-500/15 text-emerald-200' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-emerald-400 hover:bg-slate-800'}`}
                onClick={() => handleShowSelect(show)}
              >
                <span className="block font-semibold">{show.time}</span>
                <span className="text-slate-400">{show.screen}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedShow && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-950/95 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-100">Select Seats</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Selected: {selectedSeats.length} seat(s) — ${(selectedSeats.length * 12.99).toFixed(2)}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm text-slate-300">{selectedShow.time} • {selectedShow.screen}</div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid gap-3">
                  {rows.split("").map(row => (
                    <div key={row} className="flex items-center gap-3">
                      <span className="w-8 text-sm font-semibold text-slate-300">{row}</span>
                      <div className="grid flex-1 grid-cols-10 gap-2">
                        {Array.from({ length: cols }, (_, i) => {
                          const seatId = `${row}${i + 1}`;
                          const seat = selectedShow.seats.find(s => s.id === seatId);
                          const isBooked = seat?.isBooked || bookedSeats.has(seatId);
                          const isSelected = selectedSeats.some(s => s.id === seatId);
                          return (
                            <button
                              key={seatId}
                              className={`rounded-2xl border px-2 py-2 text-xs font-semibold transition ${isBooked ? 'cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500' : isSelected ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200' : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-emerald-400 hover:bg-slate-800'}`}
                              onClick={() => handleSeatClick(seat)}
                              disabled={isBooked}
                              type="button"
                            >
                              {i + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 rounded-3xl bg-slate-950/90 p-4 text-sm text-slate-400 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-900/80 p-3">Available</div>
                <div className="rounded-2xl bg-emerald-500/10 p-3">Selected</div>
                <div className="rounded-2xl bg-slate-800/80 p-3">Booked</div>
              </div>

              <button
                className="w-full rounded-3xl bg-emerald-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                onClick={handleBook}
                disabled={selectedSeats.length === 0}
              >
                Book {selectedSeats.length} Seat(s) — ${(selectedSeats.length * 12.99).toFixed(2)}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default MovieDetail;