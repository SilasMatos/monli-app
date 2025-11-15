# 📖 Guia de Uso - Monli Finance API

Este guia descreve passo a passo como usar a API Monli Finance para gerenciar suas finanças pessoais.

## 🎯 Índice

- [Primeiros Passos](#primeiros-passos)
- [Autenticação](#autenticação)
- [Segurança com 2FA](#segurança-com-2fa)
- [Gerenciamento da Carteira](#gerenciamento-da-carteira)
- [Controle de Transações](#controle-de-transações)
- [Cartões de Crédito](#cartões-de-crédito)
- [Orçamentos (Budgets)](#orçamentos-budgets)
- [Perfil do Usuário](#perfil-do-usuário)
- [Exemplos Práticos](#exemplos-práticos)

---

## 🚀 Primeiros Passos

### 1. Criar uma Conta

Antes de usar a API, você precisa criar uma conta de usuário.

**Endpoint:** `POST /api/auth/register`

```json
{
  "email": "seu@email.com",
  "password": "SuaSenhaForte123!",
  "name": "Seu Nome"
}
```

**Requisitos da senha:**

- Mínimo de 8 caracteres
- Recomendado: letras maiúsculas, minúsculas, números e caracteres especiais

**O que acontece:**

- ✅ Sua conta é criada
- ✅ Um perfil inicial é gerado automaticamente
- ✅ Uma carteira é criada com saldo zero
- ✅ Cookies de autenticação são definidos automaticamente

---

### 2. Fazer Login

Depois de registrado, faça login para acessar sua conta.

**Endpoint:** `POST /api/auth/login`

```json
{
  "email": "seu@email.com",
  "password": "SuaSenhaForte123!"
}
```

**Resposta de sucesso:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-do-usuario",
      "email": "seu@email.com",
      "name": "Seu Nome",
      "emailVerified": false,
      "twoFactorEnabled": false
    }
  }
}
```

**O que acontece:**

- ✅ Tokens de acesso são gerados
- ✅ Cookies HTTP-only são definidos (accessToken e refreshToken)
- ✅ Você está autenticado para usar todos os endpoints protegidos

---

### 3. Verificar Sessão Atual

Você pode verificar se está autenticado e obter seus dados.

**Endpoint:** `GET /api/auth/me`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-do-usuario",
      "email": "seu@email.com",
      "name": "Seu Nome",
      "emailVerified": false,
      "twoFactorEnabled": false,
      "isActive": true,
      "createdAt": "2025-11-15T10:00:00Z"
    }
  }
}
```

---

## 🔐 Autenticação

### Renovar Token de Acesso

Os tokens expiram após um tempo. Use o refresh token para gerar novos.

**Endpoint:** `POST /api/auth/refresh`

**O que acontece:**

- ✅ Um novo accessToken é gerado
- ✅ O cookie é atualizado automaticamente
- ✅ Você continua autenticado sem precisar fazer login novamente

---

### Fazer Logout

Encerra sua sessão e remove os tokens.

**Endpoint:** `POST /api/auth/logout`

**O que acontece:**

- ✅ Cookies de autenticação são removidos
- ✅ Você precisa fazer login novamente para acessar recursos protegidos

---

## 🛡️ Segurança com 2FA

### Por que usar 2FA?

A autenticação de dois fatores (2FA) adiciona uma camada extra de segurança à sua conta, exigindo um código de 6 dígitos gerado por um aplicativo autenticador.

### Passo 1: Configurar 2FA

**Endpoint:** `POST /api/auth/2fa/setup`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "secret": "BASE32SECRETKEY",
    "qrCode": "data:image/png;base64,..."
  }
}
```

**O que fazer:**

1. Instale um aplicativo autenticador (Google Authenticator, Authy, Microsoft Authenticator)
2. Escaneie o QR code retornado com o aplicativo
3. O app começará a gerar códigos de 6 dígitos

---

### Passo 2: Habilitar 2FA

Após configurar o app, confirme com o código gerado.

**Endpoint:** `POST /api/auth/2fa/enable`

```json
{
  "code": "123456"
}
```

**O que acontece:**

- ✅ 2FA é ativado na sua conta
- ✅ Próximos logins exigirão o código do app

---

### Login com 2FA

Quando o 2FA está ativo, você precisa fornecer o código ao fazer login.

**Endpoint:** `POST /api/auth/login`

```json
{
  "email": "seu@email.com",
  "password": "SuaSenhaForte123!",
  "twoFactorCode": "123456"
}
```

**Fluxo:**

1. Primeiro login sem código retorna `requiresTwoFactor: true`
2. Abra seu app autenticador
3. Use o código de 6 dígitos no segundo request de login

---

### Desabilitar 2FA

Se precisar desativar o 2FA, confirme com um código.

**Endpoint:** `POST /api/auth/2fa/disable`

```json
{
  "code": "123456"
}
```

---

## 🔑 Login com Google OAuth

### Como funciona?

Você pode fazer login usando sua conta Google, sem precisar criar senha.

### Passo 1: Obter URL de Autorização

**Endpoint:** `GET /api/auth/google`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
  }
}
```

### Passo 2: Redirecionar Usuário

1. Redirecione o usuário para a URL retornada
2. O usuário autoriza o acesso no Google
3. Google redireciona para: `/api/auth/google/callback?code=...`
4. A API processa automaticamente e autentica o usuário

**O que acontece:**

- ✅ Se o email já existe, faz login automaticamente
- ✅ Se é novo, cria a conta e faz login
- ✅ Cookies de autenticação são definidos

---

## 💰 Gerenciamento da Carteira

### Ver Carteira

Visualize informações da sua carteira.

**Endpoint:** `GET /wallet`

**Resposta:**

```json
{
  "id": "uuid-da-carteira",
  "userId": "uuid-do-usuario",
  "balance": 5000.0,
  "saved": 2000.0,
  "currency": "BRL",
  "createdAt": "2025-11-15T10:00:00Z",
  "updatedAt": "2025-11-15T15:30:00Z"
}
```

**Entenda os campos:**

- `balance`: Saldo disponível para uso
- `saved`: Saldo guardado (economia)
- `currency`: Moeda (BRL, USD, EUR, etc.)

---

### Atualizar Carteira

Atualize informações da carteira, como moeda ou nome.

**Endpoint:** `PUT /wallet`

```json
{
  "currency": "USD",
  "name": "Minha Carteira Principal"
}
```

---

### Ver Saldo

Obtenha apenas os valores de saldo.

**Endpoint:** `GET /wallet/balance`

**Resposta:**

```json
{
  "balance": 5000.0,
  "saved": 2000.0,
  "total": 7000.0,
  "currency": "BRL"
}
```

---

### Transferir para Economia

Mova dinheiro do saldo disponível para o saldo guardado.

**Endpoint:** `POST /wallet/transfer-to-saved`

```json
{
  "amount": 500.0
}
```

**O que acontece:**

- ✅ `balance` diminui em R$ 500,00
- ✅ `saved` aumenta em R$ 500,00
- ✅ Histórico da operação é registrado

---

### Resgatar da Economia

Mova dinheiro do saldo guardado para o disponível.

**Endpoint:** `POST /wallet/transfer-from-saved`

```json
{
  "amount": 300.0
}
```

**O que acontece:**

- ✅ `saved` diminui em R$ 300,00
- ✅ `balance` aumenta em R$ 300,00
- ✅ Histórico da operação é registrado

---

## 💸 Controle de Transações

### Cadastrar Receita (Entrada de Dinheiro)

Registre salários, vendas, investimentos e outras receitas.

**Endpoint:** `POST /transactions`

```json
{
  "type": "income",
  "category": "Salário",
  "amount": 5000.0,
  "description": "Salário mensal de novembro",
  "date": "2025-11-15T10:00:00Z",
  "tags": ["recorrente", "trabalho"]
}
```

**Categorias sugeridas para receitas:**

- Salário
- Freelance
- Vendas
- Investimentos
- Presente
- Outros

**O que acontece:**

- ✅ Transação é registrada
- ✅ Saldo (`balance`) aumenta automaticamente
- ✅ Histórico fica disponível para consulta

---

### Cadastrar Despesa (Saída de Dinheiro)

Registre gastos com alimentação, transporte, contas, etc.

**Endpoint:** `POST /transactions`

```json
{
  "type": "expense",
  "category": "Alimentação",
  "amount": 150.0,
  "description": "Compras no supermercado",
  "date": "2025-11-15T15:30:00Z",
  "tags": ["supermercado", "necessário"]
}
```

**Categorias sugeridas para despesas:**

- Alimentação
- Transporte
- Moradia (aluguel, condomínio)
- Saúde
- Educação
- Lazer
- Vestuário
- Contas (água, luz, internet)
- Outros

**O que acontece:**

- ✅ Transação é registrada
- ✅ Saldo (`balance`) diminui automaticamente
- ✅ Histórico fica disponível para consulta

---

### Ver Todas as Transações

Liste seu histórico financeiro completo.

**Endpoint:** `GET /transactions?limit=100`

**Parâmetros opcionais:**

- `limit`: Número máximo de transações (padrão: 100)

**Resposta:**

```json
{
  "transactions": [
    {
      "id": "uuid-da-transacao",
      "walletId": "uuid-da-carteira",
      "type": "income",
      "category": "Salário",
      "amount": 5000.0,
      "description": "Salário mensal",
      "date": "2025-11-15T10:00:00Z",
      "tags": ["recorrente", "trabalho"],
      "createdAt": "2025-11-15T10:00:00Z"
    },
    {
      "id": "uuid-da-transacao-2",
      "walletId": "uuid-da-carteira",
      "type": "expense",
      "category": "Alimentação",
      "amount": 150.0,
      "description": "Supermercado",
      "date": "2025-11-15T15:30:00Z",
      "tags": ["supermercado"],
      "createdAt": "2025-11-15T15:30:00Z"
    }
  ],
  "total": 2
}
```

---

## 💳 Cartões de Crédito

### Cadastrar Cartão de Crédito

Registre seus cartões de crédito para controlar gastos e limites.

**Endpoint:** `POST /credit-cards`

```json
{
  "name": "Nubank",
  "lastFourDigits": "1234",
  "brand": "Mastercard",
  "creditLimit": "5000.00",
  "closingDay": 10,
  "dueDay": 17,
  "color": "#8A05BE",
  "icon": "credit_card"
}
```

**Campos obrigatórios:**

- `name`: Nome do cartão (ex: "Nubank", "Inter Gold")
- `lastFourDigits`: Últimos 4 dígitos do cartão
- `brand`: Bandeira (Visa, Mastercard, Amex, Elo, etc.)
- `creditLimit`: Limite de crédito
- `closingDay`: Dia do fechamento da fatura (1-31)
- `dueDay`: Dia do vencimento (1-31)

**Campos opcionais:**

- `color`: Cor para identificação visual (hex)
- `icon`: Ícone personalizado

**O que acontece:**

- ✅ Cartão é registrado
- ✅ Saldo atual começa em R$ 0,00
- ✅ Crédito disponível = limite total
- ✅ **Status HTTP: 201 CREATED**

---

### Listar Cartões

Visualize todos os seus cartões cadastrados.

**Endpoint:** `GET /credit-cards`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "uuid-do-cartao",
        "name": "Nubank",
        "lastFourDigits": "1234",
        "brand": "Mastercard",
        "creditLimit": "5000.00",
        "currentBalance": "1500.00",
        "closingDay": 10,
        "dueDay": 17,
        "color": "#8A05BE",
        "isActive": true
      }
    ]
  }
}
```

**Status HTTP: 200 OK**

---

### Ver Crédito Disponível

Consulte o crédito disponível e a utilização do cartão.

**Endpoint:** `GET /credit-cards/:id/available-credit`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "creditLimit": "5000.00",
    "currentBalance": "1500.00",
    "availableCredit": "3500.00",
    "utilizationPercentage": "30.00"
  }
}
```

