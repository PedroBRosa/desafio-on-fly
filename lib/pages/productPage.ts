import { expect, type Page } from '@playwright/test'

export class Product {
  constructor(readonly page: Page) {}

  validatePage() {
    expect(this.page.url()).toBe(process.env.BASE_URL + '/inventory.html')
  }

  async addToCart(product: string) {
    await this.page.getByTestId(`add-to-cart-${product}`).click()
  }

  async removeToCart(product: string) {
    await this.page.getByTestId(`remove-${product}`).click()
  }
}
