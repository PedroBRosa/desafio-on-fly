import { test } from '../fixtures'
import { products } from '../../lib/utils/products'
import { getRandomProduct } from '../../lib/helper/products'

test.describe('Feature: Carrinho', () => {
  test.beforeEach(async ({ loginPage }) => {
    const email = process.env.EMAIL as string
    const password = process.env.PASSWORD as string

    await loginPage.doLogin(email, password)
  })

  test('CENÁRIO: Adicionar um produto no carrinho', async ({
    productPage,
    headerPage,
  }) => {
    await test.step('DADO que eu seja um usuário logado"', async () => {
      productPage.validatePage()
    })

    await test.step('QUANDO adicionar um produto no carrinho', async () => {
      await productPage.addToCart(getRandomProduct(products).class)
    })

    await test.step('ENTÃO devo ver o ícone do carrinho com o número 1', async () => {
      await headerPage.checkCartQuantity(1)
    })
  })

  test('CENÁRIO: Adicionar dois ou mais produtos no carrinho', async ({
    products,
    productPage,
    headerPage,
  }) => {
    await test.step('DADO que eu seja um usuário logado"', async () => {
      productPage.validatePage()
    })

    await test.step('QUANDO adicionar dois produtos no carrinho', async () => {
      await productPage.addToCart(products[0].class)
      await productPage.addToCart(products[1].class)
    })

    await test.step('ENTÃO devo ver o ícone do carrinho com o número 2', async () => {
      await headerPage.checkCartQuantity(2)
    })
  })

  for (const [, product] of Object.entries(products)) {
    test(`CENÁRIO: Adicionar o produto ${product.title} e validar no carrinho`, async ({
      headerPage,
      productPage,
      cartPage,
    }) => {
      await test.step('DADO que eu seja um usuário logado"', async () => {
        productPage.validatePage()
      })
      await test.step(`E adiciono o(a) ${product.title} no carrinho`, async () => {
        await productPage.addToCart(product.class)
        await headerPage.checkCartQuantity(1)
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
    products,
    headerPage,
    productPage,
    cartPage,
  }) => {
    await test.step('DADO que eu seja um usuário logado"', async () => {
      productPage.validatePage()
    })

    await test.step('E adiciono dois produtos no carrinho', async () => {
      await productPage.addToCart(products[0].class)
      await productPage.addToCart(products[1].class)
    })

    await test.step('QUANDO acessar o carrinho', async () => {
      await headerPage.visitCart()
    })

    await test.step(`E remover o ${products[0].title} do carrinho`, async () => {
      await headerPage.checkCartQuantity(2)

      await cartPage.removeAndValidateProduct(products[0].id, products[0].class)
    })

    await test.step(`ENTÃO tem que ter apenas um produto no carrinho`, async () => {
      await headerPage.checkCartQuantity(1)
    })
  })

  test(`CENÁRIO: Adicionar dois produtos no carrinho, e remover os dois do carrinho`, async ({
    products,
    headerPage,
    productPage,
    cartPage,
  }) => {
    await test.step('DADO que eu seja um usuário logado"', async () => {
      productPage.validatePage()
    })

    await test.step('E adiciono dois produtos no carrinho', async () => {
      await productPage.addToCart(products[0].class)
      await productPage.addToCart(products[1].class)
    })

    await test.step('QUANDO acessar o carrinho', async () => {
      await headerPage.visitCart()
    })

    await test.step(`E remover o ${products[0].title} e o ${products[1].title} do carrinho`, async () => {
      await headerPage.checkCartQuantity(2)

      await cartPage.removeAndValidateProduct(products[0].id, products[0].class)

      await cartPage.removeAndValidateProduct(products[1].id, products[1].class)
    })

    await test.step('ENTÃO ambos os produtos devem ser removidos do carrinho', async () => {
      await headerPage.checkCartQuantity(0)
    })
  })

  test(`CENÁRIO: Adicionar um produto no carrinho, retornar para a página de produtos, adicionar outro produto e validar no carrinho`, async ({
    products,
    headerPage,
    productPage,
    cartPage,
  }) => {
    await test.step('DADO que eu seja um usuário logado"', async () => {
      productPage.validatePage()
    })

    await test.step('E tenho um produto adicionado no carrinho', async () => {
      await productPage.addToCart(products[0].class)
      await headerPage.checkCartQuantity(1)
      await headerPage.visitCart()
      await cartPage.validateIsProduct(products[0].id, products[0].title)
    })

    await test.step('E clico no botão "Continue Shopping"', async () => {
      await cartPage.continueShoppingButton.click()
      productPage.validatePage()
    })

    await test.step('QUANDO adicionar mais um produto no carrinho"', async () => {
      productPage.validatePage()
      await productPage.addToCart(products[1].class)
      await headerPage.checkCartQuantity(2)
      await headerPage.visitCart()
    })

    await test.step('ENTÃO os dois produtos devem estar no carrinho"', async () => {
      await cartPage.validateIsProduct(products[0].id, products[0].title)
      await cartPage.validateIsProduct(products[1].id, products[1].title)
    })
  })
})
