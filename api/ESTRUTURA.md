# 📁 Estrutura do Projeto API - Monli Finance

## Visão Geral

API REST completa para gerenciamento de finanças pessoais com autenticação JWT, 2FA e Google OAuth.

## 🗂️ Estrutura de Diretórios

```
api/
│
├── 📄 .env                          # Variáveis de ambiente
├── 📄 .gitignore                    # Arquivos ignorados pelo git
├── 📄 biome.json                    # Configuração do Biome (linter)
├── 📄 docker-compose.yml            # Docker para PostgreSQL
├── 📄 drizzle.config.ts             # Configuração do Drizzle ORM
├── 📄 package.json                  # Dependências e scripts
├── 📄 tsconfig.json                 # Configuração TypeScript
│
├── 📄 README.md                     # Documentação principal
├── 📄 EXEMPLOS.md                   # Exemplos de uso da API
├── 📄 GOOGLE_OAUTH_SETUP.md         # Guia de configuração OAuth
│
└── 📁 src/
    │
    ├── 📄 env.ts                    # Validação de variáveis de ambiente (Zod)
    ├── 📄 server.ts                 # Configuração do servidor Fastify
    │
    ├── 📁 controllers/              # Controladores (handlers das rotas)
    │   └── 📄 auth.controller.ts    # Controller de autenticação
    │
    ├── 📁 db/                       # Banco de dados
    │   ├── 📄 index.ts              # Conexão com PostgreSQL via Drizzle
    │   ├── 📄 seed.ts               # Script de seed (dados iniciais)
    │   │
    │   ├── 📁 migrations/           # Migrações SQL geradas
    │   │   ├── 📄 0000_*.sql        # Migração inicial
    │   │   ├── 📄 0001_*.sql        # Migração de usuários
    │   │   └── 📁 meta/             # Metadados das migrações
    │   │
    │   └── 📁 schema/               # Schemas do banco (Drizzle)
    │       ├── 📄 index.ts          # Export de todos os schemas
    │       └── 📄 users.ts          # Schema da tabela users
    │
    ├── 📁 middlewares/              # Middlewares do Fastify
    │   └── 📄 auth.middleware.ts    # Middleware de autenticação JWT
    │
    ├── 📁 routes/                   # Definição de rotas
    │   └── 📄 auth.routes.ts        # Rotas de autenticação
    │
    ├── 📁 services/                 # Lógica de negócio
    │   ├── 📄 auth.service.ts       # Serviço de autenticação (JWT, 2FA)
    │   └── 📄 google-auth.service.ts # Serviço de Google OAuth
    │
    └── 📁 types/                    # Tipos TypeScript customizados
        └── 📄 fastify.d.ts          # Extensão de tipos do Fastify
```

## 📋 Descrição dos Arquivos

### Raiz

| Arquivo                 | Descrição                                              |
| ----------------------- | ------------------------------------------------------ |
| `.env`                  | Variáveis de ambiente (DATABASE_URL, JWT_SECRET, etc.) |
| `biome.json`            | Configuração do linter/formatter Biome                 |
| `docker-compose.yml`    | Configuração do PostgreSQL via Docker                  |
| `drizzle.config.ts`     | Configuração do Drizzle ORM (migrations, schema)       |
| `package.json`          | Dependências, scripts e configurações do projeto       |
| `tsconfig.json`         | Configuração do TypeScript                             |
| `README.md`             | Documentação completa da API                           |
| `EXEMPLOS.md`           | Exemplos práticos de requisições HTTP                  |
| `GOOGLE_OAUTH_SETUP.md` | Guia de configuração do Google OAuth                   |

### src/

| Arquivo     | Descrição                                               |
| ----------- | ------------------------------------------------------- |
| `env.ts`    | Validação de variáveis de ambiente com Zod              |
| `server.ts` | Configuração do Fastify (CORS, cookies, Swagger, rotas) |

### src/controllers/

| Arquivo              | Descrição                                              |
| -------------------- | ------------------------------------------------------ |
| `auth.controller.ts` | Handlers de registro, login, logout, 2FA, Google OAuth |

### src/db/

| Arquivo    | Descrição                                    |
| ---------- | -------------------------------------------- |
| `index.ts` | Conexão com PostgreSQL usando Drizzle ORM    |
| `seed.ts`  | Script para popular banco com dados de teste |

### src/db/schema/

| Arquivo    | Descrição                                                    |
| ---------- | ------------------------------------------------------------ |
| `index.ts` | Export de todos os schemas                                   |
| `users.ts` | Schema da tabela `users` com todos os campos de autenticação |

