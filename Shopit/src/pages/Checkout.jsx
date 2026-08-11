import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

function money(value) {
  return `$${value.toFixed(2)}`
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, subtotal, delivery, total, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!cart.length) return
    clearCart()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="container-shop flex min-h-[70vh] items-center justify-center py-12 text-center">
        <div className="max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald">
            ✓
          </div>
          <h1 className="mt-5 text-3xl font-semibold text-ink-900">Order placed!</h1>
          <p className="mt-2 text-ink-600">This demo order was placed successfully. No real payment was processed.</p>
          <Link to="/products" className="btn-primary mt-7">Continue shopping</Link>
        </div>
      </section>
    )
  }

  if (!cart.length) {
    return (
      <section className="container-shop py-20 text-center">
        <h1 className="text-3xl font-semibold text-ink-900">Nothing to checkout</h1>
        <p className="mt-2 text-ink-600">Add something to your cart first.</p>
        <Link to="/products" className="btn-primary mt-7">Browse products</Link>
      </section>
    )
  }

  return (
    <section className="container-shop py-10 lg:py-14">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">Almost there</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink-900">Checkout</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-semibold text-ink-900">Delivery details</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink-900 sm:col-span-2">
              Full name
              <input required className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none" />
            </label>
            <label className="text-sm font-medium text-ink-900">
              Phone
              <input required className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none" />
            </label>
            <label className="text-sm font-medium text-ink-900">
              Pincode
              <input required inputMode="numeric" className="mt-2 w-full rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none" />
            </label>
            <label className="text-sm font-medium text-ink-900 sm:col-span-2">
              Address
              <textarea required rows="3" className="mt-2 w-full resize-none rounded-xl border border-ink-900/10 bg-cream-100 px-4 py-3 text-sm focus:border-coral focus:outline-none" />
            </label>
          </div>

          <div className="mt-6 rounded-xl bg-cream-200 p-4 text-sm text-ink-600">
            Payment is simulated for this frontend-only project. No real transaction will happen.
          </div>

          <button type="submit" className="btn-primary mt-6 w-full">Place order</button>
        </form>

        <aside className="h-fit rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-semibold text-ink-900">Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-ink-600">
                <span className="line-clamp-1">{item.title} × {item.quantity}</span>
                <span className="shrink-0">{money(item.finalPrice * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-ink-900/5 pt-4">
              <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              <div className="mt-2 flex justify-between"><span>Delivery</span><span>{delivery ? money(delivery) : 'Free'}</span></div>
              <div className="mt-4 flex justify-between text-base font-semibold text-ink-900"><span>Total</span><span>{money(total)}</span></div>
            </div>
          </div>
          <button type="button" onClick={() => navigate('/cart')} className="btn-secondary mt-5 w-full">Back to cart</button>
        </aside>
      </div>
    </section>
  )
}
