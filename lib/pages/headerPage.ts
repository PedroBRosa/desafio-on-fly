import { expect, Locator, type Page } from '@playwright/test'

export class Header {
  /**
   * Locator para o botão do carrinho
   *
   * Utilizado para identificar e interagir com o botão do carrinho no header da página
   */
  shoppingCartButton: Locator

  /**
   * Locator para verificar a quantidade de itens no carrinho
   */
  shoppingCartQuantity: Locator

  /**
   * Locator para o titulo da página
   *
   * Utilizado para identificar e interagir com o titulo da página
   */
  pageTitle: Locator

  constructor(readonly page: Page) {
    this.shoppingCartButton = page.getByTestId('shopping-cart-link')
    this.shoppingCartQuantity = page.getByTestId('shopping-cart-badge')

    this.pageTitle = page.getByTestId('secondary-header')
  }

  async checkPage(pageName: string) {
    await expect(this.pageTitle).toHaveText(pageName)
  }

  async checkCartQuantity(quantity: string) {
    await expect(this.shoppingCartQuantity).toHaveText(quantity)
  }

  async visitCart() {
    await this.shoppingCartButton.click()
    await this.checkPage('Your Cart')
  }
}