**Entenda os campos:**

- `creditLimit`: Limite total do cartão
- `currentBalance`: Valor já gasto (fatura atual)
- `availableCredit`: Crédito ainda disponível
- `utilizationPercentage`: % do limite que está sendo usado

**Status HTTP: 200 OK ou 404 NOT FOUND**

---

### Adicionar Despesa ao Cartão

Registre uma compra feita no cartão de crédito.

**Endpoint:** `POST /credit-cards/:id/expense`

```json
{
  "amount": "150.00"
}
```

**O que acontece:**

- ✅ Valor é adicionado ao saldo atual
- ✅ Crédito disponível é reduzido
- ✅ Sistema valida se há limite disponível
- ❌ Retorna erro se exceder o limite

**Status HTTP:**

- **200 OK** - Despesa adicionada com sucesso
- **400 BAD REQUEST** - Limite de crédito excedido
- **404 NOT FOUND** - Cartão não encontrado

---

### Atualizar Cartão

Modifique informações do cartão.

**Endpoint:** `PUT /credit-cards/:id`

```json
{
  "name": "Nubank Platinum",
  "creditLimit": "10000.00",
  "closingDay": 15,
  "color": "#8A05BE"
}
```

**Campos atualizáveis:**

- Nome, limite, dias de fechamento/vencimento, cor, ícone

