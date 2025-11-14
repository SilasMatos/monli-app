# Configuracao de Email - Monli Finance

Este guia explica como configurar o envio de emails no Monli Finance.

## Funcionalidades de Email

- Email de boas-vindas ao criar conta
- Email de redefinicao de senha
- Email de verificacao de conta

## Configuracao com Gmail

### Passo 1: Criar Senha de App no Google

1. Acesse sua conta Google
2. Va em "Gerenciar sua Conta do Google"
3. Selecione "Seguranca"
4. Em "Como fazer login no Google", ative "Verificacao em duas etapas"
5. Volte para "Seguranca" e procure por "Senhas de app"
6. Selecione o app "Email" e dispositivo "Outro"
7. Copie a senha gerada (16 caracteres)

### Passo 2: Configurar Variaveis de Ambiente

No arquivo `.env`, descomente e preencha:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app-16-caracteres
EMAIL_FROM=noreply@monli.com
```

### Passo 3: Reiniciar o Servidor

```bash
pnpm dev
```

## Configuracao com Outros Provedores

### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=seu-email@outlook.com
SMTP_PASS=sua-senha
EMAIL_FROM=seu-email@outlook.com
```

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=sua-api-key-do-sendgrid
EMAIL_FROM=seu-email-verificado@dominio.com
```

### Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=seu-usuario-mailgun
SMTP_PASS=sua-senha-mailgun
EMAIL_FROM=seu-email@dominio.com
```

### Amazon SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=suas-credenciais-smtp
SMTP_PASS=sua-senha-smtp
EMAIL_FROM=seu-email-verificado@dominio.com
```

## Modo de Desenvolvimento

Se as variaveis de email nao estiverem configuradas, o sistema:

- Continua funcionando normalmente
- Nao envia emails
- Registra no console que o email foi pulado

Isso permite desenvolvimento sem necessidade de configurar email.

## Testando o Envio de Emails

1. Configure as variaveis de ambiente
2. Reinicie o servidor
3. Registre um novo usuario
4. Verifique o email recebido

## Template de Email de Boas-Vindas

O email de boas-vindas inclui:

- Header com gradiente roxo
- Mensagem personalizada com nome do usuario
- Lista de funcionalidades do Monli
- Botao para acessar a conta
- Dica de seguranca sobre 2FA
- Footer com informacoes de contato

## Personalizacao

Para personalizar os templates de email, edite o arquivo:

```
src/services/email-service.ts
```

O metodo `getWelcomeEmailTemplate()` contem o HTML do email.

## Seguranca

- Nunca commite suas credenciais no git
- Use senhas de app ao inves de senha da conta
- Em producao, use servicos profissionais (SendGrid, Mailgun, etc.)
- Configure SPF, DKIM e DMARC no seu dominio

## Troubleshooting

### Erro: "Invalid login"

- Verifique se a senha de app esta correta
- Confirme que a verificacao em duas etapas esta ativa
- Tente gerar uma nova senha de app

### Erro: "Connection timeout"

- Verifique se a porta esta correta (587 ou 465)
- Confirme que seu firewall permite a conexao
- Teste com outro provedor SMTP

### Email nao chega

- Verifique a pasta de spam
- Confirme que o email remetente esta correto
- Verifique os logs do servidor para erros

### Gmail bloqueia o envio

- Use senha de app ao inves de senha normal
- Verifique "Apps menos seguros" nas configuracoes do Gmail
- Considere usar um servico SMTP dedicado em producao

## Monitoramento

O sistema registra no console:

- Quando um email e enviado com sucesso
- Quando ha erros no envio
- Quando o email esta desabilitado

## Producao

Para producao, recomendamos usar:

- SendGrid (10.000 emails/mes gratis)
- Mailgun (5.000 emails/mes gratis)
- Amazon SES (62.000 emails/mes gratis primeiro ano)
- Postmark (100 emails/mes gratis)

Esses servicos oferecem:

- Melhor entregabilidade
- Estatisticas de envio
- Gerenciamento de bounces
- Templates profissionais
- Suporte tecnico
