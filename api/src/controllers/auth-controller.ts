import { FastifyRequest, FastifyReply } from 'fastify'
import { authService } from '../services/auth-service'
import { googleAuthService } from '../services/google-auth-service'

export class AuthController {
  /**
   * Register a new user
   */
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password, name } = request.body as {
        email: string
        password: string
        name?: string
      }

      const result = await authService.register({ email, password, name })

      // Set HTTP-only cookies
      reply.setCookie('accessToken', result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      reply.setCookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })

      return reply.status(201).send({
        success: true,
        data: {
          user: result.user,
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({
          success: false,
          error: error.message,
        })
      }
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  /**
   * Login user
   */
  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password, twoFactorCode } = request.body as {
        email: string
        password: string
        twoFactorCode?: string
      }

      const ipAddress = request.ip
      const userAgent = request.headers['user-agent']

      const result = await authService.login({ 
        email, 
        password, 
        twoFactorCode,
        ipAddress,
        userAgent,
      })

      // If 2FA is required, don't set cookies yet
      if ('requiresTwoFactor' in result && result.requiresTwoFactor) {
        return reply.status(200).send({
          success: true,
          requiresTwoFactor: true,
          message: 'Please provide 2FA code',
        })
      }

      // Set HTTP-only cookies
      if (!result.tokens) {
        return reply.status(500).send({
          success: false,
          error: 'Failed to generate tokens',
        })
      }

      reply.setCookie('accessToken', result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      reply.setCookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
      })

      return reply.status(200).send({
        success: true,
        data: {
          user: result.user,
          isFirstLoginEver: result.isFirstLoginEver,
          isFirstLoginToday: result.isFirstLoginToday,
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(401).send({
          success: false,
          error: error.message,
        })
      }
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  /**
   * Logout user
   */
  async logout(request: FastifyRequest, reply: FastifyReply) {
    reply.clearCookie('accessToken', { path: '/' })
    reply.clearCookie('refreshToken', { path: '/' })

    return reply.status(200).send({
      success: true,
      message: 'Logged out successfully',
    })
  }

  /**
   * Refresh access token
   */
  async refreshToken(request: FastifyRequest, reply: FastifyReply) {
    try {
      const refreshToken = request.cookies.refreshToken

      if (!refreshToken) {
        return reply.status(401).send({
          success: false,
          error: 'Refresh token not found',
        })
      }

      const tokens = await authService.refreshToken(refreshToken)

      // Update cookies
      reply.setCookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      })

      reply.setCookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      })

      return reply.status(200).send({
        success: true,
        message: 'Token refreshed successfully',
      })
    } catch (error) {
      return reply.status(401).send({
        success: false,
        error: 'Invalid refresh token',
      })
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const user = await authService.getUserById(userId)

      return reply.status(200).send({
        success: true,
        data: { user },
      })
    } catch (error) {
      return reply.status(404).send({
        success: false,
        error: 'User not found',
      })
    }
  }

  /**
   * Setup 2FA
   */
  async setupTwoFactor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const result = await authService.setupTwoFactor(userId)

      return reply.status(200).send({
        success: true,
        data: result,
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({
          success: false,
          error: error.message,
        })
      }
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  /**
   * Enable 2FA
   */
  async enableTwoFactor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { code } = request.body as { code: string }

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      await authService.enableTwoFactor(userId, code)

      return reply.status(200).send({
        success: true,
        message: '2FA enabled successfully',
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({
          success: false,
          error: error.message,
        })
      }
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  /**
   * Disable 2FA
   */
  async disableTwoFactor(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { code } = request.body as { code: string }

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      await authService.disableTwoFactor(userId, code)

      return reply.status(200).send({
        success: true,
        message: '2FA disabled successfully',
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({
          success: false,
          error: error.message,
        })
      }
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  /**
   * Google OAuth - Get authorization URL
   */
  async googleAuthUrl(request: FastifyRequest, reply: FastifyReply) {
    try {
      if (!googleAuthService.isConfigured()) {
        return reply.status(501).send({
          success: false,
          error: 'Google OAuth not configured',
        })
      }

      const url = googleAuthService.getAuthorizationUrl()

      return reply.status(200).send({
        success: true,
        data: { url },
      })
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Failed to generate authorization URL',
      })
    }
  }

  /**
   * Google OAuth - Handle callback
   */
  async googleAuthCallback(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { code } = request.query as { code: string }

      if (!code) {
        return reply.status(400).send({
          success: false,
          error: 'Authorization code not provided',
        })
      }

      const result = await googleAuthService.handleCallback(code)

      // Set HTTP-only cookies
      reply.setCookie('accessToken', result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      })

      reply.setCookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      })

      // Redirect to frontend
      return reply.redirect(`${process.env.FRONTEND_URL}/auth/callback?success=true&isFirstLoginEver=${result.isFirstLoginEver}&isFirstLoginToday=${result.isFirstLoginToday}`)
    } catch (error) {
      console.error('Google OAuth error:', error)
      return reply.redirect(`${process.env.FRONTEND_URL}/auth/callback?error=auth_failed`)
    }
  }
}

export const authController = new AuthController()