**Status HTTP: 200 OK ou 404 NOT FOUND**

---

### Desativar Cartão

Desative um cartão que não usa mais.

**Endpoint:** `DELETE /credit-cards/:id`

**O que acontece:**

- ✅ Cartão é desativado (soft delete)
- ✅ Não aparece mais nas listagens
- ✅ Dados são preservados

**Status HTTP: 204 NO CONTENT ou 404 NOT FOUND**

---

## 📊 Orçamentos (Budgets)

### Como Funcionam os Orçamentos

Os orçamentos permitem que você defina metas de gastos para períodos específicos e acompanhe automaticamente quanto já gastou. Você pode filtrar gastos por:

- **Tags**: Qualquer transação com as tags especificadas será contabilizada
- **Categoria**: Apenas transações de uma categoria específica

**Exemplo prático:**

- Crio um orçamento de R$ 1.000 para "Alimentação" em novembro
- Defino as tags: `["alimentação", "restaurante", "supermercado"]`
- Todas as despesas com essas tags são automaticamente contabilizadas
- O sistema calcula quanto gastei, quanto sobra e a porcentagem utilizada

---

### Criar Orçamento por Tags

**Endpoint:** `POST /budgets`

```json
{
  "name": "Alimentação Novembro",
  "description": "Orçamento para gastos com comida",
  "amount": "1000.00",
  "tags": ["alimentação", "restaurante", "supermercado"],
  "startDate": "2025-11-01T00:00:00Z",
  "endDate": "2025-11-30T23:59:59Z",
  "alertPercentage": "80.00",
  "alertEnabled": true
}
```

