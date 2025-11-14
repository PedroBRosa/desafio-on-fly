import { expect, Locator, type Page } from '@playwright/test'

export class Login {
  /**
   * Locator para o input do email
   *
   * Utilizado para identificar e interagir com o o input do email da página de login.
   */
  inputEmail: Locator

  /**
   * Locator para o input de senha
   *
   * Utilizado para identificar e interagir com o input de senha da página de login.
   */
  inputPassword: Locator

  /**
   * Locator para o botão de login
   *
   * Utilizado para identificar e interagir com o botão de login da página de login.
   */
  buttonLogin: Locator

  constructor(readonly page: Page) {
    this.inputEmail = page.locator('[data-test="username"]')
    this.inputPassword = page.locator('[data-test="password"]')
    this.buttonLogin = page.locator('[data-test="login-button"]')
  }

  async doLogin(email: string, password: string) {
    await this.page.goto('/')
    await this.inputEmail.fill(email)
    await this.inputPassword.fill(password)

    await this.buttonLogin.click()

    await expect(
      this.page.locator('[data-test="inventory-container"]'),
    ).toBeVisible()
  }
}
