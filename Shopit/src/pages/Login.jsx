import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      login(email, password)
      navigate(location.state?.from || '/', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="container-shop flex min-h-[70vh] items-center justify-center py-12">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-ink-900/5 bg-white shadow-card lg:grid-cols-2">
        <div className="hidden bg-night p-10 text-white lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Welcome back</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight">Good to see you again.</h1>
          <p className="mt-4 max-w-sm text-cream-100/70">
            Sign in to keep your shopping experience simple and your cart right where you left it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Account</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink-900">Login</h1>

          {error && (
            <div className="mt-5 rounded-xl bg-coral-50 px-4 py-3 text-sm text-coral-600">{error}</div>
          )}

          <label className="mt-6 block text-sm font-medium text-ink-900">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none"
              placeholder="you@example.com"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-ink-900">
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none"
              placeholder="••••••••"
            />
          </label>

          <button type="submit" className="btn-primary mt-6 w-full">Login</button>

          <p className="mt-5 text-center text-sm text-ink-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-coral hover:text-coral-600">Create one</Link>
          </p>
        </form>
      </div>
    </section>
  )
}
