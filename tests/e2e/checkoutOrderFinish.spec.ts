import { test } from '../fixtures'
import { CheckoutSteps } from '../../lib/utils/checkoutStepsEnum'
import { calculateOrderTotals } from '../../lib/helper/orderPriceCalculator'

test.describe(`Feature: Checkout Order Finish`, () => {
  test('CENÁRIO: Usuário conferindo se seu pedido esta correto e finalizando o pagamento', async ({
    orderOverviewStep,
    checkoutPage,
  }) => {
    await test.step('DADO que eu seja um usuário no step de overview do Checkout', async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.STEP_TWO)
    })

    await test.step('QUANDO eu confirmo os detalhes do pedido e os totais', async () => {
      for (const order of orderOverviewStep) {
        await checkoutPage.validateProductOrder(
          order.id,
          order.title,
          order.price,
        )
      }
      await checkoutPage.validateOrderPrices(
        calculateOrderTotals(orderOverviewStep),
      )
      console.log('Valores: ', calculateOrderTotals(orderOverviewStep))
    })

    await test.step('E eu clico no botão "Finish"', async () => {
      await checkoutPage.finishButton.click()
    })

    await test.step('ENTÃO devo ser redirecionado para o step de pagamento concluído', async () => {
      checkoutPage.validateCheckoutStep(CheckoutSteps.COMPLETE)
    })
  })
})
