import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function money(value) {
  return `$${value.toFixed(2)}`
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal, delivery, total } = useCart()

  if (cart.length === 0) {
    return (
      <section className="container-shop py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-coral-50 text-coral">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path d="M4 6h2l1.6 8.4a1.5 1.5 0 0 0 1.5 1.2h6.6a1.5 1.5 0 0 0 1.5-1.2L19 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-5 text-3xl font-semibold text-ink-900">Your cart is empty</h1>
        <p className="mt-2 text-ink-600">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary mt-7">Start shopping</Link>
      </section>
    )
  }

  return (
    <section className="container-shop py-10 lg:py-14">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">Your bag</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink-900">Shopping cart</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-2xl border border-ink-900/5 bg-white p-4 shadow-card">
              <Link to={`/products/${item.id}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-200">
                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-contain" />
              </Link>

              <div className="min-w-0 flex-1">
                <Link to={`/products/${item.id}`} className="font-semibold text-ink-900 hover:text-coral">
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-ink-400">{item.brand || item.category}</p>
                <p className="mt-2 font-semibold text-ink-900">{money(item.finalPrice)}</p>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center rounded-full border border-ink-900/10">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 text-ink-600">−</button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 text-ink-600">+</button>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="text-xs font-medium text-ink-400 hover:text-coral">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-semibold text-ink-900">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-ink-600">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-600">
              <span>Delivery</span>
              <span>{delivery === 0 ? 'Free' : money(delivery)}</span>
            </div>
            <div className="border-t border-ink-900/5 pt-4">
              <div className="flex justify-between text-base font-semibold text-ink-900">
                <span>Total</span>
                <span>{money(total)}</span>
              </div>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary mt-6 w-full">
            Proceed to checkout
          </Link>
          <Link to="/products" className="btn-secondary mt-3 w-full">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  )
}
