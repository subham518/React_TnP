import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '../services/productApi.js'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import HeroIllustration from '../components/HeroIllustration.jsx'
import { useCart } from '../context/CartContext.jsx'

const FEATURED_SLUGS = [
  'smartphones',
  'laptops',
  'mens-shirts',
  'womens-dresses',
  'furniture',
  'groceries',
  'sunglasses',
  'skin-care',
]

export default function Home() {
  const { addToCart } = useCart()
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  const [featured, setFeatured] = useState([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [featuredError, setFeaturedError] = useState(null)

  useEffect(() => {
    let ignore = false

    fetchCategories()
      .then((data) => {
        if (ignore) return
        const preferred = FEATURED_SLUGS.map((slug) => data.find((c) => c.slug === slug)).filter(
          Boolean,
        )
        setCategories(preferred.length ? preferred : data.slice(0, 8))
      })
      .catch(() => {
        if (!ignore) setCategories([])
      })
      .finally(() => {
        if (!ignore) setCategoriesLoading(false)
      })

    fetchProducts({ limit: 8, skip: 20 })
      .then((data) => {
        if (ignore) return
        setFeatured(data.products)
      })
      .catch((err) => {
        if (!ignore) setFeaturedError(err.message)
      })
      .finally(() => {
        if (!ignore) setFeaturedLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="container-shop grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-coral-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coral-600">
            The new way to browse
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">
            Everyday essentials,
            <br />
            delivered with delight.
          </h1>
          <p className="mt-5 max-w-md text-ink-600">
            Shopit brings together everyday essentials and unexpected finds in one bright,
            fast-moving marketplace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary">
              Shop all products
            </Link>
            <Link to="/products?category=smartphones" className="btn-secondary">
              Explore electronics
            </Link>
          </div>

          <dl className="mt-10 flex gap-8">
            <div>
              <dt className="text-2xl font-semibold text-ink-900">190+</dt>
              <dd className="text-sm text-ink-600">Products</dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold text-ink-900">24</dt>
              <dd className="text-sm text-ink-600">Categories</dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold text-ink-900">4.5★</dt>
              <dd className="text-sm text-ink-600">Avg. rating</dd>
            </div>
          </dl>
        </div>

        <HeroIllustration />
      </section>

      {/* Categories */}
      <section className="container-shop py-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-ink-900">Shop by category</h2>
          <Link to="/products" className="link-underline text-sm font-medium text-coral">
            View all
          </Link>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-cream-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* Deals banner */}
      <section className="container-shop py-10">
        <div className="relative overflow-hidden rounded-3xl bg-night px-8 py-12 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-coral/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-amber/20 blur-3xl" />
          <p className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber">
            Deal of the week
          </p>
          <h2 className="relative mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Up to 25% off across fashion &amp; electronics
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-cream-100/70">
            Prices update live from our catalog — check any product page for its current
            discount.
          </p>
          <Link to="/products" className="btn-primary relative mt-7 inline-flex bg-coral">
            Catch the drop
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-shop py-10 pb-20">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-ink-900">Featured products</h2>
          <Link to="/products" className="link-underline text-sm font-medium text-coral">
            View all
          </Link>
        </div>

        <ProductGrid products={featured} loading={featuredLoading} error={featuredError} onAddToCart={addToCart} />
      </section>
    </>
  )
}
