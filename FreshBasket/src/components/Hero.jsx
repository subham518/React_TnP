import { ArrowRight, MapPin, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-leaf-50 via-cream to-sand" />
      <div className="absolute -right-20 top-0 -z-10 h-80 w-80 rounded-full bg-citrus-100 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-leaf-100 px-3.5 py-2 text-sm font-semibold text-leaf-700">
            <Sparkles className="h-4 w-4" />
            Fresh everyday essentials
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            Better groceries.
            <br />
            Better routines.
            <br />
            <span className="text-leaf-700">FreshBasket</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/70">
            Thoughtful produce, pantry staples, and neighborhood favorites delivered in a calmer, simpler way.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#offers"
              className="inline-flex items-center gap-2 rounded-full bg-leaf-700 px-6 py-3.5 font-semibold text-cream shadow-card transition-all hover:-translate-y-0.5 hover:bg-leaf-800"
            >
              Explore offers
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-white px-6 py-3.5 font-semibold text-ink transition-all hover:border-leaf-300"
            >
              <MapPin className="h-4 w-4" />
              Visit the store
            </a>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="rounded-[2rem] bg-white p-3 shadow-soft">
            <div className="overflow-hidden rounded-[1.5rem]">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                alt="Fresh groceries and vegetables in a shopping basket"
                className="h-[430px] w-full object-cover sm:h-[500px]"
                loading="eager"
              />
            </div>

            <div className="absolute -left-4 top-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-card sm:-left-8">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-citrus-400 font-tag text-sm font-bold text-white">
                40%
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                  Up to
                </p>
                <p className="font-display text-base font-bold text-ink">
                  off today
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 right-6 rounded-2xl bg-leaf-800 px-4 py-3 text-cream shadow-card sm:right-10">
              <p className="font-display text-sm font-semibold">Farm-picked daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
