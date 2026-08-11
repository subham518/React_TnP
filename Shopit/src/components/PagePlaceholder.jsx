export default function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <section className="container-shop py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-coral">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-ink-900 sm:text-4xl">{title}</h1>
        <p className="mt-4 text-ink-600">{description}</p>
      </div>
    </section>
  )
}
