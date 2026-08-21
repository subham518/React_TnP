# FreshBasket

A clean, handcrafted grocery storefront concept for a neighborhood market, built with
React, Vite, Tailwind CSS, and lucide-react icons. There is no backend, database,
authentication, or cart flow — just a polished, responsive marketing landing page.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Offers.jsx
│   ├── Categories.jsx
│   ├── PromoBanner.jsx
│   ├── WhyChooseUs.jsx
│   ├── About.jsx
│   ├── StoreInfo.jsx
│   └── Footer.jsx
├── data.js       # static offers & categories content
├── App.jsx
├── main.jsx
└── index.css
```

## Design notes

- Primary palette: a deeper leafy green with warm citrus accents on a soft sand background.
- Display type is Fraunces, paired with Inter for body copy and JetBrains Mono for pricing details.
- The cards retain a subtle shelf-tag feel without becoming overly template-like or overly decorative.
- All imagery is sourced from Unsplash and can be swapped in `src/data.js` or the component files.
