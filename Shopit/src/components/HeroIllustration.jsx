export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 420" className="mx-auto w-full max-w-md" aria-hidden="true">
      <defs>
        <linearGradient id="blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#29321D" />
          <stop offset="100%" stopColor="#3B2222" />
        </linearGradient>
      </defs>

      <ellipse cx="240" cy="220" rx="200" ry="180" fill="url(#blob)" />

      {/* back box */}
      <g transform="rotate(-8 150 260)">
        <rect x="80" y="220" width="140" height="110" rx="14" fill="#1B1035" opacity="0.08" />
      </g>

      {/* main box */}
      <g transform="rotate(-4 240 250)">
        <rect x="140" y="180" width="180" height="140" rx="18" fill="#20252B" stroke="#F4F2ED" strokeOpacity="0.12" />
        <rect x="140" y="180" width="180" height="46" rx="18" fill="#F4F2ED" />
        <rect x="200" y="180" width="60" height="46" fill="#F4F2ED" />
        <path d="M205 180v46M255 180v46" stroke="#101316" strokeWidth="2" opacity="0.4" />
      </g>

      {/* coral price tag */}
      <g transform="rotate(12 350 150)">
        <rect x="320" y="120" width="80" height="56" rx="14" fill="#FF6B57" />
        <circle cx="336" cy="136" r="5" fill="#FFF" />
        <rect x="332" y="152" width="48" height="8" rx="4" fill="#FFFFFF" opacity="0.85" />
      </g>

      {/* amber dot accents */}
      <circle cx="110" cy="150" r="14" fill="#C7F36B" />
      <circle cx="370" cy="290" r="10" fill="#6DDBA3" />
      <circle cx="90" cy="310" r="7" fill="#FF6B57" />

      {/* sparkle */}
      <path
        d="M240 90l6 16 16 6-16 6-6 16-6-16-16-6 16-6 6-16Z"
        fill="#C7F36B"
      />
    </svg>
  )
}
