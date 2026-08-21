import { offers } from "../data.js"

export default function Offers() {
  return (
    <section id="offers" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-citrus-600">
            Limited time
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            Basket favorites this week
          </h2>
        </div>
        <p className="max-w-sm text-ink/65">
          Smart prices on everyday staples, picked for busy households.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((item, index) => (
          <article
            key={item.id}
            className="price-tag group ml-2 rounded-[1.5rem] bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft animate-fade-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <span className="tag-hole" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-t-[1.5rem]">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-citrus-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {item.discount}% off
              </span>
            </div>

            <div className="scallop-edge -mt-px h-3 bg-white" />

            <div className="px-5 pb-5 pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-leaf-700">
                {item.category}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                {item.name}
              </h3>

              <div className="mt-4 flex items-end justify-between border-t border-dashed border-black/5 pt-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-tag text-xl font-bold text-leaf-800">
                    ₹{item.price}
                  </span>
                  <span className="font-tag text-sm text-ink/40 line-through">
                    ₹{item.oldPrice}
                  </span>
                </div>
                <span className="text-xs text-ink/50">/{item.unit}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
