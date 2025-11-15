import { expect, type Page } from '@playwright/test'

export class ProductPage {
  constructor(readonly page: Page) {}

  /**
   * @method validatePage verifica a página pela URL
   */
  validatePage() {
    expect(this.page.url()).toBe(process.env.BASE_URL + '/inventory.html')
  }

  /**
   * @method addToCart adiciona o produto no carrinho
   * @param {string} product - recebe o indice class do Produto
   *
   */
  async addToCart(product: string) {
    await this.page.getByTestId(`add-to-cart-${product}`).click()
  }
}
