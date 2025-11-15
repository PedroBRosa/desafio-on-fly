import { expect, Locator, type Page } from '@playwright/test'

export class LoginPage {
  /**
   * @Locator para o input do email
   *
   * Utilizado para identificar e interagir com o input do email
   */
  inputEmail: Locator

  /**
   * @Locator para o input de senha
   *
   * Utilizado para identificar e interagir com o input de senha
   */
  inputPassword: Locator

  /**
   * @Locator para o botão de login
   *
   * Utilizado para identificar e interagir com o botão de login
   */
  buttonLogin: Locator

  constructor(public readonly page: Page) {
    this.inputEmail = page.getByTestId('username')
    this.inputPassword = page.getByTestId('password')
    this.buttonLogin = page.getByTestId('login-button')
  }

  /**
   * @method doLogin realiza o login na plataforma
   *
   * @param {string} email
   * @param {string} password
   */
  async doLogin(email: string, password: string) {
    await this.page.goto('/')
    await this.inputEmail.fill(email)
    await this.inputPassword.fill(password)

    await this.buttonLogin.click()

    expect(this.page.url()).not.toBe('/')
  }
}
