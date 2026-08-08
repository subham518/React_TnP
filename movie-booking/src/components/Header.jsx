import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-xl font-semibold text-emerald-300">
          <span className="text-2xl">🎞</span>
          MovieStack
        </Link>

        <div className="flex items-center gap-4 text-slate-300">
          <Link to="/" className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white">
            Movies
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">{user.name}</span>
              <button
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-400 hover:bg-emerald-500 hover:text-slate-950"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-emerald-400 bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;