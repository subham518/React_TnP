import { ShoppingBasket, Facebook, Instagram, Twitter } from "lucide-react"

const links = [
  { label: "Home", href: "#home" },
  { label: "Offers", href: "#offers" },
  { label: "Products", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
]

export default function Footer() {
  return (
    <footer className="bg-[#1d241c] pt-16 text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-white/10 pb-10 sm:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf-700 text-cream">
                <ShoppingBasket className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-xl font-bold text-cream">
                FreshBasket
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-white/70">
              Straight from the market to your everyday routine.
            </p>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/75">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-citrus-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/80 transition-colors hover:bg-citrus-400 hover:text-ink"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <p className="pt-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} FreshBasket. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
