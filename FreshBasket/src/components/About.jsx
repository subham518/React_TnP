export default function About() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf-700">
            About us
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            A neighborhood shop with a calmer pace.
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-ink/70">
            FreshBasket brings together produce, pantry staples, daily essentials, and small comforts in a place that feels practical, warm, and easy to come back to.
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=900&auto=format&fit=crop"
            alt="Fresh vegetables and fruit crates at FreshBasket"
            loading="lazy"
            className="h-72 w-full rounded-[1.6rem] object-cover shadow-soft sm:h-96"
          />
        </div>
      </div>
    </section>
  )
}
