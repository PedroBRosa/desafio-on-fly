import { Product } from '../utils/products'

export function getRandomProduct(products: Record<string, Product>): Product {
  const keys = Object.keys(products)
  const randomIndex = Math.floor(Math.random() * keys.length)
  const randomKey = keys[randomIndex]

  return products[randomKey]
}
