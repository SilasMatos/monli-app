# Exemplos de Uso da API - Monli Finance

Este arquivo contém exemplos de requisições HTTP para testar a API.
Use ferramentas como **Insomnia**, **Postman**, **Thunder Client** ou **curl**.

## 📝 Configuração Inicial

Base URL: `http://localhost:3333`

**Importante:** A API usa cookies HTTP-only. Certifique-se de que seu cliente HTTP está configurado para:

- Aceitar cookies
- Enviar cookies automaticamente nas próximas requisições

---

## 1️⃣ Registro de Usuário

```http
POST http://localhost:3333/api/auth/register
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "SenhaForte123!",
  "name": "João Silva"
}
```

**Resposta esperada (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "01933c7a-0b1c-7000-8000-000000000001",
      "email": "joao@example.com",
      "name": "João Silva",
      "emailVerified": false,
      "twoFactorEnabled": false
    }
  }
}
```

Os cookies `accessToken` e `refreshToken` são automaticamente definidos.

---

## 2️⃣ Login

```http
POST http://localhost:3333/api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "SenhaForte123!"
}
```

**Resposta esperada (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "01933c7a-0b1c-7000-8000-000000000001",
      "email": "joao@example.com",
      "name": "João Silva",
      "emailVerified": false,
      "twoFactorEnabled": false
    }
  }
}
```

**Se 2FA estiver ativo:**

```json
{
  "success": true,
  "requiresTwoFactor": true,
  "message": "Please provide 2FA code"
}
```

Nesse caso, faça login novamente incluindo o código:

```json
{
  "email": "joao@example.com",
  "password": "SenhaForte123!",
  "twoFactorCode": "123456"
}
```

---

## 3️⃣ Obter Usuário Atual (Protegido)

```http
GET http://localhost:3333/api/auth/me
```

**Resposta esperada (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "01933c7a-0b1c-7000-8000-000000000001",
      "email": "joao@example.com",
      "name": "João Silva",
      "emailVerified": false,
      "twoFactorEnabled": false,
      "isActive": true,
      "createdAt": "2025-01-13T10:30:00.000Z"
    }
  }
}
```

---

## 4️⃣ Setup 2FA (Protegido)

```http
POST http://localhost:3333/api/auth/2fa/setup
```

**Resposta esperada (200):**

```json
{
  "success": true,
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

1. Abra um app de autenticação (Google Authenticator, Authy, etc.)
2. Escaneie o QR code da resposta ou digite o `secret` manualmente
3. O app começará a gerar códigos de 6 dígitos

---

## 5️⃣ Habilitar 2FA (Protegido)

```http
POST http://localhost:3333/api/auth/2fa/enable
Content-Type: application/json

{
  "code": "123456"
}
```

Use o código gerado pelo seu app de autenticação.

**Resposta esperada (200):**

```json
{
  "success": true,
  "message": "2FA enabled successfully"
}
```

---

## 6️⃣ Desabilitar 2FA (Protegido)

```http
POST http://localhost:3333/api/auth/2fa/disable
Content-Type: application/json

{
  "code": "123456"
}
```

**Resposta esperada (200):**

```json
{
  "success": true,
  "message": "2FA disabled successfully"
}
```

---

## 7️⃣ Refresh Token

```http
POST http://localhost:3333/api/auth/refresh
```

Renova o `accessToken` usando o `refreshToken` do cookie.

**Resposta esperada (200):**

```json
{
  "success": true,
  "message": "Token refreshed successfully"
}
```

Novos cookies são definidos automaticamente.

---

## 8️⃣ Logout

```http
POST http://localhost:3333/api/auth/logout
```

**Resposta esperada (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

Os cookies são removidos.

---

## 9️⃣ Google OAuth

### Passo 1: Obter URL de Autorização

```http
GET http://localhost:3333/api/auth/google
```

**Resposta esperada (200):**

```json
{
  "success": true,
  "data": {
    "url": "https://accounts.google.com/o/oauth2/v2/auth?client_id=..."
  }
}
```

### Passo 2: Redirecionar usuário

Redirecione o usuário para a URL retornada. Após autorizar, o Google redireciona para:

```
http://localhost:3333/api/auth/google/callback?code=4/0AfJohXm...
```

A API processa automaticamente e redireciona para o frontend com cookies definidos.

---

## 🔒 Testando Segurança

### Tentar acessar rota protegida sem autenticação

```http
GET http://localhost:3333/api/auth/me
```

**Resposta esperada (401):**

```json
{
  "success": false,
  "error": "Authentication required"
}
```

### Tentar usar token expirado

Aguarde o token expirar (7 dias por padrão) e tente acessar uma rota protegida.

**Resposta esperada (401):**

```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

---

## 📊 Health Check

```http
GET http://localhost:3333/health
```

**Resposta esperada (200):**

```json
{
  "status": "ok",
  "timestamp": "2025-01-13T10:30:00.000Z"
}
```

---

## 🧪 Testando Fluxo Completo

### Cenário 1: Registro e Login Normal

1. Registrar usuário (`POST /api/auth/register`)
2. Logout (`POST /api/auth/logout`)
3. Login novamente (`POST /api/auth/login`)
4. Obter dados do usuário (`GET /api/auth/me`)

### Cenário 2: Ativar 2FA

1. Login (`POST /api/auth/login`)
2. Setup 2FA (`POST /api/auth/2fa/setup`)
3. Configurar app de autenticação
4. Habilitar 2FA (`POST /api/auth/2fa/enable`)
5. Logout (`POST /api/auth/logout`)
6. Login com 2FA (`POST /api/auth/login` com `twoFactorCode`)

### Cenário 3: Google OAuth

1. Obter URL Google (`GET /api/auth/google`)
2. Abrir URL no navegador
3. Autorizar aplicação
4. Ser redirecionado com cookies definidos
5. Acessar dados do usuário (`GET /api/auth/me`)

---

## 💡 Dicas

- Use o **Drizzle Studio** para visualizar o banco: `pnpm db:studio`
- Acesse a documentação interativa: `http://localhost:3333/docs`
- Os cookies são HTTP-only e não podem ser acessados via JavaScript
- Em produção, use HTTPS e altere `JWT_SECRET` para valores seguros
- Configure `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET` no `.env` para testar OAuth
