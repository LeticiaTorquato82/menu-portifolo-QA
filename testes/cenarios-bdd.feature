# language: pt

Funcionalidade: Fluxo de Governança e Validação de Documentos
  Como um Gestor de Qualidade da organização
  Quero auditar e validar novos documentos no acervo
  Para garantir a conformidade com as normas ISO 9001 e evitar obsolescência

  Contexto:
    Dado que a Tabela de Temporalidade Documental está ativa no sistema

  @critico
  Cenário: Aprovação de novo Procedimento Operacional Padrão (POP)
    Dado que um colaborador submeteu o documento "POP-ADM-001" na versão 1.0
    Quando o Gestor de Qualidade executa o Checklist de Auditoria
    E marca todos os critérios de formatação e conteúdo como em conformidade
    Então o status do documento deve mudar para "APROVADO"
    E o sistema deve agendar de forma automática a próxima revisão para daqui a 12 meses
    E disponibilizar o arquivo em formato PDF na pasta oficial da nuvem

  @conformidade
  Cenário: Substituição de documento obsoleto por nova versão
    Dado que o documento "POP-ADM-001" na versão 1.0 já existe no acervo intermediário
    Quando uma nova versão 2.0 do "POP-ADM-001" for aprovada e publicada
    Então o sistema deve alterar o status da versão 1.0 para "OBSOLETO"
    E disparar um alerta para o setor responsável informando sobre a atualização
    E marcar a versão antiga para a fila de descarte seguro

  @seguranca
  Cenário: Execução do descarte seguro de arquivos digitais
    Dado que uma lista de documentos obsoletos foi gerada para expurgo
    Quando o administrador do acervo confirma a validação e autoriza a exclusão
    Então o sistema deve deletar definitivamente os arquivos dos servidores de homologação
    E limpar a lixeira de armazenamento em nuvem
    E registrar o log de exclusão com data, hora e responsável
