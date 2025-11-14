import { Locator, type Page } from '@playwright/test'

export class Product {
  /**
   * Locator para o titulo do produto
   *
   * Utilizado para identificar e interagir com o titulo do produto
   */
  productTitle: Locator

  /**
   * Locator para a descrição do produto
   *
   * Utilizado para identificar e interagir com a descrição do produto
   */
  productDescription: Locator

  /**
   * Locator para o preço do produto
   *
   * Utilizado para identificar e interagir com o preço do produto
   */
  productPrice: Locator

  /**
   * Locator para o botão adicionar ao carrinho
   *
   * Utilizado para identificar e interagir com o botão adicionar ao carrinhodo na tela de produto
   */
  buttonAddToCart: Locator

  /**
   * Locator para o botão remover
   *
   * Utilizado para identificar e interagir com o botão remover na tela de produto
   */
  buttonRemove: Locator

  constructor(readonly page: Page) {
    this.productTitle = page.locator('[data-test="inventory-item-name"]')
    this.productDescription = page.locator('[data-test="inventory-item-desc"]')
    this.productPrice = page.locator('[data-test="inventory-item-price"]')

    this.buttonAddToCart = page.locator('[data-test="add-to-cart"]')
    this.buttonRemove = page.locator('[data-test="remove"]')
  }
}
