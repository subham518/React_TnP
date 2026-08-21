import { categories } from "../data.js"

export default function Categories() {
  return (
    <section id="categories" className="bg-leaf-50/60 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf-700">
            Shop by aisle
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            What’s on your list today?
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href="#offers"
              className="group flex flex-col items-center gap-3 animate-fade-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white shadow-card transition-all duration-300 group-hover:ring-citrus-200 sm:h-28 sm:w-28">
                <img
                  src={category.img}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-center text-sm font-semibold text-ink/80">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
