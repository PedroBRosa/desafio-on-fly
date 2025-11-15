import { expect, Locator, type Page } from '@playwright/test'
import { CheckoutSteps } from '../utils/checkoutStepsEnum'
import { OrderPrices } from '../utils/products'

export class CheckoutPage {
  /**
   * @Locator para o input "Frist Name"
   *
   * Utilizado para identificar e interagir com o input "Frist Name".
   */
  fristNameInput: Locator

  /**
   * @Locator para o input "Last Name"
   *
   * Utilizado para identificar e interagir com o input "Last Name".
   */
  lastNameInput: Locator

  /**
   * @Locator para o input "ZipCode"
   *
   * Utilizado para identificar e interagir com o input "ZipCode".
   */
  zipCodeInput: Locator

  /**
   * @Locator para o botão "Continue"
   *
   * Utilizado para identificar e interagir com o botão "Continue"
   */
  continueButton: Locator

  /**
   * @Locator para o popUp de erro
   *
   * Utilizado para identificar e interagir com o popUp de erro
   */
  errorMenssage: Locator

  /**
   * @Locator para o label "subTotal"
   *
   * Utilizado para identificar e interagir com o label "subTotal"
   */
  subTotalLabel: Locator

  /**
   * @Locator para o label "Tax"
   *
   * Utilizado para identificar e interagir com o label "Tax"
   */
  taxLabel: Locator

  /**
   * @Locator para o label "Total"
   *
   * Utilizado para identificar e interagir com o label "Total"
   */
  totalLabe: Locator

  /**
   * @Locator para o botão "Finish"
   *
   * Utilizado para identificar e interagir com o botão "Finish"
   */
  finishButton: Locator

  /**
   * @Locator para o botão "Cancel"
   *
   * Utilizado para identificar e interagir com o botão "Cancel"
   */
  cancelButton: Locator

  constructor(readonly page: Page) {
    this.fristNameInput = page.getByTestId('firstName')
    this.lastNameInput = page.getByTestId('lastName')
    this.zipCodeInput = page.getByTestId('postalCode')
    this.continueButton = page.getByTestId('continue')
    this.errorMenssage = page.getByTestId('error')
    this.subTotalLabel = page.getByTestId('subtotal-label')
    this.taxLabel = page.getByTestId('tax-label')
    this.totalLabe = page.getByTestId('total-label')
    this.finishButton = page.getByTestId('finish')
    this.cancelButton = page.getByTestId('cancel')
  }

  /**
   *@method validateCheckoutStep
   *
   * @param {step} CheckoutSteps.STEP_ONE - valida se o usuário esta na priemira etapa do checkout
   * @param {step} CheckoutSteps.STEP_TWO - valida se o usuário esta na segunda etapa do checkot
   * @param {step} CheckoutSteps.COMPLETE - valida se o usuário completou o checkout
   *
   */
  async validateCheckoutStep(step: CheckoutSteps) {
    expect(this.page.url()).toBe(
      process.env.BASE_URL + `/checkout-${step}.html`,
    )
  }

  /**
   * @method fillCheckoutForms todos os campos do forms presente no step um da tela de checkout
   * @param {string} fristName - primeiro nome do usuário
   * @param {string} lastName - sobrenome do usuário
   * @param {string} zipCode - zipCode (cep) do usuário
   *
   */
  async fillCheckoutForms(
    fristName: string,
    lastName: string,
    zipCode: string,
  ) {
    await this.fristNameInput.fill(fristName)
    await this.lastNameInput.fill(lastName)
    await this.zipCodeInput.fill(zipCode)
  }

  /**
   * @method hasOccurredError Valida o PopUp de error e o texto presente nele
   *
   */
  async hasOccurredError() {
    const errorMenssage = await this.errorMenssage.innerText()
    await expect(this.errorMenssage).toBeVisible()
    await expect(this.errorMenssage).toHaveText(errorMenssage)
  }

  /**
   * @method validateProductOrder valida(verifica) o produto presente na ordem de compra
   * @param {number} id - o id do produto
   * @param {string} title - o titulo(nome) do produto
   * @param {string} price - o valor do produto
   *
   */
  async validateProductOrder(id: number, title: string, price: string) {
    await expect(this.page.getByTestId(`item-${id}-title-link`)).toHaveText(
      title,
    )
    await expect(this.page.getByText(price)).toBeVisible()
  }

  /**
   * @method validateOrderPrices valida todos os valors (subTotal, Tax e Total)
   * @param {OrderPrices} orderPrices - objeto do tipo OrderPrices
   *
   */
  async validateOrderPrices(orderPrices: OrderPrices) {
    await expect(this.subTotalLabel).toHaveText(orderPrices.subtotal)
    await expect(this.taxLabel).toHaveText(orderPrices.tax)
    await expect(this.totalLabe).toHaveText(orderPrices.total)
  }
}
