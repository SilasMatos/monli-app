import { OAuth2Client } from 'google-auth-library'
import { db } from '../db'
import { users, accessLogs } from '../db/schema'
import { eq } from 'drizzle-orm'
import { env } from '../env'
import { authService } from './auth-service'
import { uuidv7 } from 'uuidv7'

export class GoogleAuthService {
  private client: OAuth2Client | null = null

  constructor() {
    if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
      this.client = new OAuth2Client(
        env.GOOGLE_CLIENT_ID,
        env.GOOGLE_CLIENT_SECRET,
        env.GOOGLE_CALLBACK_URL
      )
    }
  }

  isConfigured(): boolean {
    return this.client !== null
  }
  getAuthorizationUrl(): string {
    if (!this.client) {
      throw new Error('Google OAuth not configured')
    }

    return this.client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      prompt: 'consent',
    })
  }

  /**
   * Handle Google OAuth callback
   */
  async handleCallback(code: string) {
    if (!this.client) {
      throw new Error('Google OAuth not configured')
    }

    // Exchange code for tokens
    const { tokens } = await this.client.getToken(code)
    this.client.setCredentials(tokens)

    // Get user info
    const ticket = await this.client.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload || !payload.sub || !payload.email) {
      throw new Error('Invalid Google user data')
    }

    // Check if user exists
    let user = await db.query.users.findFirst({
      where: eq(users.googleId, payload.sub),
    })

    // If user doesn't exist with Google ID, check by email
    if (!user) {
      user = await db.query.users.findFirst({
        where: eq(users.email, payload.email),
      })

      // If user exists with same email, link Google account
      if (user) {
        await db
          .update(users)
          .set({
            googleId: payload.sub,
            googleAccessToken: tokens.access_token,
            googleRefreshToken: tokens.refresh_token,
            emailVerified: payload.email_verified || false,
            updatedAt: new Date(),
          })
          .where(eq(users.id, user.id))
      }
    }

    // If user still doesn't exist, create new user
    if (!user) {
      const [newUser] = await db
        .insert(users)
        .values({
          id: uuidv7(),
          email: payload.email,
          name: payload.name,
          googleId: payload.sub,
          googleAccessToken: tokens.access_token,
          googleRefreshToken: tokens.refresh_token,
          emailVerified: payload.email_verified || false,
          twoFactorEnabled: false,
          isActive: true,
        })
        .returning()

      user = newUser
    } else {
      // Update tokens if user exists
      await db
        .update(users)
        .set({
          googleAccessToken: tokens.access_token,
          googleRefreshToken: tokens.refresh_token,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))
    }

    // Check if this is first login ever
    const isFirstLoginEver = !user.lastLoginAt

    // Check if this is first login today
    let isFirstLoginToday = false
    if (user.lastLoginAt) {
      const lastLogin = new Date(user.lastLoginAt)
      const today = new Date()
      
      isFirstLoginToday = !(
        lastLogin.getFullYear() === today.getFullYear() &&
        lastLogin.getMonth() === today.getMonth() &&
        lastLogin.getDate() === today.getDate()
      )
    } else {
      isFirstLoginToday = true
    }

    // Update lastLoginAt
    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id))

    // Log access
    await db.insert(accessLogs).values({
      id: uuidv7(),
      userId: user.id,
      email: user.email,
      loginMethod: 'google',
      isFirstLoginEver: isFirstLoginEver ? 'true' : 'false',
      isFirstLoginToday: isFirstLoginToday ? 'true' : 'false',
    })

    // Generate JWT tokens
    const authTokens = authService.generateTokens({
      userId: user.id,
      email: user.email,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
      },
      tokens: authTokens,
      isFirstLoginEver,
      isFirstLoginToday,
    }
  }
}

export const googleAuthService = new GoogleAuthService()
