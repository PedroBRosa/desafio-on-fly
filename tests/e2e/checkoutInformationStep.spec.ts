import { test } from '../fixtures'
import { userGenerator } from '../../lib/helper/userGenerator'
import { CheckoutSteps } from '../../lib/utils/checkoutStepsEnum'

test.describe(`\n Feature: Checkout: Suas informações (step um do checkout)`, () => {
  test('CENÁRIO: Usuário preenchedo todos os dados do forms deve conseguir avançar no fluxo', async ({
    prepareOrder: _prepareOrder,
    checkoutPage,
  }) => {
    const user = userGenerator()

    await test.step('DADO que eu seja um usuário no primeiro step do checkout"', async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('QUANDO preencher todos os campos do forms', async () => {
      await checkoutPage.fillCheckoutForms(
        user.fristName,
        user.lasName,
        user.zipCode,
      )
    })

    await test.step('E clicar no botão "Continue"', async () => {
      await checkoutPage.continueButton.click()
    })

    await test.step('ENTÃO devo seguir para o próximo step do checkout', async () => {
      await checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_TWO)
    })
  })

  test('CENÁRIO: Usuário sem preencher o forms e tentar avaçar para o próximo step deve receber um error', async ({
    prepareOrder: _prepareOrder,
    checkoutPage,
  }) => {
    await test.step(`DADO que eu seja um usuário no primeiro step do checkout"`, async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('QUANDO clicar no botão "Continue"', async () => {
      await checkoutPage.continueButton.click()
    })

    await test.step('E ver um error', async () => {
      await checkoutPage.checkAndValidateError()
    })

    await test.step('ENTÃO não posso seguir para o próximo step', async () => {
      await checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })
  })

  test('CENÁRIO: Usuário preenchedo somente o primeiro nome quando tentar avaçar para o próximo step deve receber um error', async ({
    prepareOrder: _prepareOrder,
    checkoutPage,
  }) => {
    const user = userGenerator()

    await test.step(`DADO que eu seja um usuário no primeiro step do checkout"`, async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('QUANDO preencher o primeiro nome', async () => {
      await checkoutPage.fristNameInput.fill(user.fristName)
    })

    await test.step('E clicar no botão "Continue"', async () => {
      await checkoutPage.continueButton.click()
    })

    await test.step('ENTÃO não posso seguir para o próximo step', async () => {
      await checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('E devo ver um error', async () => {
      await checkoutPage.checkAndValidateError()
    })
  })

  test('CENÁRIO: Usuário preenchedo somente o sobrenome quando tentar avaçar para o próximo step deve receber um error', async ({
    prepareOrder: _prepareOrder,
    checkoutPage,
  }) => {
    const user = userGenerator()

    await test.step(`DADO que eu seja um usuário no primeiro step do checkout"`, async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('QUANDO preencher o sobrenome', async () => {
      await checkoutPage.lastNameInput.fill(user.lasName)
    })

    await test.step('E clicar no botão "Continue"', async () => {
      await checkoutPage.continueButton.click()
    })

    await test.step('ENTÃO não posso seguir para o próximo step', async () => {
      await checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('E devo ver um error', async () => {
      await checkoutPage.checkAndValidateError()
    })
  })

  test('CENÁRIO: Usuário preenchedo somente o zipcode quando tentar avaçar para o próximo step deve receber um error', async ({
    prepareOrder: _prepareOrder,
    checkoutPage,
  }) => {
    const user = userGenerator()

    await test.step(`DADO que eu seja um usuário no primeiro step do checkout"`, async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('QUANDO preencher o zipCode', async () => {
      await checkoutPage.zipCodeInput.fill(user.zipCode)
    })

    await test.step('E clicar no botão "Continue"', async () => {
      await checkoutPage.continueButton.click()
    })

    await test.step('ENTÃO não posso seguir para o próximo step', async () => {
      await checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('E devo ver um error', async () => {
      await checkoutPage.checkAndValidateError()
    })
  })

  test('CENÁRIO: Usuário preenchedo somente o primeiro nome e o sobrenome quando tentar avaçar para o próximo step deve receber um error', async ({
    prepareOrder: _prepareOrder,
    checkoutPage,
  }) => {
    const user = userGenerator()

    await test.step(`DADO que eu seja um usuário no primeiro step do checkout"`, async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('QUANDO preencher o primeiro nome e o sobrenome', async () => {
      await checkoutPage.fristNameInput.fill(user.fristName)
      await checkoutPage.lastNameInput.fill(user.lasName)
    })

    await test.step('E clicar no botão "Continue"', async () => {
      await checkoutPage.continueButton.click()
    })

    await test.step('ENTÃO não posso seguir para o próximo step', async () => {
      await checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('E devo ver um error', async () => {
      await checkoutPage.checkAndValidateError()
    })
  })

  test('CENÁRIO: Usuário preenchedo somente o primeiro nome e o zipCode quando tentar avaçar para o próximo step deve receber um error', async ({
    prepareOrder: _prepareOrder,
    checkoutPage,
  }) => {
    const user = userGenerator()

    await test.step(`DADO que eu seja um usuário no primeiro step do checkout"`, async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('QUANDO preencher o primeiro nome e o zipCode', async () => {
      await checkoutPage.fristNameInput.fill(user.fristName)
      await checkoutPage.zipCodeInput.fill(user.zipCode)
    })

    await test.step('E clicar no botão "Continue"', async () => {
      await checkoutPage.continueButton.click()
    })

    await test.step('ENTÃO não posso seguir para o próximo step', async () => {
      await checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('E devo ver um error', async () => {
      await checkoutPage.checkAndValidateError()
    })
  })

  test('CENÁRIO: Usuário preenchedo somente o sobrenome e o zipCode quando tentar avaçar para o próximo step deve receber um error', async ({
    prepareOrder: _prepareOrder,
    checkoutPage,
  }) => {
    const user = userGenerator()

    await test.step(`DADO que eu seja um usuário no primeiro step do checkout"`, async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('QUANDO preencher o primeiro nome e o zipCode', async () => {
      await checkoutPage.lastNameInput.fill(user.lasName)
      await checkoutPage.zipCodeInput.fill(user.zipCode)
    })

    await test.step('E clicar no botão "Continue"', async () => {
      await checkoutPage.continueButton.click()
    })

    await test.step('ENTÃO não posso seguir para o próximo step', async () => {
      await checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_ONE)
    })

    await test.step('E devo ver um error', async () => {
      await checkoutPage.checkAndValidateError()
    })
  })
})