**Campos obrigatórios:**

- `name`: Nome do orçamento
- `amount`: Valor total do orçamento
- `startDate`: Data de início
- `endDate`: Data de término

**Campos opcionais:**

- `description`: Descrição detalhada
- `tags`: Array de tags para filtrar (ex: ["alimentação", "restaurante"])
- `category`: Categoria específica (alternativa às tags)
- `alertPercentage`: % para disparar alerta (padrão: 80%)
- `alertEnabled`: Ativar alertas (padrão: true)

**O que acontece:**

- ✅ Orçamento é criado
- ✅ Sistema começa a rastrear gastos automaticamente
- ✅ Qualquer transação com as tags é contabilizada
- ✅ Alerta dispara ao atingir a porcentagem definida

**Status HTTP: 201 CREATED ou 400 BAD REQUEST**

---

### Criar Orçamento por Categoria

**Endpoint:** `POST /budgets`

```json
{
  "name": "Transporte Dezembro",
  "amount": "500.00",
  "category": "Transporte",
  "startDate": "2025-12-01T00:00:00Z",
  "endDate": "2025-12-31T23:59:59Z"
}
```

**Diferença entre tags e categoria:**

- **Tags**: Mais flexível, pode incluir múltiplas tags
- **Categoria**: Mais específico, apenas uma categoria exata

**Status HTTP: 201 CREATED**

---

### Ver Orçamentos Ativos

Consulte orçamentos que estão no período atual.

