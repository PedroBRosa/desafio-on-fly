import { test as base } from '@playwright/test'

// Import dos Page Objects
import { CartPage } from '../lib/pages/cartPage'
import { HeaderPage } from '../lib/pages/headerPage'
import { LoginPage } from '../lib/pages/loginPage'
import { ProductPage } from '../lib/pages/productPage'
import { CheckoutPage } from '../lib/pages/checkoutPage'

import { getRandomProduct } from '../lib/helper/products'
import { Product, products } from '../lib/utils/products'

interface Fixtures {
  //Page Objects
  cartPage: CartPage
  checkoutPage: CheckoutPage
  headerPage: HeaderPage
  loginPage: LoginPage
  productPage: ProductPage

  //Fixture personalizadas
  products: Product[]
  OrderInformationStep: void
  prepareOrderToOverviewStep: Product[]
}

export const test = base.extend<Fixtures>({
  //Page Objects Fixture
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page))
  },

  //Fixture para preparar a order
  products: async ({}, use) => {
    const tempListProducts = { ...products }
    const firstProduct = getRandomProduct(tempListProducts)
    delete tempListProducts[firstProduct.id]
    const listProducts = [getRandomProduct(tempListProducts), firstProduct]

    await use(listProducts)
  },

  OrderInformationStep: async (
    { loginPage, productPage, cartPage },
    use,
  ) => {
    const email = process.env.EMAIL as string
    const password = process.env.PASSWORD as string

    await loginPage.doLogin(email, password)

    await productPage.addToCart(getRandomProduct(products).class)

    await cartPage.visit()
    await cartPage.checkoutButton.click()

    await use()
  },

  prepareOrderToOverviewStep: async (
    { products, loginPage, productPage, cartPage, checkoutPage },
    use,
  ) => {
    const email = process.env.EMAIL as string
    const password = process.env.PASSWORD as string

    await loginPage.doLogin(email, password)

    await productPage.addToCart(products[0].class)
    await productPage.addToCart(products[1].class)

    await cartPage.visit()
    await cartPage.checkoutButton.click()

    await checkoutPage.continueButton.click()

    await use(products)
  },
})
export { expect } from '@playwright/test'
