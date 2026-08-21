import { Leaf, Tag, LayoutGrid, MapPinned } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Picked fresh",
    text: "Produce and pantry essentials chosen for daily life and real kitchens.",
  },
  {
    icon: Tag,
    title: "Meaningful prices",
    text: "Everyday deals that stay useful, not just flashy.",
  },
  {
    icon: LayoutGrid,
    title: "Everything close by",
    text: "Groceries, dairy, bakery, and household picks in one calm stop.",
  },
  {
    icon: MapPinned,
    title: "Local and familiar",
    text: "A neighbourhood shop built around convenience and care.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf-700">
          Why FreshBasket
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          A better kind of grocery run.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }, index) => (
          <div
            key={title}
            className="group rounded-[1.5rem] border border-black/5 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 animate-fade-up"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-100 text-leaf-700 transition-colors group-hover:bg-leaf-700 group-hover:text-white">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
