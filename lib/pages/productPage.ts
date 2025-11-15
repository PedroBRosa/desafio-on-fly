import { type Page } from '@playwright/test'

export class Product {
  constructor(readonly page: Page) {}

  async addToCart(product: string) {
    await this.page.getByTestId(`add-to-cart-${product}`).click()
  }

  async removeToCart(product: string) {
    await this.page.getByTestId(`remove-${product}`).click()
  }
}
