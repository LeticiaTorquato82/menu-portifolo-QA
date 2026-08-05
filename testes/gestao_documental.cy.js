describe('Fluxo de Governança e Qualidade - Sistema de Gestão Documental', () => {

  beforeEach(() => {
    // Acessa o ambiente de homologação do sistema de acervo documental
    cy.visit('https://sistema-acervo.com')
    
    // Simula que o usuário já está autenticado como Gestor de Qualidade
    cy.loginComoGestor('Letícia Torquato') 
  })

  it('Deve aprovar um novo POP após validação bem-sucedida do Checklist de Auditoria', () => {
    // 1. Inicia a submissão de um novo arquivo técnico no acervo
    cy.get('button[data-testid="btn-novo-documento"]').click()

    // 2. Preenche os metadados do documento de acordo com o padrão definido
    cy.get('input[name="codigo"]').type('POP-ADM-001')
    cy.get('input[name="titulo"]').type('Procedimento Operacional Padrão de Compras')
    cy.get('select[name="categoria"]').select('Procedimentos (POPs / ITs)')

    // 3. Faz o upload fictício do documento técnico em formato PDF
    cy.get('input[type="file"]').selectFile('cypress/fixtures/pop-adm-001-v1.pdf')
    cy.get('button[type="submit"]').click()

    // 4. Aplica o Checklist de Auditoria (Validando os critérios de qualidade)
    cy.get('input[checkbox-id="estrutura-formatacao"]').check()
    cy.get('input[checkbox-id="conteudo-fluxo"]').check()
    cy.get('input[checkbox-id="governanca-temporalidade"]').check()

    // 5. Finaliza a auditoria do documento
    cy.get('button[data-testid="btn-finalizar-auditoria"]').click()

    // 6. Asserções (Validações do Cypress):
    // Garante que o status do documento mudou para APROVADO
    cy.get('.status-badge').should('contain', 'APROVADO')
    // Garante que o sistema agendou automaticamente a próxima revisão para daqui a 12 meses
    cy.get('.proxima-revisao-data').should('be.visible')
  })

  it('Deve alterar o status de um documento para OBSOLETO ao publicar uma nova versão', () => {
    // 1. Busca pelo documento existente de versão anterior
    cy.get('input[placeholder="Buscar documento..."]').type('POP-ADM-001')
    cy.get('.lista-resultados').contains('POP-ADM-001').click()

    // 2. Envia a nova versão 2.0 do documento para o sistema
    cy.get('button[data-testid="btn-atualizar-versao"]').click()
    cy.get('input[name="versao"]').type('2.0')
    cy.get('input[type="file"]').selectFile('cypress/fixtures/pop-adm-001-v2.pdf')
    cy.get('button[data-testid="btn-publicar-nova-versao"]').click()

    // 3. Asserções (Validações do Cypress):
    // A nova versão 2.0 deve constar como Ativa e Aprovada
    cy.get('.versao-atual').should('contain', '2.0')
    // A versão 1.0 antiga deve ter mudado o status automaticamente para OBSOLETA
    cy.get('.historico-versoes').contains('v1.0').parent().find('.status')
      .should('contain', 'OBSOLETO')
  })

  it('Deve executar o descarte seguro de arquivos digitais em conformidade com a Tabela de Temporalidade', () => {
    // 1. Acessa a fila de expurgo de arquivos obsoletos
    cy.get('a[href="/fila-descarte"]').click()

    // 2. Seleciona o documento obsoleto que cumpriu o prazo de guarda intermediário
    cy.get('.lista-descarte').contains('POP-ADM-001').parent().find('input[type="checkbox"]').check()

    // 3. Executa a ação de exclusão definitiva
    cy.get('button[data-testid="btn-autorizar-exclusao"]').click()

    // 4. Asserções (Validações do Cypress):
    // Garante que o arquivo sumiu da listagem ativa do acervo
    cy.get('.lista-descarte').should('not.contain', 'POP-ADM-001')
    // Valida que o log de exclusão segura foi gerado no sistema com sucesso
    cy.get('.log-auditoria-sistema').should('contain', 'Exclusão definitiva executada por Letícia Torquato')
  })
})

