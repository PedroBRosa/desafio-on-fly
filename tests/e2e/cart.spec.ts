import { test } from '../fixtures'
import { products } from '../../lib/utils/products'
import { getRandomProduct } from '../../lib/helper/products'

test.describe('Feature: Carrinho', () => {
  test.beforeEach(
    'DADO que eu seja um usuário logado',
    async ({ loginPage }) => {
      const email = process.env.EMAIL as string
      const password = process.env.PASSWORD as string

      await loginPage.doLogin(email, password)
    },
  )

  test('CENÁRIO: Adicionar um produto no carrinho', async ({
    productPage,
    headerPage,
  }) => {
    await test.step('QUANDO adicionar um produto no carrinho', async () => {
      await productPage.addToCart(getRandomProduct(products).class)
    })

    await test.step('ENTÃO devo ver o ícone do carrinho com o número 1', async () => {
      await headerPage.checkCartQuantity('1')
    })
  })

  test('CENÁRIO: Adicionar dois ou mais produtos no carrinho', async ({
    productPage,
    headerPage,
  }) => {
    const listProducts = { ...products }
    const firstProduct = getRandomProduct(listProducts)
    delete listProducts[firstProduct.id]
    const secondProduct = getRandomProduct(listProducts)

    await test.step('QUANDO adicionar dois produtos no carrinho', async () => {
      await productPage.addToCart(firstProduct.class)
      await productPage.addToCart(secondProduct.class)
    })

    await test.step('ENTÃO devo ver o ícone do carrinho com o número 2', async () => {
      await headerPage.checkCartQuantity('2')
    })
  })

  for (const [, product] of Object.entries(products)) {
    test(`CENÁRIO: Adicionar o produto ${product.title} e validar no carrinho`, async ({
      headerPage,
      productPage,
      cartPage,
    }) => {
      await test.step(`E adicionar o(a) ${product.title} no carrinho`, async () => {
        await productPage.addToCart(product.class)
        await headerPage.checkCartQuantity('1')
      })

      await test.step('QUANDO acessar o carrinho', async () => {
        await headerPage.visitCart()
      })

      await test.step('ENTÃO o produto exibido deve ser o que eu adicionei', async () => {
        await cartPage.validateIsProduct(product.id, product.title)
      })
    })
  }

  test(`CENÁRIO: Adicionar dois produtos no carrinho, e remover um deles dentro do carrinho`, async ({
    headerPage,
    productPage,
    cartPage,
  }) => {
    const listProducts = { ...products }
    const firstProduct = getRandomProduct(listProducts)
    delete listProducts[firstProduct.id]
    const secondProduct = getRandomProduct(listProducts)

    await test.step('E adicionar dois produtos no carrinho', async () => {
      await productPage.addToCart(firstProduct.class)
      await productPage.addToCart(secondProduct.class)
    })

    await test.step('QUANDO acessar o carrinho', async () => {
      await headerPage.visitCart()
    })

    await test.step(`E remover o ${firstProduct.title} do carrinho`, async () => {
      await headerPage.checkCartQuantity('2')

      await cartPage.removeAndValidateProduct(
        firstProduct.id,
        firstProduct.class,
      )

      await headerPage.checkCartQuantity('1')
    })
  })
})
