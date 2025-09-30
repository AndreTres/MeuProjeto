# Backend PHP + MySQL - Sistema de Usuários

Este é um backend simples e organizado para cadastro e login de usuários, desenvolvido em PHP com MySQL.

## Estrutura do Projeto

```
backend/
├── config.php          # Configuração do banco de dados
├── register.php        # Cadastro de usuários
├── login.php          # Login de usuários
├── list_users.php     # Listagem de usuários
├── database_setup.sql # Script de criação do banco
└── README.md          # Este arquivo
```

## Configuração do Banco de Dados

1. Execute o script `database_setup.sql` no phpMyAdmin ou MySQL Workbench
2. O script criará:
   - Banco de dados: `meu_sistema`
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
- Banco: meu_sistema

## Endpoints Disponíveis

### 1. Cadastro de Usuário
**POST** `/register.php`

**Parâmetros:**
- `email` (string, obrigatório)
- `password` (string, obrigatório, mínimo 6 caracteres)

**Exemplo de uso:**
```bash
curl -X POST http://localhost/backend/register.php \
  -d "email=usuario@teste.com" \
  -d "password=123456"
```

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Usuário cadastrado com sucesso!",
  "data": {
    "id": 1,
    "email": "usuario@teste.com",
    "created_at": "2024-01-01 12:00:00"
  }
}
```

### 2. Login de Usuário
**POST** `/login.php`

**Parâmetros:**
- `email` (string, obrigatório)
- `password` (string, obrigatório)

**Exemplo de uso:**
```bash
curl -X POST http://localhost/backend/login.php \
  -d "email=usuario@teste.com" \
  -d "password=123456"
```

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso!",
  "data": {
    "id": 1,
    "email": "usuario@teste.com",
    "created_at": "2024-01-01 12:00:00"
  }
}
```

### 3. Listagem de Usuários
**GET** `/list_users.php`

**Exemplo de uso:**
```bash
curl http://localhost/backend/list_users.php
```

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Lista de usuários obtida com sucesso!",
  "data": {
    "total": 2,
    "users": [
      {
        "id": 2,
        "email": "admin@teste.com",
        "created_at": "2024-01-01 13:00:00"
      },
      {
        "id": 1,
        "email": "usuario@teste.com",
        "created_at": "2024-01-01 12:00:00"
      }
    ]
  }
}
```

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

