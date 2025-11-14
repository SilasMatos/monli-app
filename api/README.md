# Monli Finance API

API REST para gerenciamento de finanças pessoais com autenticação JWT, HTTP-only cookies, autenticação de 2 fatores (2FA) e login via Google OAuth.

## 🚀 Tecnologias

- **Node.js** com **TypeScript**
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM TypeScript-first para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação com tokens HTTP-only
- **bcryptjs** - Hash de senhas
- **Speakeasy + QRCode** - Autenticação de 2 fatores (2FA)
- **Google OAuth** - Login social com Google
- **UUID v7** - IDs únicos ordenados cronologicamente

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- pnpm (gerenciador de pacotes)

## 🔧 Instalação

1. Clone o repositório e navegue até a pasta da API:

```bash
cd api
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/monli_finance

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-min-32-chars-change-in-prod
JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth (opcional)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
# GOOGLE_CALLBACK_URL=http://localhost:3333/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

4. Execute as migrations do banco de dados:

```bash
pnpm db:generate
pnpm db:migrate
```

5. Inicie o servidor:

```bash
pnpm dev
```

O servidor estará rodando em `http://localhost:3333`

## 📚 Documentação da API

Acesse a documentação interativa em: `http://localhost:3333/docs`

## 🔐 Endpoints de Autenticação

### 1. Registro de Usuário

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "senha-forte-123",
  "name": "João Silva"
}
```

**Resposta:**

- Define cookies HTTP-only: `accessToken` e `refreshToken`
- Retorna dados do usuário criado

### 2. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "senha-forte-123",
  "twoFactorCode": "123456"  // Opcional, necessário se 2FA estiver ativo
}
```

**Resposta:**

- Se 2FA estiver habilitado: `{ "requiresTwoFactor": true }`
- Caso contrário: Define cookies e retorna dados do usuário

### 3. Logout

```http
POST /api/auth/logout
```

Remove os cookies de autenticação.

### 4. Refresh Token

```http
POST /api/auth/refresh
```

Gera um novo `accessToken` usando o `refreshToken` do cookie.

### 5. Obter Usuário Atual (Protegido)

```http
GET /api/auth/me
```

Retorna informações do usuário autenticado.

## 🔒 Autenticação de 2 Fatores (2FA)

### 1. Setup 2FA (Protegido)

```http
POST /api/auth/2fa/setup
```

**Resposta:**

```json
{
  "success": true,
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "qrCode": "data:image/png;base64,iVBORw0KG..."
  }
}
```

Use o QR Code em um aplicativo como Google Authenticator ou Authy.

### 2. Habilitar 2FA (Protegido)

```http
POST /api/auth/2fa/enable
Content-Type: application/json

{
  "code": "123456"
}
```

Valida o código do app de autenticação e ativa o 2FA.

### 3. Desabilitar 2FA (Protegido)

```http
POST /api/auth/2fa/disable
Content-Type: application/json

{
  "code": "123456"
}
```

## 🌐 Google OAuth

### 1. Obter URL de Autorização

```http
GET /api/auth/google
```

Retorna a URL para iniciar o fluxo OAuth com Google.

### 2. Callback (Automático)

```http
GET /api/auth/google/callback?code=...
```

Endpoint chamado automaticamente pelo Google após autorização.
Redireciona para o frontend com os cookies definidos.

## 🏗️ Estrutura do Projeto

```
api/
├── src/
│   ├── controllers/          # Controladores das rotas
│   │   └── auth.controller.ts
│   ├── db/                   # Banco de dados
│   │   ├── index.ts
│   │   ├── migrations/       # Migrations SQL
│   │   └── schema/           # Schemas Drizzle
│   │       ├── users.ts
│   │       └── index.ts
│   ├── middlewares/          # Middlewares
│   │   └── auth.middleware.ts
│   ├── routes/               # Definição de rotas
│   │   └── auth.routes.ts
│   ├── services/             # Lógica de negócio
│   │   ├── auth.service.ts
│   │   └── google-auth.service.ts
│   ├── types/                # Tipos TypeScript
│   │   └── fastify.d.ts
│   ├── env.ts                # Configuração de variáveis de ambiente
│   └── server.ts             # Configuração do servidor Fastify
├── .env                      # Variáveis de ambiente
├── drizzle.config.ts         # Configuração do Drizzle ORM
├── package.json
└── tsconfig.json
```

## 🔑 Segurança

- ✅ Senhas hasheadas com bcrypt (12 rounds)
- ✅ JWT em cookies HTTP-only (não acessíveis via JavaScript)
- ✅ Refresh tokens para renovação segura
- ✅ Autenticação de 2 fatores (TOTP)
- ✅ UUID v7 para IDs (ordenados cronologicamente)
- ✅ Validação de entrada com Zod
- ✅ CORS configurado
- ✅ Tokens com expiração

## 🛠️ Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor em modo desenvolvimento
pnpm start        # Inicia servidor em produção
pnpm db:generate  # Gera migrations do banco
pnpm db:migrate   # Executa migrations
pnpm db:studio    # Abre Drizzle Studio (interface visual do banco)
pnpm format       # Formata código com Biome
```

## 📊 Schema do Banco de Dados

### Tabela: `users`

```sql
id                      UUID PRIMARY KEY (v7)
email                   VARCHAR(255) UNIQUE NOT NULL
password                VARCHAR(255)           -- Nullable para usuários OAuth
name                    VARCHAR(255)
google_id               VARCHAR(255) UNIQUE
google_access_token     TEXT
google_refresh_token    TEXT
two_factor_enabled      BOOLEAN DEFAULT false
two_factor_secret       VARCHAR(255)
email_verified          BOOLEAN DEFAULT false
email_verification_token VARCHAR(255)
password_reset_token    VARCHAR(255)
password_reset_expires  TIMESTAMP
is_active               BOOLEAN DEFAULT true
created_at              TIMESTAMP DEFAULT NOW()
updated_at              TIMESTAMP DEFAULT NOW()
```

## 🌟 Melhores Práticas Implementadas

1. **Separação de Responsabilidades**: Controllers, Services, Middlewares
2. **Type Safety**: TypeScript em todo o projeto
3. **Validação**: Zod para validação de entrada
4. **Documentação**: OpenAPI/Swagger automático
5. **Segurança**: Autenticação robusta com múltiplos fatores
6. **Escalabilidade**: Estrutura modular e extensível
7. **Padrões**: UUID v7, HTTP-only cookies, JWT

## 📝 Próximos Passos

Para expandir o sistema de finanças pessoais, você pode adicionar:

- [ ] Tabelas de contas bancárias
- [ ] Tabelas de transações
- [ ] Tabelas de categorias
- [ ] Tabelas de orçamentos
- [ ] Relatórios e dashboards
- [ ] Upload de comprovantes
- [ ] Notificações por email
- [ ] Exportação de dados

## 📄 Licença

ISC
