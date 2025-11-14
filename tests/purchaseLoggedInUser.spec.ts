import { test } from '@playwright/test'
import { Login } from '../lib/pages/login'

test.describe('Feature: Compra', () => {
  test('Cenário: Usuário logado adicionando um item no carrinho', async ({
    page,
  }) => {
    const login = new Login(page)
    const email = process.env.EMAIL || ''
    const password = process.env.PASSWORD || ''

    await test.step('DADO que eu seja um usuário logado', async () => {
      await login.visit()
      await login.doLogin(email, password)
    })
  })
})
