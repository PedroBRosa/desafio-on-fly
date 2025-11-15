import { expect, type Page } from '@playwright/test'

export class Cart {
  constructor(readonly page: Page) {}

  async validateIsProduct(id: number, title: string) {
    await expect(this.page.getByTestId(`item-${id}-title-link`)).toHaveText(
      title,
    )
  }

  async removeAndValidateProduct(id: number, product: string) {
    await this.page.getByTestId(`remove-${product}`).click()
    await expect(this.page.getByTestId(`item-${id}-title-link`)).toBeHidden()
  }
}
