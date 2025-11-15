import { expect, Locator, type Page } from '@playwright/test'

export class CartPage {
  /**
   * @Locator para o botão "Continue Shoppring"
   *
   * Utilizado para identificar e interagir com o botão "Continue Shoppring".
   */
  continueShoppingButton: Locator

  /**
   * @Locator para o botão "Checkout"
   *
   * Utilizado para identificar e interagir com o botão "Checkout".
   */
  checkoutButton: Locator

  constructor(readonly page: Page) {
    this.continueShoppingButton = page.getByTestId('continue-shopping')
    this.checkoutButton = page.getByTestId('checkout')
  }

  async visit() {
    await this.page.goto('/cart.html')
  }

  /**
   * @method validateIsProduct realiza uma validação se é o produto correto inserido no carrinho
   *
   * @param {number} id - Espera o id do produto
   * @param {string} title - Espera o título do produto
   *
   */
  async validateIsProduct(id: number, title: string) {
    await expect(this.page.getByTestId(`item-${id}-title-link`)).toHaveText(
      title,
    )
  }

  /**
   * @method removeAndValidateProduct remove um produto do carrinho, e valida se o mesmo ainda está visível
   *
   * @param {number} id - Espera o id do produto
   * @param {string} product - Espera o indice "class" do Objeto {Produto} do produto
   *
   */
  async removeAndValidateProduct(id: number, product: string) {
    await this.page.getByTestId(`remove-${product}`).click()
    await expect(this.page.getByTestId(`item-${id}-title-link`)).toBeHidden()
  }
}