### src/middlewares/

| Arquivo              | Descrição                                                       |
| -------------------- | --------------------------------------------------------------- |
| `auth.middleware.ts` | Middleware para autenticar usuários via JWT (HTTP-only cookies) |

### src/routes/

| Arquivo          | Descrição                                                     |
| ---------------- | ------------------------------------------------------------- |
| `auth.routes.ts` | Definição de todas as rotas de autenticação com validação Zod |

### src/services/

| Arquivo                  | Descrição                                           |
| ------------------------ | --------------------------------------------------- |
| `auth.service.ts`        | Lógica de registro, login, JWT, hash de senhas, 2FA |
| `google-auth.service.ts` | Lógica de autenticação via Google OAuth 2.0         |

### src/types/

| Arquivo        | Descrição                                                 |
| -------------- | --------------------------------------------------------- |
| `fastify.d.ts` | Extensão de tipos do Fastify (cookies, userId, userEmail) |

## 🔑 Principais Funcionalidades

### ✅ Autenticação

- Registro de usuários
- Login com email/senha
- Logout
- Refresh token
- HTTP-only cookies
- JWT com expiração

### ✅ Segurança

- Hash de senhas (bcrypt)
- UUID v7 para IDs
- Validação de entrada (Zod)
- CORS configurado
- 2FA (TOTP)

### ✅ OAuth

- Login com Google
- Criação automática de conta
- Vinculação de contas existentes

### ✅ Banco de Dados

- PostgreSQL
- Drizzle ORM
- Migrações automáticas
- Type-safe queries

### ✅ Documentação

- Swagger/OpenAPI automático
- Scalar API Reference
- Exemplos de uso
- Guias de configuração

## 🚀 Scripts Disponíveis

```bash
pnpm dev          # Servidor em modo desenvolvimento
pnpm start        # Servidor em produção
pnpm db:generate  # Gerar migrations
pnpm db:migrate   # Executar migrations
pnpm db:studio    # Abrir Drizzle Studio
pnpm format       # Formatar código com Biome
```

## 🎯 Endpoints Principais

| Método | Endpoint                    | Descrição           | Auth |
| ------ | --------------------------- | ------------------- | ---- |
| POST   | `/api/auth/register`        | Registrar usuário   | ❌   |
| POST   | `/api/auth/login`           | Login               | ❌   |
| POST   | `/api/auth/logout`          | Logout              | ❌   |
| POST   | `/api/auth/refresh`         | Refresh token       | ❌   |
| GET    | `/api/auth/me`              | Obter usuário atual | ✅   |
| POST   | `/api/auth/2fa/setup`       | Configurar 2FA      | ✅   |
| POST   | `/api/auth/2fa/enable`      | Habilitar 2FA       | ✅   |
| POST   | `/api/auth/2fa/disable`     | Desabilitar 2FA     | ✅   |
| GET    | `/api/auth/google`          | URL do Google OAuth | ❌   |
| GET    | `/api/auth/google/callback` | Callback do Google  | ❌   |
| GET    | `/health`                   | Health check        | ❌   |
| GET    | `/docs`                     | Documentação        | ❌   |

## 📊 Schema do Banco

### Tabela: users

```
id                      UUID (v7)
email                   VARCHAR(255) UNIQUE
password                VARCHAR(255) (nullable)
name                    VARCHAR(255)
google_id               VARCHAR(255) UNIQUE
google_access_token     TEXT
google_refresh_token    TEXT
two_factor_enabled      BOOLEAN
two_factor_secret       VARCHAR(255)
email_verified          BOOLEAN
email_verification_token VARCHAR(255)
password_reset_token    VARCHAR(255)
password_reset_expires  TIMESTAMP
is_active               BOOLEAN
created_at              TIMESTAMP
updated_at              TIMESTAMP
```

## 🔧 Tecnologias

- **Runtime:** Node.js + TypeScript
- **Framework:** Fastify
- **ORM:** Drizzle
- **Database:** PostgreSQL
- **Validation:** Zod
- **Auth:** JWT (jsonwebtoken)
- **Password:** bcryptjs
- **2FA:** speakeasy + qrcode
- **OAuth:** google-auth-library
- **Cookies:** @fastify/cookie
- **Docs:** Swagger + Scalar

## 📝 Próximos Passos

Para transformar em um sistema completo de finanças:

1. Adicionar tabelas de transações
2. Adicionar tabelas de contas bancárias
3. Adicionar tabelas de categorias
4. Implementar relatórios
5. Adicionar dashboards
6. Implementar notificações
7. Adicionar suporte a anexos
