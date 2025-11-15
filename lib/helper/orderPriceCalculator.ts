import { Product, OrderPrices } from '../utils/products'

type ProductOrder = Product | Product[]

/**
 * Remove todos os caracteres que não são dígitos (0-9) ou ponto decimal (.).
 * Essencial para limpar strings de moeda antes da conversão numérica (ex: '$9.99' -> '9.99').
 * @param str A string de entrada a ser limpa.
 * @returns A string contendo apenas caracteres numéricos e o ponto decimal.
 */
const cleanNumericString = (str: string): string => {
  return str.replace(/[^\d.]/g, '')
}

/**
 * Formata um valor numérico para uma string monetária no formato '$X.XX'.
 * @param amount O valor numérico a ser formatado.
 * @returns A string monetária formatada (ex: '$12.50').
 */
const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`
}

/**
 * Calcula o subtotal, a taxa e o total final de uma lista de produtos.
 * @param productsOrder Um único objeto Product ou um Array de produtos (Product[]).
 * @param taxRate A taxa percentual a ser aplicada (padrão é 0.08, ou 8%).
 * @returns Um objeto OrderTotalPrice com 'subtotal', 'tax' e 'total' formatados como strings monetárias.
 */
export function calculateOrderTotals(
  productsOrder: ProductOrder,
  taxRate = 0.08,
): OrderPrices {
  const products: Product[] = Array.isArray(productsOrder)
    ? productsOrder
    : [productsOrder]
  const subtotal = products.reduce((sum, product) => {
    const cleanedPriceString = cleanNumericString(product.price)

    const price = parseFloat(cleanedPriceString)

    if (isNaN(price)) {
      console.warn(
        `Valor de preço ou quantidade inválido para o produto ${product.title}. Item ignorado.`,
      )
      return sum
    }

    return sum + price
  }, 0)

  const tax = subtotal * taxRate

  const total = subtotal + tax

  return {
    subtotal: 'Item total: ' + formatCurrency(subtotal),
    tax: 'Tax: ' + formatCurrency(tax),
    total: 'Total: ' + formatCurrency(total),
  }
}
