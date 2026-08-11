// Maps DummyJSON category slugs to a simple SVG path + accent color so
// category cards feel intentional rather than generic. Falls back to a
// generic bag glyph for anything not explicitly mapped.

const ICONS = {
  smartphones: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm4 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  laptops: 'M4 5h16v10H4V5Zm-2 12h20l-2 3H4l-2-3Z',
  tablets: 'M6 2h12a1.5 1.5 0 0 1 1.5 1.5v17A1.5 1.5 0 0 1 18 22H6a1.5 1.5 0 0 1-1.5-1.5v-17A1.5 1.5 0 0 1 6 2Zm6 16.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  'mobile-accessories': 'M12 3c-4.5 0-8 3.6-8 8 0 5.5 8 10 8 10s8-4.5 8-10c0-4.4-3.5-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z',
  'mens-shirts': 'M8 2 4 6l2 3v13h12V9l2-3-4-4-2 2h-4L8 2Z',
  'mens-shoes': 'M3 15c0-2 2-3 4-5l2-3 3 1-1 3 5 2c2 .8 3 2 3 4v1H3v-3Z',
  'mens-watches': 'M8 3h8l1 4H7l1-4Zm0 18h8l1-4H7l1 4ZM7 8h10v8H7V8Zm5 2v4l3 2',
  'womens-dresses': 'M12 2 9 6l-4 15h14L15 6l-3-4Zm0 4v2',
  'womens-shoes': 'M4 16c0-2 3-3 6-5 2-1 3-2 4-4l3 1-1 4 4 2c1.5.7 2 1.8 2 3v2H4v-3Z',
  'womens-bags': 'M8 8V6a4 4 0 0 1 8 0v2h2l1 13H5L6 8h2Zm2 0h4V6a2 2 0 0 0-4 0v2Z',
  'womens-jewellery': 'M12 2 6 9l6 13 6-13-6-7Zm-4.5 7h9L12 4.5 7.5 9Z',
  'womens-watches': 'M8 3h8l1 4H7l1-4Zm0 18h8l1-4H7l1 4ZM7 8h10v8H7V8Zm5 2v4l3 2',
  tops: 'M8 2 4 6l2 3v13h12V9l2-3-4-4-2 2h-4L8 2Z',
  sunglasses: 'M2 9h5.5a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 0 4 0v0A2.5 2.5 0 0 1 16.5 9H22M6.5 9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm11 0a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z',
  furniture: 'M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M4 11h16v6H4v-6Zm1 6v3m14-3v3',
  'home-decoration': 'M4 11 12 4l8 7v9H4v-9Zm5 9v-6h6v6',
  'kitchen-accessories': 'M6 3v9a4 4 0 0 0 4 4v5m-4-9h8M17 3v18',
  groceries: 'M6 8h12l-1.2 10.2A2 2 0 0 1 14.8 20H9.2a2 2 0 0 1-2-1.8L6 8Zm3-2a3 3 0 0 1 6 0',
  beauty: 'M12 2c1.5 2 2 4 2 6a2 2 0 1 1-4 0c0-2 .5-4 2-6Zm-5 9h10l1 11H6l1-11Z',
  'skin-care': 'M12 2a6 6 0 0 1 6 6c0 4-3 6-6 6s-6-2-6-6a6 6 0 0 1 6-6Zm0 12v8',
  fragrances: 'M10 2h4v3h-4V2Zm-2 3h8l1 3H7l1-3Zm-1 4h10l1 9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2l1-9Z',
  motorcycle: 'M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm14 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 17l2-6h4l3 4M8 11 6 7h4',
  vehicle: 'M3 13l2-6h14l2 6v5H3v-5Zm3 5v2m12-2v2M3 13h18',
  'sports-accessories': 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 0v20M2 12h20M4.5 6.5c3 3 12 3 15 0m-15 11c3-3 12-3 15 0',
}

const FALLBACK_ICON = 'M6 8h12l-1.2 10.2A2 2 0 0 1 14.8 20H9.2a2 2 0 0 1-2-1.8L6 8Zm3-2a3 3 0 0 1 6 0'

const PALETTE = ['#FF5B4A', '#FFB020', '#1F9D55', '#1B1035']

export function getCategoryIcon(slug) {
  return ICONS[slug] || FALLBACK_ICON
}

export function getCategoryColor(slug) {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % PALETTE.length
  }
  return PALETTE[hash]
}
