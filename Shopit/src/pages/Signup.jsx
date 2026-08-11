import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      signup(form)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="container-shop flex min-h-[70vh] items-center justify-center py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-3xl border border-ink-900/5 bg-white p-7 shadow-card sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Join Shopit</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink-900">Create your account</h1>
        <p className="mt-2 text-sm text-ink-600">A simple frontend account for this demo store.</p>

        {error && (
          <div className="mt-5 rounded-xl bg-coral-50 px-4 py-3 text-sm text-coral-600">{error}</div>
        )}

        <label className="mt-6 block text-sm font-medium text-ink-900">
          Name
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none"
            placeholder="Your name"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-ink-900">
          Email
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none"
            placeholder="you@example.com"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="mt-4 block text-sm font-medium text-ink-900">
            Password
            <input
              name="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none"
              placeholder="Minimum 6 characters"
            />
          </label>

          <label className="mt-4 block text-sm font-medium text-ink-900">
            Confirm password
            <input
              name="confirmPassword"
              type="password"
              required
              minLength={6}
              value={form.confirmPassword}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none"
              placeholder="Repeat password"
            />
          </label>
        </div>

        <button type="submit" className="btn-primary mt-6 w-full">Create account</button>

        <p className="mt-5 text-center text-sm text-ink-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-coral hover:text-coral-600">Login</Link>
        </p>
      </form>
    </section>
  )
}
