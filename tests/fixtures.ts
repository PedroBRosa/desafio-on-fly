import { test as base } from '@playwright/test'
import { Cart } from '../lib/pages/cartPage'
import { Header } from '../lib/pages/headerPage'
import { Login } from '../lib/pages/loginPage'
import { Product } from '../lib/pages/productPage'

interface Fixtures {
  cartPage: Cart
  headerPage: Header
  loginPage: Login
  productPage: Product
}

export const test = base.extend<Fixtures>({
  cartPage: async ({ page }, use) => {
    await use(new Cart(page))
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

})
export { expect } from '@playwright/test'