**Endpoint:** `GET /budgets/active`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "budgets": [
      {
        "id": "uuid-do-budget",
        "name": "Alimentação Novembro",
        "amount": "1000.00",
        "spent": "650.00",
        "remaining": "350.00",
        "percentage": "65.00",
        "tags": ["alimentação", "restaurante"],
        "startDate": "2025-11-01T00:00:00Z",
        "endDate": "2025-11-30T23:59:59Z",
        "isOverBudget": false,
        "shouldAlert": false
      }
    ]
  }
}
```

**Campos calculados automaticamente:**

- `spent`: Quanto já foi gasto
- `remaining`: Quanto ainda resta
- `percentage`: % do orçamento utilizado
- `isOverBudget`: Se ultrapassou o orçamento
- `shouldAlert`: Se atingiu a % de alerta

**Status HTTP: 200 OK**

---

### Resumo de Orçamentos

Obtenha uma visão geral de todos os orçamentos ativos.

**Endpoint:** `GET /budgets/summary`

**Resposta:**

```json
{
  "success": true,
  "data": {
    "totalBudgets": 3,
    "totalBudgeted": "2500.00",
    "totalSpent": "1800.00",
    "totalRemaining": "700.00",
    "overBudgetCount": 1,
    "alertsCount": 2,
    "budgets": [...]
  }
}
```

**Informações agregadas:**

- Total de orçamentos ativos
- Soma de todos os valores orçados
- Soma de todos os gastos
- Quantos orçamentos foram estourados
- Quantos orçamentos estão em alerta

**Status HTTP: 200 OK**

---

### Listar Todos os Orçamentos

**Endpoint:** `GET /budgets?includeInactive=false`

Lista todos os orçamentos com gastos calculados.

**Parâmetros:**

- `includeInactive`: Incluir orçamentos desativados (padrão: false)

**Status HTTP: 200 OK**

---

### Atualizar Orçamento

**Endpoint:** `PUT /budgets/:id`

```json
{
  "amount": "1200.00",
  "tags": ["alimentação", "restaurante", "delivery"],
  "alertPercentage": "85.00"
}
```

**Casos de uso:**

- Aumentar/diminuir valor do orçamento
- Adicionar/remover tags de rastreamento
- Ajustar porcentagem de alerta
- Modificar período

**Status HTTP: 200 OK ou 404 NOT FOUND**

---

### Excluir Orçamento

**Endpoint:** `DELETE /budgets/:id`

**O que acontece:**

- ✅ Orçamento é desativado (soft delete)
- ✅ Histórico é preservado
- ✅ Não aparece mais em listagens ativas

**Status HTTP: 204 NO CONTENT ou 404 NOT FOUND**

---

## 👤 Perfil do Usuário

### Ver Perfil Completo

Acesse todas as informações do seu perfil.

**Endpoint:** `GET /profile`

**Resposta:**

```json
{
  "id": "uuid-do-perfil",
  "userId": "uuid-do-usuario",
  "phone": "+55 11 99999-9999",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "Desenvolvedor apaixonado por tecnologia",
  "address": "Rua Exemplo, 123",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brazil",
  "zipCode": "01234-567",
  "language": "pt-BR",
  "theme": "dark",
  "currency": "BRL",
  "timezone": "America/Sao_Paulo",
  "planType": "free",
  "subscriptionEndDate": null,
  "notificationsEnabled": true,
  "emailNotifications": true,
  "pushNotifications": false
}
```

---

### Atualizar Perfil

Personalize suas informações pessoais.

**Endpoint:** `PUT /profile`

```json
{
  "phone": "+55 11 98888-7777",
  "avatar": "https://example.com/meu-avatar.jpg",
  "bio": "Entusiasta de finanças pessoais",
  "address": "Av. Paulista, 1000",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "zipCode": "01310-100",
  "language": "pt-BR",
  "theme": "light",
  "currency": "BRL",
  "timezone": "America/Sao_Paulo"
}
```

**Todos os campos são opcionais** - envie apenas o que deseja atualizar.

---

### Gerenciar Assinatura

#### Atualizar Plano

**Endpoint:** `PUT /profile/subscription`

```json
{
  "planType": "premium",
  "subscriptionEndDate": "2026-11-15T00:00:00Z"
}
```

**Planos disponíveis:**

- `free`: Gratuito (padrão)
- `premium`: Recursos avançados
- `business`: Para empresas

---

#### Cancelar Assinatura

Voltar para o plano gratuito.

**Endpoint:** `POST /profile/subscription/cancel`

**O que acontece:**

- ✅ Plano volta para `free`
- ✅ Data de término é removida
- ✅ Recursos premium são desativados

---

### Configurar Notificações

Controle como deseja receber notificações.

**Endpoint:** `PUT /profile/notifications`

```json
{
  "notificationsEnabled": true,
  "emailNotifications": true,
  "pushNotifications": false
}
```

**Opções:**

- `notificationsEnabled`: Ativar/desativar todas as notificações
- `emailNotifications`: Receber notificações por email
- `pushNotifications`: Receber notificações push (app móvel)

---

### Desativar Conta

Se desejar desativar sua conta (soft delete).

**Endpoint:** `DELETE /profile`

**⚠️ Atenção:**

- Sua conta será desativada, não excluída permanentemente
- Seus dados permanecem no sistema
- Entre em contato com o suporte para reativação ou exclusão permanente

---

## 🎓 Exemplos Práticos

### Exemplo 1: Fluxo Completo - Novo Usuário

```bash
# 1. Criar conta
POST /api/auth/register
{
  "email": "joao@email.com",
  "password": "Senha123!",
  "name": "João Silva"
}

# 2. Login automático após registro
# Cookies já foram definidos

# 3. Cadastrar primeiro salário
POST /transactions
{
  "type": "income",
  "category": "Salário",
  "amount": 5000.00,
  "description": "Primeiro salário",
  "date": "2025-11-15T00:00:00Z"
}

# 4. Ver saldo atualizado
GET /wallet/balance
# Resposta: { "balance": 5000.00, "saved": 0.00, "total": 5000.00 }

# 5. Guardar parte do salário
POST /wallet/transfer-to-saved
{
  "amount": 1000.00
}

# 6. Registrar despesa
POST /transactions
{
  "type": "expense",
  "category": "Alimentação",
  "amount": 300.00,
  "description": "Compras do mês"
}

