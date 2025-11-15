import { test as base } from '@playwright/test'
import { Cart } from '../lib/pages/cartPage'
import { Header } from '../lib/pages/headerPage'
import { Login } from '../lib/pages/loginPage'
import { Product } from '../lib/pages/productPage'
import { getRandomProduct } from '../lib/helper/products'
import { products } from '../lib/utils/products'
import { Checkout } from '../lib/pages/checkoutPage'

interface Fixtures {
  //Imports dos Pages Objects
  cartPage: Cart
  checkoutPage: Checkout
  headerPage: Header
  loginPage: Login
  productPage: Product

  //Fixture personalizadas
  prepareOrder: void
}

export const test = base.extend<Fixtures>({
  cartPage: async ({ page }, use) => {
    await use(new Cart(page))
  },

  checkoutPage: async ({ page }, use) => {
    await use(new Checkout(page))
  },

  headerPage: async ({ page }, use) => {
    await use(new Header(page))
  },

  loginPage: async ({ page }, use) => {
    await use(new Login(page))
  },

  productPage: async ({ page }, use) => {
    await use(new Product(page))
  },

  //Fixture para preparar a order
  prepareOrder: async ({ loginPage, productPage, cartPage }, use) => {
    const email = process.env.EMAIL as string
    const password = process.env.PASSWORD as string

    await loginPage.doLogin(email, password)

    await productPage.addToCart(getRandomProduct(products).class)

    await cartPage.visit()
    await cartPage.checkoutButton.click()

    await use()
  },
})
export { expect } from '@playwright/test'
