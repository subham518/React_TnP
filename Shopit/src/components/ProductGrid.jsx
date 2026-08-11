import ProductCard from './ProductCard.jsx'

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-ink-900/5 bg-white">
      <div className="aspect-square bg-cream-200" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-1/3 rounded bg-cream-200" />
        <div className="h-4 w-full rounded bg-cream-200" />
        <div className="h-4 w-1/2 rounded bg-cream-200" />
      </div>
    </div>
  )
}

export default function ProductGrid({ products, loading, error, onAddToCart, skeletonCount = 8 }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-coral/20 bg-coral-50 px-6 py-14 text-center">
        <p className="font-display text-lg font-semibold text-ink-900">Couldn't load products</p>
        <p className="mt-2 text-sm text-ink-600">{error}</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border border-ink-900/10 bg-white px-6 py-14 text-center">
        <p className="font-display text-lg font-semibold text-ink-900">No products found</p>
        <p className="mt-2 text-sm text-ink-600">Try a different search term or clear your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