# 7. Ver saldo final
GET /wallet/balance
# Resposta: { "balance": 3700.00, "saved": 1000.00, "total": 4700.00 }
```

---

### Exemplo 2: Ativando Segurança com 2FA

```bash
# 1. Configurar 2FA
POST /api/auth/2fa/setup
# Resposta: retorna QR code

# 2. Escanear QR code no Google Authenticator

# 3. Ativar 2FA com código do app
POST /api/auth/2fa/enable
{
  "code": "123456"
}

# 4. Fazer logout
POST /api/auth/logout

# 5. Próximo login requer código 2FA
POST /api/auth/login
{
  "email": "joao@email.com",
  "password": "Senha123!",
  "twoFactorCode": "654321"
}
```

---

### Exemplo 3: Controle Mensal de Gastos

```bash
# 1. Registrar salário do mês
POST /transactions
{
  "type": "income",
  "category": "Salário",
  "amount": 5000.00,
  "description": "Salário de Novembro/2025",
  "date": "2025-11-05T00:00:00Z",
  "tags": ["recorrente", "mensal"]
}

# 2. Registrar todas as despesas do mês
POST /transactions
{
  "type": "expense",
  "category": "Moradia",
  "amount": 1500.00,
  "description": "Aluguel",
  "date": "2025-11-10T00:00:00Z",
  "tags": ["recorrente", "fixo"]
}

POST /transactions
{
  "type": "expense",
  "category": "Transporte",
  "amount": 350.00,
  "description": "Combustível + Uber",
  "date": "2025-11-12T00:00:00Z",
  "tags": ["variável"]
}

POST /transactions
{
  "type": "expense",
  "category": "Alimentação",
  "amount": 800.00,
  "description": "Supermercado + Restaurantes",
  "date": "2025-11-15T00:00:00Z",
  "tags": ["variável"]
}

# 3. Ver histórico completo
GET /transactions?limit=50

# 4. Verificar quanto sobrou
GET /wallet/balance
# Resposta: { "balance": 2350.00, "saved": 0.00, "total": 2350.00 }

# 5. Guardar o que sobrou
POST /wallet/transfer-to-saved
{
  "amount": 2000.00
}
```

---

### Exemplo 4: Gerenciando Cartões de Crédito

```bash
# 1. Cadastrar cartão de crédito
POST /credit-cards
{
  "name": "Nubank",
  "lastFourDigits": "1234",
  "brand": "Mastercard",
  "creditLimit": "5000.00",
  "closingDay": 10,
  "dueDay": 17,
  "color": "#8A05BE"
}
# Status: 201 CREATED

# 2. Registrar compra no cartão
POST /credit-cards/{card-id}/expense
{
  "amount": "350.00"
}
# Status: 200 OK

# 3. Verificar crédito disponível
GET /credit-cards/{card-id}/available-credit
# Resposta: {
#   "creditLimit": "5000.00",
#   "currentBalance": "350.00",
#   "availableCredit": "4650.00",
#   "utilizationPercentage": "7.00"
# }

# 4. Adicionar mais despesas
POST /credit-cards/{card-id}/expense
{
  "amount": "1200.00"
}

# 5. Ver utilização atualizada
GET /credit-cards/{card-id}/available-credit
# Resposta: {
#   "currentBalance": "1550.00",
#   "availableCredit": "3450.00",
#   "utilizationPercentage": "31.00"
# }

# 6. Listar todos os cartões
GET /credit-cards
# Status: 200 OK
```

---

### Exemplo 5: Criando e Monitorando Orçamentos

```bash
# 1. Criar orçamento mensal para alimentação
POST /budgets
{
  "name": "Alimentação Novembro 2025",
  "description": "Controle de gastos com comida",
  "amount": "1000.00",
  "tags": ["alimentação", "restaurante", "supermercado", "delivery"],
  "startDate": "2025-11-01T00:00:00Z",
  "endDate": "2025-11-30T23:59:59Z",
  "alertPercentage": "80.00",
  "alertEnabled": true
}
# Status: 201 CREATED

# 2. Criar orçamento para transporte
POST /budgets
{
  "name": "Transporte Novembro",
  "amount": "500.00",
  "category": "Transporte",
  "startDate": "2025-11-01T00:00:00Z",
  "endDate": "2025-11-30T23:59:59Z"
}
# Status: 201 CREATED

# 3. Registrar despesas que serão rastreadas
POST /transactions
{
  "type": "expense",
  "category": "Alimentação",
  "amount": "85.00",
  "description": "Almoço no restaurante",
  "tags": ["alimentação", "restaurante"]
}

