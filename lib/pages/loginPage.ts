import { expect, Locator, type Page } from '@playwright/test'

export class LoginPage {
  /**
   * Locator para o input do email
   *
   * Utilizado para identificar e interagir com o input do email da página de login.
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

  constructor(public readonly page: Page) {
    this.inputEmail = page.getByTestId('username')
    this.inputPassword = page.getByTestId('password')
    this.buttonLogin = page.getByTestId('login-button')
  }

  /**
   * Método que realiza o login na plataforma sauce demon
   *
   * @param email recebe o email do tipo string para realizar o login
   * @param password recebe a senha do tipo string para realizar o login
   */
  async doLogin(email: string, password: string) {
    await this.page.goto('/')
    await this.inputEmail.fill(email)
    await this.inputPassword.fill(password)

    await this.buttonLogin.click()

    expect(this.page.url()).not.toBe('/')
  }
}
