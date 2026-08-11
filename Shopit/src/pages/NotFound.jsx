import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container-shop py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-ink-900 sm:text-4xl">
        This page wandered off.
      </h1>
      <p className="mt-4 text-ink-600">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  )
}
