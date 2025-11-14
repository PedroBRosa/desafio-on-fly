import { expect, test } from '@playwright/test'
import { Login } from '../lib/pages/login'

test.describe('Feature: Carrinho', () => {
  test.beforeEach('DADO que eu seja um usuário logado', async ({ page }) => {
    const login = new Login(page)

    const email = process.env.EMAIL || ''
    const password = process.env.PASSWORD || ''

    await login.doLogin(email, password)
  })
  test('Cenário: Adicionar um produto no carrinho', async ({ page }) => {
    await test.step('QUANDO adicionar um produto no carrinho', async () => {
      await page
        .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click()
    })

    await test.step('ENTÃO devo ver o ícone do carrinho com o número 1', async () => {
      await expect(
        page.locator('[data-test="shopping-cart-badge"]'),
      ).toHaveText('1')
    })
  })

  test('Cenário: Adicionar dois ou mais produtos no carrinho', async ({
    page,
  }) => {
    await test.step('QUANDO adicionar dois produtos no carrinho', async () => {
      await page
        .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
        .click()

      await page
        .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        .click()
    })

    await test.step('ENTÃO devo ver o ícone do carrinho com o número 2', async () => {
      await expect(
        page.locator('[data-test="shopping-cart-badge"]'),
      ).toHaveText('2')
    })
  })
})
