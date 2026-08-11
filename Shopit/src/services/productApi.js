const BASE_URL = 'https://dummyjson.com/products'

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }
  return res.json()
}

/**
 * Fetch a page of products.
 * @param {{ limit?: number, skip?: number }} options
 */
export async function fetchProducts({ limit = 30, skip = 0 } = {}) {
  const url = `${BASE_URL}?limit=${limit}&skip=${skip}`
  const res = await fetch(url)
  return handleResponse(res)
}

/**
 * Fetch a single product by id.
 * @param {string|number} id
 */
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(res)
}

/**
 * Fetch the list of available categories.
 * Returns an array of { slug, name, url }.
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`)
  return handleResponse(res)
}

/**
 * Fetch products belonging to a single category slug.
 * @param {string} categorySlug
 */
export async function fetchProductsByCategory(categorySlug) {
  const res = await fetch(`${BASE_URL}/category/${categorySlug}`)
  return handleResponse(res)
}

/**
 * Search products by a free-text query.
 * @param {string} query
 */
export async function searchProducts(query) {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`)
  return handleResponse(res)
}
