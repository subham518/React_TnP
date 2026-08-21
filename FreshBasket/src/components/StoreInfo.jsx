import { MapPin, Clock, Phone, Navigation } from "lucide-react"

export default function StoreInfo() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-white shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="p-8 sm:p-12 lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf-700">
              Get in touch
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              Visit FreshBasket
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Store Address</p>
                  <p className="mt-0.5 text-sm text-ink/60">
                    FreshBasket Market
                    <br />
                    Main Road, Berhampur, Odisha
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Opening Hours</p>
                  <p className="mt-0.5 text-sm text-ink/60">
                    Monday – Sunday
                    <br />
                    8:00 AM – 10:00 PM
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-leaf-100 text-leaf-700">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <p className="mt-0.5 text-sm text-ink/60">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-leaf-700 px-6 py-3 font-semibold text-cream shadow-card transition-all hover:-translate-y-0.5 hover:bg-leaf-800">
              <Navigation className="h-4 w-4" />
              Get Directions
            </button>
          </div>

          <div className="min-h-[280px] lg:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop"
              alt="FreshBasket supermarket storefront"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
