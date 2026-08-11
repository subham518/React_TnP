import { Link } from 'react-router-dom'

const socials = [
  {
    name: 'Instagram',
    href: '#',
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm5-1.4a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z',
  },
  {
    name: 'Twitter',
    href: '#',
    path: 'M21 5.9c-.7.3-1.4.5-2.2.6a3.8 3.8 0 0 0 1.7-2.1c-.8.4-1.6.8-2.5 1a3.7 3.7 0 0 0-6.4 3.4A10.6 10.6 0 0 1 3.9 4.9a3.7 3.7 0 0 0 1.2 5 3.7 3.7 0 0 1-1.7-.5v.1a3.7 3.7 0 0 0 3 3.6 3.8 3.8 0 0 1-1.7.1 3.7 3.7 0 0 0 3.5 2.6A7.5 7.5 0 0 1 3 17.2a10.6 10.6 0 0 0 5.7 1.7c6.9 0 10.6-5.7 10.6-10.6v-.5c.7-.5 1.3-1.2 1.8-1.9Z',
  },
  {
    name: 'Facebook',
    href: '#',
    path: 'M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.9v3h2.5V21h3.1Z',
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-night text-ink-50">
      <div className="container-shop grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-coral">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-night" fill="none">
                <path d="M6 8h12l-1.4 9.2a2 2 0 0 1-2 1.7H9.4a2 2 0 0 1-2-1.7L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 8a3 3 0 0 1 6 0M4 5l2 2M20 5l-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span className="font-display text-xl font-semibold">Shopit</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-50/65">
            A marketplace built for everyday finds — curated goods, fair prices, and a
            checkout that gets out of your way.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-50/55">
            About
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/" className="text-ink-50/85 hover:text-coral">
                Our story
              </Link>
            </li>
            <li>
              <Link to="/" className="text-ink-50/85 hover:text-coral">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/" className="text-ink-50/85 hover:text-coral">
                Press
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-50/55">
            Quick links
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/products" className="text-ink-50/85 hover:text-coral">
                Shop all
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-ink-50/85 hover:text-coral">
                Your cart
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-ink-50/85 hover:text-coral">
                Sign in
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-50/55">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-50/85">
            <li>hello@shopit.shop</li>
            <li>+91 98765 43210</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-ink-50 transition-colors hover:bg-coral hover:text-night"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-shop text-center text-xs text-ink-50/55">
          © {new Date().getFullYear()} Shopit. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
