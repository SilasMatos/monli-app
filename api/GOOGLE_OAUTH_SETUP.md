# Configuração do Google OAuth

Este guia explica como configurar o Google OAuth para a API Monli Finance.

## 📋 Pré-requisitos

- Conta Google (Gmail)
- Acesso ao [Google Cloud Console](https://console.cloud.google.com/)

## 🔧 Passo a Passo

### 1. Criar Projeto no Google Cloud

1. Acesse https://console.cloud.google.com/
2. Clique em **"Select a project"** no topo
3. Clique em **"NEW PROJECT"**
4. Nomeie o projeto como "Monli Finance" (ou nome de sua preferência)
5. Clique em **"CREATE"**

### 2. Habilitar Google+ API

1. No menu lateral, vá em **"APIs & Services"** > **"Library"**
2. Busque por **"Google+ API"** ou **"Google Identity"**
3. Clique na API e depois em **"ENABLE"**

### 3. Configurar OAuth Consent Screen

1. No menu lateral, vá em **"APIs & Services"** > **"OAuth consent screen"**
2. Selecione **"External"** (para testes) e clique em **"CREATE"**
3. Preencha as informações:
   - **App name:** Monli Finance
   - **User support email:** seu-email@gmail.com
   - **Developer contact information:** seu-email@gmail.com
4. Clique em **"SAVE AND CONTINUE"**
5. Em **Scopes**, clique em **"ADD OR REMOVE SCOPES"**
6. Selecione:
   - `userinfo.email`
   - `userinfo.profile`
7. Clique em **"UPDATE"** e depois **"SAVE AND CONTINUE"**
8. Em **Test users**, adicione seu email de teste
9. Clique em **"SAVE AND CONTINUE"**

### 4. Criar Credenciais OAuth 2.0

1. No menu lateral, vá em **"APIs & Services"** > **"Credentials"**
2. Clique em **"CREATE CREDENTIALS"** > **"OAuth client ID"**
3. Selecione **"Web application"**
4. Configure:
   - **Name:** Monli Finance Web Client
   - **Authorized JavaScript origins:**
     - `http://localhost:3333`
     - `http://localhost:5173` (frontend)
   - **Authorized redirect URIs:**
     - `http://localhost:3333/api/auth/google/callback`
5. Clique em **"CREATE"**

### 5. Copiar Credenciais

Após criar, você verá uma janela com:

- **Client ID:** algo como `123456789-abc123.apps.googleusercontent.com`
- **Client Secret:** algo como `GOCSPX-abc123def456`

**Copie esses valores!**

### 6. Configurar Variáveis de Ambiente

No arquivo `.env` da API, descomente e preencha:

```env
# Google OAuth
GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456
GOOGLE_CALLBACK_URL=http://localhost:3333/api/auth/google/callback
```

### 7. Reiniciar o Servidor

```bash
pnpm dev
```

## 🧪 Testando o OAuth

### Opção 1: Via Navegador

1. Acesse: `http://localhost:3333/api/auth/google`
2. Copie a URL retornada
3. Abra a URL no navegador
4. Autorize a aplicação
5. Você será redirecionado para o frontend com cookies definidos

### Opção 2: Via Postman/Insomnia

1. Faça uma requisição `GET` para `http://localhost:3333/api/auth/google`
2. Copie a URL da resposta
3. Abra a URL em um navegador
4. Autorize a aplicação
5. Será redirecionado para o callback da API

## 🔒 Segurança em Produção

Quando for para produção:

1. **Altere o OAuth Consent Screen para "Internal"** (se for para organização)
2. **Ou publique o app** se for público
3. **Adicione domínios de produção**:
   - Authorized origins: `https://api.seudominio.com`
   - Redirect URIs: `https://api.seudominio.com/api/auth/google/callback`
4. **Atualize o .env de produção** com os domínios corretos
5. **Use HTTPS** sempre em produção

## ❓ Problemas Comuns

### "redirect_uri_mismatch"

**Erro:** A URL de redirecionamento não está autorizada.

**Solução:**

- Verifique se a URL em **Authorized redirect URIs** está **exatamente igual** à configurada no `.env`
- Não esqueça a porta (`:3333`)
- Não use barra no final: ❌ `http://localhost:3333/api/auth/google/callback/`

### "Access blocked: This app's request is invalid"

**Erro:** O app não está verificado ou há problemas na configuração.

**Solução:**

- Adicione seu email em **Test users** no OAuth Consent Screen
- Certifique-se de que as scopes estão corretas
- Verifique se a API está habilitada

### "invalid_client"

**Erro:** Client ID ou Secret incorretos.

**Solução:**

- Verifique se copiou corretamente o Client ID e Secret
- Verifique se não há espaços extras no `.env`
- Reinicie o servidor após alterar o `.env`

## 📚 Recursos

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

## 🎯 Resultado

Após a configuração, os usuários poderão:

- Fazer login com Google
- Criar conta automática no primeiro login
- Vincular conta existente se o email já estiver cadastrado
- Não precisar gerenciar senha (apenas para login via Google)
