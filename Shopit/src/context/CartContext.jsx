import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'shopit_cart'

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || []
  } catch {
    return []
  }
}

function getFinalPrice(product) {
  return product.discountPercentage > 0
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart)

  function persist(nextCart) {
    setCart(nextCart)
    localStorage.setItem(CART_KEY, JSON.stringify(nextCart))
  }

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id)

    if (existing) {
      persist(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock || 99) }
            : item,
        ),
      )
      return
    }

    persist([
      ...cart,
      {
        ...product,
        finalPrice: getFinalPrice(product),
        quantity: 1,
      },
    ])
  }

  function removeFromCart(id) {
    persist(cart.filter((item) => item.id !== id))
  }

  function updateQuantity(id, quantity) {
    const item = cart.find((product) => product.id === id)
    if (!item) return

    const nextQuantity = Math.max(1, Math.min(Number(quantity), item.stock || 99))
    persist(
      cart.map((product) =>
        product.id === id ? { ...product, quantity: nextQuantity } : product,
      ),
    )
  }

  function clearCart() {
    persist([])
  }

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0)
  const delivery = cart.length > 0 ? (subtotal >= 50 ? 0 : 5) : 0
  const total = subtotal + delivery

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
      delivery,
      total,
    }),
    [cart, itemCount, subtotal, delivery, total],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}
