import { useEffect, useState } from "react"
import { Menu, X, ShoppingBasket, Tag } from "lucide-react"

const links = [
  { label: "Home", href: "#home" },
  { label: "Offers", href: "#offers" },
  { label: "Products", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/5 transition-all duration-300 ${
        scrolled ? "bg-[#fffdf9]/90 backdrop-blur-md shadow-soft" : "bg-[#fffdf9]/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-leaf-700 text-cream shadow-card">
            <ShoppingBasket className="h-5 w-5" strokeWidth={2.1} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            FreshBasket
          </span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium text-ink/75 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors hover:text-leaf-700">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#offers"
          className="hidden items-center gap-2 rounded-full bg-leaf-700 px-4 py-2.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          <Tag className="h-4 w-4" />
          View Deals
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-black/5 bg-white text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div className={`overflow-hidden transition-all duration-300 md:hidden ${open ? "max-h-80 border-t border-black/5" : "max-h-0"}`}>
        <ul className="space-y-1 bg-[#fffdf9] px-5 py-4">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-leaf-50"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#offers"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-leaf-700 px-4 py-2.5 text-sm font-semibold text-cream"
            >
              <Tag className="h-4 w-4" />
              View Deals
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
