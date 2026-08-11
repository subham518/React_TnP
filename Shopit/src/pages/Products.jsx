import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchCategories,
  searchProducts,
} from '../services/productApi.js'
import ProductGrid from '../components/ProductGrid.jsx'
import { useCart } from '../context/CartContext.jsx'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: High to Low' },
]

function sortProducts(products, sortBy) {
  const list = [...products]
  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return list.sort((a, b) => b.rating - a.rating)
    default:
      return list
  }
}

export default function Products() {
  const { addToCart } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  const [searchInput, setSearchInput] = useState(query)
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState('relevance')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    setSearchInput(query)
  }, [query])

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    const request = query
      ? searchProducts(query)
      : category
      ? fetchProductsByCategory(category)
      : fetchProducts({ limit: 40 })

    request
      .then((data) => {
        if (!ignore) setProducts(data.products || [])
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Something went wrong')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [query, category])

  const sortedProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy])

  function handleSearchSubmit(e) {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (searchInput.trim()) {
      next.set('q', searchInput.trim())
    } else {
      next.delete('q')
    }
    next.delete('category')
    setSearchParams(next)
  }

  function handleCategoryChange(e) {
    const value = e.target.value
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set('category', value)
    } else {
      next.delete('category')
    }
    next.delete('q')
    setSearchParams(next)
    setSearchInput('')
  }

  function clearFilters() {
    setSearchParams({})
    setSearchInput('')
    setSortBy('relevance')
  }

  const hasActiveFilters = Boolean(query || category)

  return (
    <section className="container-shop py-10">
      <div className="mb-8">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral">
          Catalog
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-ink-900 sm:text-4xl">
          {query ? `Results for "${query}"` : category ? formatCategoryLabel(category, categories) : 'All products'}
        </h1>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-ink-900/5 bg-white p-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products"
            className="w-full rounded-full border border-ink-900/10 bg-cream-100 py-2.5 pl-10 pr-4 text-sm focus:border-coral focus:outline-none"
          />
        </form>

        <select
          value={category}
          onChange={handleCategoryChange}
          className="rounded-full border border-ink-900/10 bg-cream-100 px-4 py-2.5 text-sm text-ink-900 focus:border-coral focus:outline-none sm:w-56"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-full border border-ink-900/10 bg-cream-100 px-4 py-2.5 text-sm text-ink-900 focus:border-coral focus:outline-none sm:w-56"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-ink-600 hover:text-coral"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-ink-400">
        {loading ? 'Loading products…' : `${sortedProducts.length} products`}
      </p>

      <div className="mt-6">
        <ProductGrid products={sortedProducts} loading={loading} error={error} onAddToCart={addToCart} />
      </div>
    </section>
  )
}

function formatCategoryLabel(slug, categories) {
  const match = categories.find((c) => c.slug === slug)
  return match ? match.name : slug.replace(/-/g, ' ')
}
