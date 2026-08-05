describe('Fluxo de Autenticação - Sistema de Gestão Documental', () => {
  
  // Executa antes de cada cenário de teste
  beforeEach(() => {
    // Simula a navegação para a página de login do sistema
    cy.visit('https://gestaodocumental.com')
  })

  it('Deve realizar o login com sucesso utilizando credenciais válidas', () => {
    // Preenche o campo de e-mail
    cy.get('input[id="email-input"]')
      .type('leticia.qualidade@empresa.com')

    // Preenche o campo de senha
    cy.get('input[id="password-input"]')
      .type('SenhaSegura123!')

    // Clica no botão de enviar/entrar
    cy.get('button[type="submit"]')
      .click()

    // Validações pós-login (Asserções)
    cy.url().should('include', '/dashboard')
    cy.get('.welcome-message')
      .should('be.visible')
      .and('contain', 'Login efetuado com sucesso!')
  })

  it('Deve exibir mensagem de erro ao tentar logar com senha incorreta', () => {
    cy.get('input[id="email-input"]')
      .type('leticia.qualidade@empresa.com')

    cy.get('input[id="password-input"]')
      .type('SenhaIncorreta')

    cy.get('button[type="submit"]')
      .click()

    // Validação da mensagem de erro na tela
    cy.get('.alert-error-message')
      .should('be.visible')
      .and('contain', 'E-mail ou senha inválidos.')
  })

  it('Deve validar campos obrigatórios vazios', () => {
    // Clica direto no botão sem preencher nada
    cy.get('button[type="submit"]')
      .click()

    // Valida se as tags de erro de validação do formulário apareceram
    cy.get('.error-feedback')
      .should('have.length', 2)
      .and('contain', 'Preenchimento obrigatório.')
  })
})
