import { Link } from 'react-router-dom'
import RatingStars from './RatingStars.jsx'

function formatPrice(value) {
  return `$${value.toFixed(2)}`
}

export default function ProductCard({ product, onAddToCart }) {
  const { id, title, brand, thumbnail, price, discountPercentage, rating, stock } = product
  const hasDiscount = discountPercentage > 0
  const finalPrice = hasDiscount ? price - (price * discountPercentage) / 100 : price

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      <Link to={`/products/${id}`} className="relative block aspect-square overflow-hidden bg-cream-200">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-coral px-2.5 py-1 text-xs font-semibold text-white">
            -{Math.round(discountPercentage)}%
          </span>
        )}
        {stock === 0 && (
          <span className="absolute inset-0 flex items-center justify-center bg-night/80 text-sm font-semibold text-white">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {brand && <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{brand}</p>}
        <Link to={`/products/${id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-ink-900 hover:text-coral">{title}</h3>
        </Link>
        <RatingStars rating={rating} />

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-semibold text-ink-900">{formatPrice(finalPrice)}</span>
          {hasDiscount && (
            <span className="text-xs text-ink-400 line-through">{formatPrice(price)}</span>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            disabled={stock === 0}
            className="btn-primary flex-1 !px-3 !py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to cart
          </button>
          <Link to={`/products/${id}`} className="btn-secondary !px-3 !py-2 text-xs">
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
