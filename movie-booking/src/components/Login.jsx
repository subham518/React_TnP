import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (isLogin) {
      const result = login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    } else {
      if (!name) {
        setError("Please enter your name");
        return;
      }
      const result = register(name, email, password);
      if (result.success) {
        setSuccess("Registration successful! Please log in.");
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-950 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
        <h1 className="text-3xl font-semibold text-slate-100">{isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p className="mt-2 text-sm text-slate-400">
          {isLogin ? "Sign in to book your tickets" : "Join MovieStack today"}
        </p>

        {error && <div className="mt-6 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
        {success && <div className="mt-6 rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {!isLogin && (
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">Full Name</span>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              />
            </label>
          )}

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">Email</span>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </label>

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">Password</span>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-400">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="font-semibold text-emerald-300 hover:text-emerald-200"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setSuccess("");
                }}
              >
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="font-semibold text-emerald-300 hover:text-emerald-200"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setSuccess("");
                }}
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-slate-400 transition hover:text-slate-100">
            ← Back to Movies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;