import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { authController } from '../controllers/auth-controller'
import { authenticateUser } from '../middlewares/auth-middleware'

export async function authRoutes(app: FastifyInstance) {
  const server = app.withTypeProvider<ZodTypeProvider>()

  // Register
  server.post(
    '/api/auth/register',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
          name: z.string().optional(),
        }),
        response: {
          201: z.object({
            success: z.boolean(),
            data: z.object({
              user: z.object({
                id: z.string(),
                email: z.string(),
                name: z.string().nullable(),
                emailVerified: z.boolean().nullable(),
                twoFactorEnabled: z.boolean().nullable(),
              }),
            }),
          }),
          400: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    authController.register.bind(authController)
  )

  // Login
  server.post(
    '/api/auth/login',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Login user',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
          twoFactorCode: z.string().optional(),
        }),
        response: {
          200: z.union([
            z.object({
              success: z.boolean(),
              requiresTwoFactor: z.boolean(),
              message: z.string(),
            }),
            z.object({
              success: z.boolean(),
              data: z.object({
                user: z.object({
                  id: z.string(),
                  email: z.string(),
                  name: z.string().nullable(),
                  emailVerified: z.boolean().nullable(),
                  twoFactorEnabled: z.boolean().nullable(),
                }),
              }),
            }),
          ]),
          401: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    authController.login.bind(authController)
  )

  // Logout
  server.post(
    '/api/auth/logout',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Logout user',
        response: {
          200: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
        },
      },
    },
    authController.logout.bind(authController)
  )

  // Refresh Token
  server.post(
    '/api/auth/refresh',
    {
      schema: {
        tags: ['Authentication'],
        summary: 'Refresh access token',
        response: {
          200: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
          401: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    authController.refreshToken.bind(authController)
  )

  // Get Current User (Protected)
  server.get(
    '/api/auth/me',
    {
      preHandler: authenticateUser,
      schema: {
        tags: ['Authentication'],
        summary: 'Get current user',
        response: {
          200: z.object({
            success: z.boolean(),
            data: z.object({
              user: z.object({
                id: z.string(),
                email: z.string(),
                name: z.string().nullable(),
                emailVerified: z.boolean().nullable(),
                twoFactorEnabled: z.boolean().nullable(),
                isActive: z.boolean().nullable(),
                createdAt: z.date().nullable(),
              }),
            }),
          }),
          401: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    authController.getCurrentUser.bind(authController)
  )

  // Setup 2FA (Protected)
  server.post(
    '/api/auth/2fa/setup',
    {
      preHandler: authenticateUser,
      schema: {
        tags: ['Two-Factor Authentication'],
        summary: 'Setup 2FA for user',
        response: {
          200: z.object({
            success: z.boolean(),
            data: z.object({
              secret: z.string(),
              qrCode: z.string(),
            }),
          }),
          401: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    authController.setupTwoFactor.bind(authController)
  )

  // Enable 2FA (Protected)
  server.post(
    '/api/auth/2fa/enable',
    {
      preHandler: authenticateUser,
      schema: {
        tags: ['Two-Factor Authentication'],
        summary: 'Enable 2FA after verification',
        body: z.object({
          code: z.string().length(6),
        }),
        response: {
          200: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
          400: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    authController.enableTwoFactor.bind(authController)
  )

  // Disable 2FA (Protected)
  server.post(
    '/api/auth/2fa/disable',
    {
      preHandler: authenticateUser,
      schema: {
        tags: ['Two-Factor Authentication'],
        summary: 'Disable 2FA',
        body: z.object({
          code: z.string().length(6),
        }),
        response: {
          200: z.object({
            success: z.boolean(),
            message: z.string(),
          }),
          400: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    authController.disableTwoFactor.bind(authController)
  )

  // Google OAuth - Get Authorization URL
  server.get(
    '/api/auth/google',
    {
      schema: {
        tags: ['Google OAuth'],
        summary: 'Get Google OAuth authorization URL',
        response: {
          200: z.object({
            success: z.boolean(),
            data: z.object({
              url: z.string(),
            }),
          }),
          501: z.object({
            success: z.boolean(),
            error: z.string(),
          }),
        },
      },
    },
    authController.googleAuthUrl.bind(authController)
  )

  // Google OAuth - Callback
  server.get(
    '/api/auth/google/callback',
    {
      schema: {
        tags: ['Google OAuth'],
        summary: 'Handle Google OAuth callback',
        querystring: z.object({
          code: z.string(),
        }),
      },
    },
    authController.googleAuthCallback.bind(authController)
  )
}
