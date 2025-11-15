import { expect, Locator, type Page } from '@playwright/test'
import { CheckoutSteps } from '../utils/checkoutStepsEnum'
import { OrderPrices } from '../utils/products'

export class CheckoutPage {
  fristNameInput: Locator
  lastNameInput: Locator
  zipCodeInput: Locator
  continueButton: Locator
  errorMenssage: Locator
  subTotalLabel: Locator
  taxLabel: Locator
  totalLabe: Locator
  finishButton: Locator
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
   * @method  preenche todos os campos do forms presente no step um da tela de checkout
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

  async hasOccurredError() {
    const errorMenssage = await this.errorMenssage.innerText()
    await expect(this.errorMenssage).toBeVisible()
    await expect(this.errorMenssage).toHaveText(errorMenssage)
  }

  async validateProductOrder(id: number, title: string, price: string) {
    await expect(this.page.getByTestId(`item-${id}-title-link`)).toHaveText(
      title,
    )
    await expect(this.page.getByText(price)).toBeVisible()
  }

  async validateOrderPrices(orderPrices: OrderPrices) {
    await expect(this.subTotalLabel).toHaveText(orderPrices.subtotal)
    await expect(this.taxLabel).toHaveText(orderPrices.tax)
    await expect(this.totalLabe).toHaveText(orderPrices.total)
  }
}
