import { ArrowRight } from "lucide-react"

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-leaf-900 py-20 text-cream">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute -left-10 top-0 h-52 w-52 rounded-full bg-citrus-400/20 blur-3xl" />
      <div className="absolute -bottom-10 right-0 h-64 w-64 rounded-full bg-leaf-600/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <span className="rounded-full bg-citrus-400 px-4 py-1.5 text-sm font-bold text-ink">
          Weekend market pick
        </span>
        <h2 className="font-display text-3xl font-bold sm:text-5xl">
          Save up to 40% on the staples you reach for every day.
        </h2>
        <p className="max-w-xl text-base text-white/75">
          Fresh prices on pantry favorites, produce, and kitchen basics for a little more ease at home.
        </p>
        <a
          href="#offers"
          className="group mt-2 inline-flex items-center gap-2 rounded-full bg-citrus-400 px-7 py-3.5 font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-citrus-300"
        >
          Explore deals
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