POST /transactions
{
  "type": "expense",
  "category": "Alimentação",
  "amount": "320.00",
  "description": "Compras no supermercado",
  "tags": ["alimentação", "supermercado"]
}

POST /transactions
{
  "type": "expense",
  "category": "Transporte",
  "amount": "150.00",
  "description": "Uber e Combustível"
}

# 4. Ver orçamentos ativos
GET /budgets/active
# Resposta: {
#   "budgets": [
#     {
#       "name": "Alimentação Novembro 2025",
#       "amount": "1000.00",
#       "spent": "405.00",
#       "remaining": "595.00",
#       "percentage": "40.50",
#       "isOverBudget": false,
#       "shouldAlert": false
#     },
#     {
#       "name": "Transporte Novembro",
#       "amount": "500.00",
#       "spent": "150.00",
#       "remaining": "350.00",
#       "percentage": "30.00"
#     }
#   ]
# }

# 5. Ver resumo geral
GET /budgets/summary
# Resposta: {
#   "totalBudgets": 2,
#   "totalBudgeted": "1500.00",
#   "totalSpent": "555.00",
#   "totalRemaining": "945.00",
#   "overBudgetCount": 0,
#   "alertsCount": 0
# }

# 6. Adicionar mais gastos até disparar alerta
POST /transactions
{
  "type": "expense",
  "category": "Alimentação",
  "amount": "450.00",
  "description": "Compras e restaurantes",
  "tags": ["alimentação", "delivery"]
}

# 7. Verificar orçamento agora (ultrapassou 80%)
GET /budgets/{budget-id}
# Resposta: {
#   "spent": "855.00",
#   "remaining": "145.00",
#   "percentage": "85.50",
#   "shouldAlert": true  ⚠️ Alerta ativado!
# }
```

---

### Exemplo 6: Fluxo Completo de Controle Financeiro

```bash
# INÍCIO DO MÊS

# 1. Receber salário
POST /transactions
{
  "type": "income",
  "category": "Salário",
  "amount": "5000.00",
  "description": "Salário mensal",
  "tags": ["recorrente", "trabalho"]
}

# 2. Guardar 20% para economia
POST /wallet/transfer-to-saved
{
  "amount": "1000.00"
}

# 3. Definir orçamentos do mês
POST /budgets
{
  "name": "Alimentação",
  "amount": "1200.00",
  "tags": ["alimentação", "restaurante", "supermercado"],
  "startDate": "2025-11-01T00:00:00Z",
  "endDate": "2025-11-30T23:59:59Z"
}

POST /budgets
{
  "name": "Transporte",
  "amount": "400.00",
  "category": "Transporte",
  "startDate": "2025-11-01T00:00:00Z",
  "endDate": "2025-11-30T23:59:59Z"
}

POST /budgets
{
  "name": "Lazer",
  "amount": "600.00",
  "tags": ["lazer", "entretenimento"],
  "startDate": "2025-11-01T00:00:00Z",
  "endDate": "2025-11-30T23:59:59Z"
}

# 4. Cadastrar cartões de crédito
POST /credit-cards
{
  "name": "Nubank",
  "lastFourDigits": "1234",
  "brand": "Mastercard",
  "creditLimit": "5000.00",
  "closingDay": 10,
  "dueDay": 17
}

# DURANTE O MÊS

# 5. Registrar gastos diários
POST /transactions
{
  "type": "expense",
  "category": "Alimentação",
  "amount": "45.00",
  "description": "Almoço",
  "tags": ["alimentação", "restaurante"]
}

POST /credit-cards/{card-id}/expense
{
  "amount": "280.00"
}

# 6. Monitorar orçamentos periodicamente
GET /budgets/summary

# FIM DO MÊS

# 7. Verificar status final
GET /budgets/summary
# Ver quais orçamentos foram estourados

GET /wallet/balance
# Ver saldo disponível e guardado

GET /credit-cards
# Ver fatura dos cartões

