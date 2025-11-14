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

  /**
   * Locator para o botão My account
   *
   * Utilizado para identificar e interagir com o botão My account disponivel após o login.
   */
  buttonMyAccount: Locator

  constructor(readonly page: Page) {
    this.inputEmail = page.getByRole('textbox', { name: 'Email:' })
    this.inputPassword = page.getByRole('textbox', { name: 'Password:' })
    this.buttonLogin = page.getByRole('button', { name: 'Log in' })

    this.buttonMyAccount = page
      .getByRole('banner')
      .getByRole('link', { name: 'My account' })
  }

  async visit() {
    await this.page.goto('/login')
  }

  async doLogin(email: string, password: string) {
    await this.inputEmail.fill(email)
    await this.inputPassword.fill(password)

    await this.buttonLogin.click()

    await expect(this.buttonMyAccount).toBeVisible()
  }
}
