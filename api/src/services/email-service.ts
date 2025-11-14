import nodemailer from 'nodemailer'
import { env } from '../env'

export class EmailService {
  private transporter: nodemailer.Transporter | null = null

  constructor() {
    if (env.SMTP_USER && env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      })
    }
  }

  isConfigured(): boolean {
    return this.transporter !== null
  }

  async sendWelcomeEmail(email: string, name?: string) {
    if (!this.transporter) {
      console.log('Email not configured, skipping welcome email')
      return
    }

    const userName = name || 'Usuario'
    const htmlContent = this.getWelcomeEmailTemplate(userName)

    try {
      await this.transporter.sendMail({
        from: `Monli Finance <${env.EMAIL_FROM}>`,
        to: email,
        subject: 'Bem-vindo ao Monli - Sua Jornada Financeira Começa Aqui!',
        html: htmlContent,
      })

      console.log(`Welcome email sent to ${email}`)
    } catch (error) {
      console.error('Error sending welcome email:', error)
    }
  }

  private getWelcomeEmailTemplate(name: string): string {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Monli</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; letter-spacing: 2px;">
                                MONLI
                            </h1>
                            <p style="margin: 10px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                                Sua Jornada Financeira
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                                Olá, ${name}!
                            </h2>
                            
                            <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                                Estamos muito felizes em ter você conosco! Sua conta foi criada com sucesso e você já pode começar a organizar suas finanças de forma inteligente e prática.
                            </p>
                            
                            <div style="background-color: #f8f9ff; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 8px;">
                                <p style="margin: 0; color: #667eea; font-weight: 600; font-size: 16px; margin-bottom: 10px;">
                                    O que você pode fazer no Monli:
                                </p>
                                <ul style="margin: 10px 0 0; padding-left: 20px; color: #4a4a4a; font-size: 15px; line-height: 1.8;">
                                    <li>Controlar suas receitas e despesas</li>
                                    <li>Acompanhar seus investimentos</li>
                                    <li>Definir e alcançar suas metas financeiras</li>
                                    <li>Visualizar relatórios detalhados</li>
                                    <li>Manter tudo seguro com 2FA</li>
                                </ul>
                            </div>
                            
                            <p style="margin: 0 0 30px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                                Comece agora mesmo fazendo seu primeiro login e configure sua conta para aproveitar ao máximo todos os recursos que preparamos para você.
                            </p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${env.FRONTEND_URL}/login" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                                    Acessar Minha Conta
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Tips Section -->
                    <tr>
                        <td style="padding: 0 30px 40px;">
                            <div style="background-color: #fff8e1; border-radius: 8px; padding: 20px;">
                                <p style="margin: 0; color: #f57c00; font-weight: 600; font-size: 15px; margin-bottom: 10px;">
                                    Dica de Segurança
                                </p>
                                <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                    Para maior segurança, recomendamos que você ative a autenticação de dois fatores (2FA) nas configurações da sua conta.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                                Precisa de ajuda? Entre em contato conosco
                            </p>
                            <p style="margin: 0 0 20px; color: #666666; font-size: 14px;">
                                <a href="mailto:suporte@monli.com" style="color: #667eea; text-decoration: none;">suporte@monli.com</a>
                            </p>
                            <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6;">
                                © 2025 Monli Finance. Todos os direitos reservados.<br>
                                Este é um email automático, por favor não responda.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    if (!this.transporter) {
      console.log('Email not configured, skipping password reset email')
      return
    }

    const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`

    try {
      await this.transporter.sendMail({
        from: `Monli Finance <${env.EMAIL_FROM}>`,
        to: email,
        subject: 'Redefinir Senha - Monli Finance',
        html: `
          <h2>Redefinir Senha</h2>
          <p>Você solicitou a redefinição de senha. Clique no link abaixo para criar uma nova senha:</p>
          <a href="${resetUrl}">Redefinir Senha</a>
          <p>Se você não solicitou isso, ignore este email.</p>
          <p>Este link expira em 1 hora.</p>
        `,
      })

      console.log(`Password reset email sent to ${email}`)
    } catch (error) {
      console.error('Error sending password reset email:', error)
    }
  }

  async sendEmailVerification(email: string, verificationToken: string) {
    if (!this.transporter) {
      console.log('Email not configured, skipping verification email')
      return
    }

    const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${verificationToken}`

    try {
      await this.transporter.sendMail({
        from: `Monli Finance <${env.EMAIL_FROM}>`,
        to: email,
        subject: 'Verificar Email - Monli Finance',
        html: `
          <h2>Verificar Email</h2>
          <p>Clique no link abaixo para verificar seu email:</p>
          <a href="${verificationUrl}">Verificar Email</a>
        `,
      })

      console.log(`Verification email sent to ${email}`)
    } catch (error) {
      console.error('Error sending verification email:', error)
    }
  }
}

export const emailService = new EmailService()
