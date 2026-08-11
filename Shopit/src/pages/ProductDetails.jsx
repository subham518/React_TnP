import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchProductById } from '../services/productApi.js'
import RatingStars from '../components/RatingStars.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { useCart } from '../context/CartContext.jsx'

function priceFor(product) {
  return product.discountPercentage > 0
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price
}

function money(value) {
  return `$${value.toFixed(2)}`
}

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [image, setImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    let ignore = false

    setLoading(true)
    setError('')
    setProduct(null)

    fetchProductById(id)
      .then((data) => {
        if (ignore) return
        setProduct(data)
        setImage(data.images?.[0] || data.thumbnail)
        setQuantity(1)
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Product could not be loaded.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id])

  useEffect(() => {
    if (!product?.category) return

    fetch(`https://dummyjson.com/products/category/${product.category}?limit=5`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load related products')
        return res.json()
      })
      .then((data) => {
        setRelated((data.products || []).filter((item) => item.id !== product.id).slice(0, 4))
      })
      .catch(() => setRelated([]))
  }, [product])

  function handleAdd() {
    for (let i = 0; i < quantity; i += 1) addToCart(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  if (loading) {
    return (
      <section className="container-shop py-16">
        <div className="grid animate-pulse gap-10 lg:grid-cols-2">
          <div className="aspect-square rounded-3xl bg-cream-200" />
          <div className="space-y-5">
            <div className="h-4 w-24 rounded bg-cream-200" />
            <div className="h-10 w-3/4 rounded bg-cream-200" />
            <div className="h-6 w-32 rounded bg-cream-200" />
            <div className="h-24 rounded bg-cream-200" />
          </div>
        </div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="container-shop py-20 text-center">
        <p className="font-display text-2xl font-semibold text-ink-900">Product not found</p>
        <p className="mt-2 text-sm text-ink-600">{error || 'This product does not exist.'}</p>
        <Link to="/products" className="btn-primary mt-6">Back to products</Link>
      </section>
    )
  }

  const finalPrice = priceFor(product)
  const hasDiscount = product.discountPercentage > 0

  return (
    <>
      <section className="container-shop py-10 lg:py-14">
        <Link to="/products" className="text-sm font-medium text-ink-500 hover:text-coral">
          ← Back to products
        </Link>

        <div className="mt-7 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="aspect-square overflow-hidden rounded-3xl border border-ink-900/5 bg-white shadow-card">
              <img src={image} alt={product.title} className="h-full w-full object-contain p-6 sm:p-10" />
            </div>

            {product.images?.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {product.images.slice(0, 5).map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImage(src)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white p-1 ${
                      image === src ? 'border-coral' : 'border-ink-900/10'
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
              {product.brand || product.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <RatingStars rating={product.rating} />
              <span className="text-sm text-ink-400">{product.rating.toFixed(1)} / 5</span>
            </div>

            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-ink-900">{money(finalPrice)}</span>
              {hasDiscount && (
                <>
                  <span className="text-base text-ink-400 line-through">{money(product.price)}</span>
                  <span className="rounded-full bg-coral-50 px-2.5 py-1 text-xs font-semibold text-coral-600">
                    {Math.round(product.discountPercentage)}% off
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 max-w-xl leading-7 text-ink-600">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-cream-200 px-3 py-1.5 text-ink-600">
                {product.category}
              </span>
              <span className={`rounded-full px-3 py-1.5 ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-coral-50 text-coral-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-ink-900/10 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-11 w-11 text-lg text-ink-600 hover:text-ink-900"
                  aria-label="Decrease quantity"
                  disabled={product.stock === 0}
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))}
                  className="h-11 w-11 text-lg text-ink-600 hover:text-ink-900"
                  aria-label="Increase quantity"
                  disabled={product.stock === 0}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="btn-primary min-w-40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {added ? 'Added ✓' : 'Add to cart'}
              </button>

              <button
                type="button"
                onClick={() => {
                  handleAdd()
                  navigate('/cart')
                }}
                disabled={product.stock === 0}
                className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-shop pb-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold text-ink-900">You may also like</h2>
          </div>
          <ProductGrid products={related} loading={false} error={null} onAddToCart={addToCart} />
        </section>
      )}
    </>
  )
}
