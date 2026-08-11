export default function RatingStars({ rating = 0, size = 14 }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          width={size}
          height={size}
          fill={i < rounded ? '#FFB020' : '#E4DFEF'}
        >
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5Z" />
        </svg>
      ))}
    </span>
  )
}
