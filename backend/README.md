# Backend PHP + MySQL - Sistema de Usuários

Este é um backend simples e organizado para cadastro e login de usuários, desenvolvido em PHP com MySQL.

## Estrutura do Projeto

```
backend/
├── config.php          # Configuração do banco de dados
├── register.php        # Cadastro de usuários
├── login.php          # Login de usuários
├── list_users.php     # Listagem de usuários em HTML
├── database_setup.sql # Script de criação do banco
└── README.md          # Este arquivo
```

## Configuração do Banco de Dados

1. Execute o script `database_setup.sql` no phpMyAdmin ou MySQL Workbench
2. O script criará:
   - Banco de dados: `meuprojeto`
   - Tabela: `users` com campos id, email, password, created_at

## Configuração do Ambiente

### WampServer (Recomendado)
1. Instale o WampServer
2. Coloque a pasta `backend/` em `C:\wamp64\www\`
3. Acesse via: `http://localhost/backend/`

### Configurações do Banco
- Host: localhost
- Usuário: root
- Senha: (vazia)
- Banco: meuprojeto

## Como Usar

### 1. Cadastro de Usuário
- Acesse a seção "Cadastrar Usuário" no site principal
- Preencha email e senha (mínimo 6 caracteres)
- Clique em "Cadastrar"
- Será redirecionado para uma página de confirmação

### 2. Login de Usuário
- Acesse a seção "Fazer Login" no site principal
- Digite email e senha cadastrados
- Clique em "Entrar"
- Será redirecionado para uma página de boas-vindas

### 3. Listagem de Usuários
- Após fazer login, clique em "Ver todos os usuários"
- Ou acesse diretamente: `http://localhost/backend/list_users.php`
- Visualize todos os usuários cadastrados em uma tabela HTML

## Formulários HTML

O sistema agora inclui formulários HTML integrados no `index.html`:

- **Seção de Cadastro** (`#cadastro`): Formulário para cadastrar novos usuários
- **Seção de Login** (`#login`): Formulário para autenticação de usuários

Ambos os formulários enviam dados via POST para os respectivos endpoints PHP.

## Segurança Implementada

- ✅ Senhas criptografadas com `password_hash()`
- ✅ Verificação de senhas com `password_verify()`
- ✅ Validação de email
- ✅ Sanitização de dados de entrada
- ✅ Tratamento de erros com try/catch
- ✅ Headers de segurança para JSON
- ✅ Validação de métodos HTTP

## Testando o Backend

### Usando cURL (linha de comando)
```bash
# Cadastrar usuário
curl -X POST http://localhost/backend/register.php -d "email=teste@exemplo.com" -d "password=123456"

# Fazer login
curl -X POST http://localhost/backend/login.php -d "email=teste@exemplo.com" -d "password=123456"

# Listar usuários
curl http://localhost/backend/list_users.php
```

### Usando Postman
1. Configure as requisições POST para register.php e login.php
2. Configure requisição GET para list_users.php
3. Use os parâmetros mencionados acima

## Próximos Passos

Este backend está pronto para ser expandido com:
- Autenticação JWT
- Middleware de autenticação
- Validações mais robustas
- Sistema de logs
- Rate limiting
- Documentação com Swagger

## Suporte

Para dúvidas ou problemas, verifique:
1. Se o WampServer está rodando
2. Se o banco de dados foi criado corretamente
3. Se as configurações em `config.php` estão corretas
4. Os logs de erro do PHP

