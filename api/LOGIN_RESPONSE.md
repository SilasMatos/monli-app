# Login Response Enhancement

## Nova Estrutura da Resposta do Login

A resposta do login agora inclui informações de preferências do usuário para melhorar a experiência.

### Resposta de Login Bem-Sucedido

**Endpoint:** `POST /auth/login`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "019a8881-8ae9-77b4-9534-2397aa669c47",
      "email": "usuario@exemplo.com",
      "name": "João Silva",
      "emailVerified": true,
      "twoFactorEnabled": false,
      "theme": "dark",
      "language": "pt-BR",
      "avatar": "https://exemplo.com/avatar.jpg"
    },
    "isFirstTime": false,
    "isFirstLoginEver": false,
    "isFirstLoginToday": true
  }
}
```

### Resposta de Registro Bem-Sucedido

**Endpoint:** `POST /auth/register`

````json
{
  "success": true,
  "data": {
    "user": {
      "id": "019a8881-8ae9-77b4-9534-2397aa669c47",
      "email": "novoUsuario@exemplo.com",
      "name": "João Silva",
      "emailVerified": false,
      "twoFactorEnabled": false,
      "theme": "light",
      "language": "pt-BR",
      "avatar": null
    },
    "isFirstTime": true
  }
}
```### Campos Adicionados ao Objeto User

| Campo      | Tipo             | Descrição                                           | Valor Padrão |
| ---------- | ---------------- | --------------------------------------------------- | ------------ |
| `theme`    | `string`         | Tema preferido do usuário ('light', 'dark', 'auto') | `'light'`    |
| `language` | `string`         | Idioma preferido do usuário                         | `'pt-BR'`    |
| `avatar`   | `string \| null` | URL do avatar do usuário                            | `null`       |

### Campos Adicionados à Resposta

| Campo               | Tipo      | Descrição                                                               |
| ------------------- | --------- | ----------------------------------------------------------------------- |
| `isFirstTime`       | `boolean` | Indica se é o primeiro acesso do usuário (mesmo que `isFirstLoginEver`) |
| `isFirstLoginEver`  | `boolean` | Indica se é o primeiro login da vida do usuário                         |
| `isFirstLoginToday` | `boolean` | Indica se é o primeiro login do dia                                     |

### Resposta com 2FA Requerido

**Quando o usuário tem 2FA ativado:**

```json
{
  "success": true,
  "requiresTwoFactor": true,
  "message": "Please provide 2FA code"
}
````

### Resposta de Erro - Login

```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### Resposta de Erro - Registro

```json
{
  "success": false,
  "error": "User already exists with this email"
}
```

## Testando os Endpoints

### Login de Usuário Existente

```bash
curl -X POST http://localhost:3333/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

### Registro de Novo Usuário

```bash
curl -X POST http://localhost:3333/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "novo@exemplo.com",
    "password": "senha123",
    "name": "João Silva"
  }'
```

## Cookies HTTP-Only

Os tokens de autenticação continuam sendo definidos como cookies HTTP-only:

- `accessToken`: Válido por 7 dias
- `refreshToken`: Válido por 30 dias

## Alterações Técnicas Realizadas

1. **auth-service.ts**:

   - Adicionada busca do perfil do usuário na função `login()` com join na tabela `user_profiles`
   - Incluídas preferências (`theme`, `language`, `avatar`) na resposta do `register()`
   - Criação automática do perfil com valores padrão durante o registro

2. **auth-controller.ts**:

   - Adicionado campo `isFirstTime` nas respostas de login e register
   - Mantida compatibilidade com campos existentes (`isFirstLoginEver`, `isFirstLoginToday`)
   - Adicionado console.log para debug das respostas

3. **Dependências**:
   - Utilização da tabela `user_profiles` existente (schema já criado)
   - Nenhuma migração de banco necessária - estrutura já estava pronta
   - Importação adicional da tabela `userProfiles` no auth-service

## Uso no Frontend

O frontend pode agora utilizar essas informações para:

- Configurar automaticamente o tema da aplicação
- Exibir a interface no idioma correto
- Mostrar o avatar do usuário
- Implementar fluxos de onboarding para novos usuários
- Personalizar a experiência com base no histórico de login
