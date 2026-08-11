import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-coral">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-night" fill="none">
          <path d="M6 8h12l-1.4 9.2a2 2 0 0 1-2 1.7H9.4a2 2 0 0 1-2-1.7L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 8a3 3 0 0 1 6 0M4 5l2 2M20 5l-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-ink-900">Shopit</span>
    </Link>
  )
}

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-coral' : 'text-ink-600 hover:text-ink-900'}`

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`)
      setMobileOpen(false)
    }
  }

  function handleLogout() {
    logout()
    setMobileOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/5 bg-cream-100/90 backdrop-blur">
      <div className="container-shop flex h-16 items-center gap-4">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/products" className={navLinkClass}>Products</NavLink>
        </nav>

        <form onSubmit={handleSearch} className="relative mx-2 hidden flex-1 max-w-md items-center md:flex">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 h-4 w-4 text-ink-400" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the drop" className="w-full rounded-full border border-ink-900/10 bg-cream-100 py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-coral focus:outline-none" />
        </form>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="max-w-28 truncate text-sm font-medium text-ink-600">Hi, {user.name}</span>
              <button type="button" onClick={handleLogout} className="text-sm font-medium text-ink-600 hover:text-coral">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm font-medium text-ink-600 hover:text-ink-900">Login</Link>
          )}

          <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-cream-200" aria-label="Cart">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="M4 6h2l1.6 8.4a1.5 1.5 0 0 0 1.5 1.2h6.6a1.5 1.5 0 0 0 1.5-1.2L19 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
              <circle cx="16.5" cy="20" r="1.4" fill="currentColor" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-coral px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <button type="button" onClick={() => setMobileOpen((v) => !v)} className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 hover:bg-cream-200 md:hidden" aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-900/5 bg-cream-100 px-4 pb-4 pt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative mb-3">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Shopit" className="w-full rounded-full border border-ink-900/10 bg-cream-100 py-2.5 pl-10 pr-4 text-sm focus:border-coral focus:outline-none" />
          </form>
          <div className="flex flex-col gap-3">
            <NavLink to="/" end onClick={() => setMobileOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" onClick={() => setMobileOpen(false)} className={navLinkClass}>Products</NavLink>
            <NavLink to="/cart" onClick={() => setMobileOpen(false)} className={navLinkClass}>Cart {itemCount > 0 ? `(${itemCount})` : ''}</NavLink>
            {user ? (
              <button type="button" onClick={handleLogout} className="text-left text-sm font-medium text-ink-600">Logout ({user.name})</button>
            ) : (
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className={navLinkClass}>Login</NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
