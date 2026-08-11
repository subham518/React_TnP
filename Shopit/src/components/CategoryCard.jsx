import { Link } from 'react-router-dom'
import { getCategoryIcon, getCategoryColor } from '../utils/categoryIcons.js'

export default function CategoryCard({ category }) {
  const color = getCategoryColor(category.slug)
  const path = getCategoryIcon(category.slug)

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-ink-900/5 bg-white p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
    >
      <span
        className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}1A` }}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path d={path} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-sm font-medium text-ink-900">{category.name}</span>
    </Link>
  )
}
