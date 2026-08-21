/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f4f9f0",
          100: "#e7f0dc",
          200: "#d1e4b7",
          300: "#b2cf85",
          400: "#8ebd53",
          500: "#769e39",
          600: "#577b2b",
          700: "#425d22",
          800: "#2d4319",
          900: "#1f2f14",
        },
        citrus: {
          50: "#fffaf1",
          100: "#fff0cd",
          200: "#f9df94",
          300: "#f1c75b",
          400: "#e8ae2f",
          500: "#d98c1f",
          600: "#b96e18",
          700: "#8d4d12",
          800: "#64340f",
        },
        sand: "#f7f2ea",
        cream: "#fffdf9",
        ink: "#1d241c",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        tag: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        soft: "0 18px 40px -24px rgba(35, 43, 32, 0.28)",
        card: "0 10px 20px -18px rgba(35, 43, 32, 0.2)",
      },
    },
  },
  plugins: [],
}
