import { expect, Locator, type Page } from '@playwright/test'
import { CheckoutSteps } from '../utils/checkoutStepsEnum'
export class CheckoutPage {
  fristNameInput: Locator
  lastNameInput: Locator
  zipCodeInput: Locator
  cancelButton: Locator
  continueButton: Locator
  errorMenssage: Locator

  constructor(readonly page: Page) {
    this.fristNameInput = page.getByTestId('firstName')
    this.lastNameInput = page.getByTestId('lastName')
    this.zipCodeInput = page.getByTestId('postalCode')
    this.cancelButton = page.getByTestId('cancel')
    this.continueButton = page.getByTestId('continue')
    this.errorMenssage = page.getByTestId('error')
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

  async checkAndValidateError() {
    const errorMenssage = await this.errorMenssage.innerText()
    await expect(this.errorMenssage).toBeVisible()
    await expect(this.errorMenssage).toHaveText(errorMenssage)
  }
}
