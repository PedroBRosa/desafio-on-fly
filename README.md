# Desafio On Fly - Testes E2E com Playwright

## 📋 Descrição

Projeto de automação de testes end-to-end (E2E) para o site [Sauce Demo](https://www.saucedemo.com/) utilizando Playwright e TypeScript. O projeto implementa o padrão Page Object Model (POM) e utiliza fixtures customizadas para facilitar a reutilização de código e manutenção dos testes.

## 🚀 Tecnologias Utilizadas

- **[Playwright](https://playwright.dev/)** - Framework de automação de testes E2E
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem de programação
- **[Node.js](https://nodejs.org/)** - Ambiente de execução JavaScript
- **[@faker-js/faker](https://fakerjs.dev/)** - Geração de dados fake
- **[faker-br](https://www.npmjs.com/package/faker-br)** - Geração de dados brasileiros
- **[ESLint](https://eslint.org/)** - Linter para qualidade de código
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gerenciamento de variáveis de ambiente

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/PedroBRosa/desafio-on-fly.git
cd desafio-on-fly
```

2. Instale as dependências:
```bash
npm install
```

3. Instale os navegadores do Playwright:
```bash
npx playwright install
```

4. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

## ▶️ Como Executar os Testes

### Executar todos os testes:
```bash
npx playwright test
```

### Executar testes em modo headed (visualizando o navegador):
```bash
npx playwright test --headed
```

### Executar testes em um navegador específico:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Executar um arquivo de teste específico:
```bash
npx playwright test tests/e2e/cart.spec.ts
```

### Visualizar o relatório de testes:
```bash
npx playwright show-report
```

### Executar testes em modo debug:
```bash
npx playwright test --debug
```

## 📁 Estrutura do Projeto

```
desafio-on-fly/
├── lib/
│   ├── helper/
│   │   ├── orderPriceCalculator.ts    # Calculadora de preços de pedidos
│   │   ├── products.ts                # Helper para seleção de produtos
│   │   └── userGenerator.ts           # Gerador de dados de usuário
│   ├── pages/
│   │   ├── cartPage.ts                # Page Object do carrinho
│   │   ├── checkoutPage.ts            # Page Object do checkout
│   │   ├── headerPage.ts              # Page Object do header
│   │   ├── loginPage.ts               # Page Object de login
│   │   └── productPage.ts             # Page Object de produtos
│   └── utils/
│       ├── checkoutStepsEnum.ts       # Enum dos steps do checkout
│       └── products.ts                # Dados dos produtos
├── tests/
│   ├── e2e/
│   │   ├── cart.spec.ts               # Testes do carrinho
│   │   ├── checkoutInformationStep.spec.ts  # Testes do step de informações
│   │   └── checkoutOrderFinish.spec.ts      # Testes de finalização do pedido
│   └── fixtures.ts                    # Fixtures customizadas
├── .env                               # Variáveis de ambiente (não versionado)
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── playwright.config.ts               # Configuração do Playwright
└── README.md
```

## 🧪 Cenários de Teste (BDD)

### Feature: Carrinho

#### CENÁRIO: Adicionar um produto no carrinho
```gherkin
DADO que eu seja um usuário logado
QUANDO adicionar um produto no carrinho
ENTÃO devo ver o ícone do carrinho com o número 1
```

#### CENÁRIO: Adicionar dois ou mais produtos no carrinho
```gherkin
DADO que eu seja um usuário logado
QUANDO adicionar dois produtos no carrinho
ENTÃO devo ver o ícone do carrinho com o número 2
```

#### CENÁRIO: Adicionar o produto [Nome do Produto] e validar no carrinho
```gherkin
DADO que eu seja um usuário logado
E adiciono o(a) [Nome do Produto] no carrinho
QUANDO acessar o carrinho
ENTÃO o produto exibido deve ser o que eu adicionei
```

**Produtos testados:**
- Sauce Labs Bike Light
- Sauce Labs Bolt T-Shirt
- Sauce Labs Onesie
- Test.allTheThings() T-Shirt (Red)
- Sauce Labs Backpack
- Sauce Labs Fleece Jacket

#### CENÁRIO: Adicionar dois produtos no carrinho, e remover um deles dentro do carrinho
```gherkin
DADO que eu seja um usuário logado
E adiciono dois produtos no carrinho
QUANDO acessar o carrinho
E remover o [Produto 1] do carrinho
ENTÃO tem que ter apenas um produto no carrinho
```

#### CENÁRIO: Adicionar dois produtos no carrinho, e remover os dois do carrinho
```gherkin
DADO que eu seja um usuário logado
E adiciono dois produtos no carrinho
QUANDO acessar o carrinho
E remover o [Produto 1] e o [Produto 2] do carrinho
ENTÃO ambos os produtos devem ser removidos do carrinho
```

#### CENÁRIO: Adicionar um produto no carrinho, retornar para a página de produtos, adicionar outro produto e validar no carrinho
```gherkin
DADO que eu seja um usuário logado
E tenho um produto adicionado no carrinho
E clico no botão "Continue Shopping"
QUANDO adicionar mais um produto no carrinho
ENTÃO os dois produtos devem estar no carrinho
```

---

### Feature: Checkout (Step das Informações do Usuário)

#### CENÁRIO: Usuário preenchendo todos os dados do forms deve conseguir avançar no fluxo
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO preencher todos os campos do forms
E clicar no botão "Continue"
ENTÃO devo seguir para o próximo step do checkout
```

#### CENÁRIO: Usuário desistindo da compra
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO clicar no botão "Cancel"
ENTÃO devo retornar para a página do carrinho
```

#### CENÁRIO: Usuário sem preencher o forms e tentar avançar para o próximo step deve receber um erro
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO clicar no botão "Continue"
E ver um erro
ENTÃO não posso seguir para o próximo step
```

#### CENÁRIO: Usuário preenchendo somente o primeiro nome quando tentar avançar para o próximo step deve receber um erro
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO preencher o primeiro nome
E clicar no botão "Continue"
ENTÃO não posso seguir para o próximo step
E devo ver um erro
```

#### CENÁRIO: Usuário preenchendo somente o sobrenome quando tentar avançar para o próximo step deve receber um erro
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO preencher o sobrenome
E clicar no botão "Continue"
ENTÃO não posso seguir para o próximo step
E devo ver um erro
```

#### CENÁRIO: Usuário preenchendo somente o zipcode quando tentar avançar para o próximo step deve receber um erro
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO preencher o zipCode
E clicar no botão "Continue"
ENTÃO não posso seguir para o próximo step
E devo ver um erro
```

#### CENÁRIO: Usuário preenchendo somente o primeiro nome e o sobrenome quando tentar avançar para o próximo step deve receber um erro
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO preencher o primeiro nome e o sobrenome
E clicar no botão "Continue"
ENTÃO não posso seguir para o próximo step
E devo ver um erro
```

#### CENÁRIO: Usuário preenchendo somente o primeiro nome e o zipCode quando tentar avançar para o próximo step deve receber um erro
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO preencher o primeiro nome e o zipCode
E clicar no botão "Continue"
ENTÃO não posso seguir para o próximo step
E devo ver um erro
```

#### CENÁRIO: Usuário preenchendo somente o sobrenome e o zipCode quando tentar avançar para o próximo step deve receber um erro
```gherkin
DADO que eu seja um usuário no primeiro step do checkout
QUANDO preencher o primeiro nome e o zipCode
E clicar no botão "Continue"
ENTÃO não posso seguir para o próximo step
E devo ver um erro
```

---

### Feature: Checkout Order Finish

#### CENÁRIO: Usuário conferindo se seu pedido está correto e finalizando o pagamento
```gherkin
DADO que eu seja um usuário no step de overview do Checkout
QUANDO eu confirmo os detalhes do pedido e os totais
E eu clico no botão "Finish"
ENTÃO devo ser redirecionado para o step de pagamento concluído
```

---

## 🏗️ Padrões e Arquitetura

### Page Object Model (POM)
O projeto utiliza o padrão Page Object Model para organizar os elementos e ações das páginas, facilitando a manutenção e reutilização do código.

### Fixtures Customizadas
Fixtures são utilizadas para:
- Instanciar Page Objects automaticamente
- Preparar dados de teste (produtos, usuários)
- Configurar estados iniciais dos testes (orderInformationStep, orderOverviewStep)

### Helpers
Funções auxiliares para:
- Geração de dados fake (usuários brasileiros)
- Cálculo de preços de pedidos
- Seleção aleatória de produtos

## 📊 Configuração do Playwright

O projeto está configurado para executar testes em:
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)

Configurações adicionais:
- Execução paralela de testes
- 2 tentativas em caso de falha
- Screenshots automáticos
- Trace em caso de falha
- Relatório HTML

## 👤 Autor

**Pedro Rosa**

- GitHub: [@PedroBRosa](https://github.com/PedroBRosa)

