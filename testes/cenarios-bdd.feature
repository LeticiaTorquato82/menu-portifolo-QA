# language: pt

Funcionalidade: Autenticação de Usuário
  Como um usuário cadastrado no sistema
  Quero conseguir realizar o login na plataforma
  Para acessar as funcionalidades restritas do meu painel

  Contexto: 
    Dado que o usuário está na página inicial de login

  Cenário: Login realizado com sucesso
    Quando insere um e-mail válido e a senha correta
    E clica no botão "Entrar"
    Então o sistema deve processar as credenciais
    E redirecionar o usuário para o "Painel de Controle"
    E exibir uma mensagem de boas-vindas: "Login efetuado com sucesso!"

  Cenário: Tentativa de login com senha incorreta
    Quando insere um e-mail válido e uma senha incorreta
    E clica no botão "Entrar"
    Então o sistema deve exibir um alerta de erro: "E-mail ou senha inválidos."
    E manter o usuário na mesma página de login

  Cenário: Validação de campos obrigatórios vazios
    Quando deixa os campos de e-mail e senha em branco
    E clica no botão "Entrar"
    Então o sistema deve destacar os campos em vermelho
    E exibir a mensagem: "Preenchimento obrigatório."
