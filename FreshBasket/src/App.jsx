import Navbar from "./components/Navbar.jsx"
import Hero from "./components/Hero.jsx"
import Offers from "./components/Offers.jsx"
import Categories from "./components/Categories.jsx"
import PromoBanner from "./components/PromoBanner.jsx"
import WhyChooseUs from "./components/WhyChooseUs.jsx"
import About from "./components/About.jsx"
import StoreInfo from "./components/StoreInfo.jsx"
import Footer from "./components/Footer.jsx"

export default function App() {
  return (
    <div className="min-h-screen bg-sand font-body text-ink">
      <Navbar />
      <main>
        <Hero />
        <Offers />
        <Categories />
        <PromoBanner />
        <WhyChooseUs />
        <About />
        <StoreInfo />
      </main>
      <Footer />
    </div>
  )
}