# 8. Análise e ajustes para próximo mês
# Com base nos dados, ajustar orçamentos para o próximo mês
```

---

## 📋 Status HTTP da API

A API utiliza os status HTTP apropriados para cada operação:

### Sucesso

- **200 OK**: Operação bem-sucedida com retorno de dados (GET, PUT)
- **201 CREATED**: Recurso criado com sucesso (POST de criação)
- **204 NO CONTENT**: Operação bem-sucedida sem conteúdo de retorno (DELETE)

### Erro do Cliente

- **400 BAD REQUEST**: Dados inválidos ou faltando campos obrigatórios
- **401 UNAUTHORIZED**: Não autenticado ou token inválido
- **403 FORBIDDEN**: Sem permissão para acessar o recurso
- **404 NOT FOUND**: Recurso não encontrado

### Erro do Servidor

- **500 INTERNAL SERVER ERROR**: Erro interno do servidor

---

## 🔧 Configuração do Cliente

### URL Base

```
http://localhost:3333
```

### Autenticação

A API usa **cookies HTTP-only** para autenticação. Certifique-se de:

1. ✅ Enviar credenciais com requests: `credentials: 'include'` (fetch) ou `withCredentials: true` (axios)
2. ✅ Cookies são gerenciados automaticamente pelo navegador
3. ✅ Não é necessário enviar tokens manualmente no header

### Headers Necessários

```
Content-Type: application/json
```

### Exemplo com Fetch API

```javascript
// Login
const response = await fetch('http://localhost:3333/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include', // IMPORTANTE: envia cookies
  body: JSON.stringify({
    email: 'seu@email.com',
    password: 'SuaSenhaForte123!'
  })
})

const data = await response.json()
console.log(data)
```

### Exemplo com Axios

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true, // IMPORTANTE: envia cookies
  headers: {
    'Content-Type': 'application/json'
  }
})

// Login
const { data } = await api.post('/api/auth/login', {
  email: 'seu@email.com',
  password: 'SuaSenhaForte123!'
})

console.log(data)
```

---

## 📚 Recursos Adicionais

### Documentação Interativa

Acesse a documentação Swagger da API:

```
http://localhost:3333/docs
```

Lá você pode:

- ✅ Ver todos os endpoints
- ✅ Testar requisições diretamente no navegador
- ✅ Ver schemas de request/response
- ✅ Copiar exemplos de código

### Status da API

Verifique se a API está funcionando:

```
GET /health
```

**Resposta:**

```json
{
  "status": "ok",
  "timestamp": "2025-11-15T10:00:00Z"
}
```

---

## ⚠️ Boas Práticas

### Segurança

1. ✅ **Sempre use HTTPS em produção**
2. ✅ **Nunca compartilhe seu secret 2FA**
3. ✅ **Use senhas fortes** (mínimo 8 caracteres com variações)
4. ✅ **Ative 2FA** para proteção adicional
5. ✅ **Faça logout** em dispositivos públicos

### Gerenciamento de Transações

1. ✅ **Categorize corretamente** suas transações
2. ✅ **Use tags** para facilitar filtros futuros
3. ✅ **Registre descrições claras** para lembrar do que se trata
4. ✅ **Mantenha datas precisas** para relatórios corretos

### Uso da Carteira

1. ✅ **Separe economia** usando o recurso de "saved"
2. ✅ **Defina metas** de quanto guardar por mês
3. ✅ **Acompanhe seu saldo** regularmente
4. ✅ **Revise seu histórico** para identificar gastos desnecessários

---

## 🆘 Troubleshooting

### "Unauthorized" ou "401"

**Problema:** Você não está autenticado.

**Solução:**

1. Faça login novamente: `POST /api/auth/login`
2. Verifique se os cookies estão sendo enviados (`credentials: 'include'`)
3. Tente renovar o token: `POST /api/auth/refresh`

---

### "Invalid 2FA code"

**Problema:** O código 2FA está incorreto.

**Solução:**

1. Verifique se o horário do dispositivo está sincronizado
2. Use o código mais recente do app (eles expiram a cada 30 segundos)
3. Certifique-se de ter escaneado o QR code correto

---

### "Insufficient balance"

**Problema:** Saldo insuficiente para a operação.

**Solução:**

1. Verifique seu saldo: `GET /wallet/balance`
2. Se for transferência para saved, certifique-se de ter saldo em `balance`
3. Se for transação, cadastre uma receita antes

---

### Cookies não estão sendo salvos

**Problema:** Autenticação não persiste entre requests.

**Solução:**

1. Certifique-se de usar `credentials: 'include'` ou `withCredentials: true`
2. Verifique se o domínio do frontend está configurado no CORS
3. Em desenvolvimento, use `localhost` em vez de `127.0.0.1`

---

## 📞 Suporte

Para dúvidas, problemas ou sugestões:

- 📧 Email: suporte@monlifinance.com
- 📚 Documentação: http://localhost:3333/docs
- 🐛 Reportar bugs: [GitHub Issues]

---

**Versão da API:** 1.0.0  
**Última atualização:** 15 de Novembro de 2025
