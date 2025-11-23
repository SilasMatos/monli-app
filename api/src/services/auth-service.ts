import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { db } from '../db'
import { users, accessLogs, userProfiles } from '../db/schema'
import { eq } from 'drizzle-orm'
import { env } from '../env'
import { uuidv7 } from 'uuidv7'
import { emailService } from './email-service'
import { profileService } from './profile-service'
import { walletService } from './account-service'

export interface RegisterData {
  email: string
  password: string
  name?: string
}

export interface LoginData {
  email: string
  password: string
  twoFactorCode?: string
  ipAddress?: string
  userAgent?: string
}

export interface TokenPayload {
  userId: string
  email: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export class AuthService {
  /**
   * Hash a password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  /**
   * Compare password with hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  /**
   * Generate JWT access token
   */
  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    } as jwt.SignOptions)
  }

  /**
   * Generate JWT refresh token
   */
  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    } as jwt.SignOptions)
  }

  /**
   * Generate both access and refresh tokens
   */
  generateTokens(payload: TokenPayload): AuthTokens {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }

  /**
   * Verify JWT access token
   */
  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload
  }

  /**
   * Verify JWT refresh token
   */
  verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData) {
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    })

    if (existingUser) {
      throw new Error('User already exists with this email')
    }

    const hashedPassword = await this.hashPassword(data.password)

    const [newUser] = await db
      .insert(users)
      .values({
        id: uuidv7(),
        email: data.email,
        password: hashedPassword,
        name: data.name,
        emailVerified: false,
        twoFactorEnabled: false,
        isActive: true,
      })
      .returning()

    emailService.sendWelcomeEmail(newUser.email, newUser.name || undefined).catch(error => {
      console.error('Failed to send welcome email:', error)
    })

    // Create user profile with default values
    let userProfile = null
    try {
      userProfile = await profileService.createProfile({
        userId: newUser.id,
      })
    } catch (error) {
      console.error('Failed to create user profile:', error)
    }

    // Create user wallet
    try {
      await walletService.createWallet({
        userId: newUser.id,
      })
    } catch (error) {
      console.error('Failed to create user wallet:', error)
    }

    const tokens = this.generateTokens({
      userId: newUser.id,
      email: newUser.email,
    })

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        emailVerified: newUser.emailVerified,
        twoFactorEnabled: newUser.twoFactorEnabled,
        // User preferences from profile
        theme: userProfile?.theme || 'light',
        language: userProfile?.language || 'pt-BR',
        avatar: userProfile?.avatar || null,
      },
      tokens,
    }
  }

  /**
   * Login user
   */
  async login(data: LoginData) {
    const user = await db.query.users.findFirst({
      where: eq(users.email, data.email),
    })

    if (!user || !user.password) {
      throw new Error('Invalid credentials')
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated')
    }

    const isPasswordValid = await this.comparePassword(data.password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    if (user.twoFactorEnabled) {
      if (!data.twoFactorCode) {
        return {
          requiresTwoFactor: true,
          userId: user.id,
        }
      }

      if (!user.twoFactorSecret) {
        throw new Error('2FA is enabled but secret is missing')
      }

      const isValidCode = this.verifyTwoFactorCode(data.twoFactorCode, user.twoFactorSecret)
      if (!isValidCode) {
        throw new Error('Invalid 2FA code')
      }
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

    // Get user profile for preferences
    const userProfile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, user.id),
    })

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
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      loginMethod: 'email',
      isFirstLoginEver: isFirstLoginEver ? 'true' : 'false',
      isFirstLoginToday: isFirstLoginToday ? 'true' : 'false',
    })

    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
    })
    console.log('Generated tokens for user:', user.id)
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
        // User preferences from profile
        theme: userProfile?.theme || 'light',
        language: userProfile?.language || 'pt-BR',
        avatar: userProfile?.avatar || null,
      },
      tokens,
      isFirstLoginEver,
      isFirstLoginToday,
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.verifyRefreshToken(refreshToken)

      // Verify user still exists and is active
      const user = await db.query.users.findFirst({
        where: eq(users.id, payload.userId),
      })

      if (!user || !user.isActive) {
        throw new Error('User not found or inactive')
      }

      // Generate new tokens
      const tokens = this.generateTokens({
        userId: user.id,
        email: user.email,
      })

      return tokens
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  }

  /**
   * Setup 2FA for user
   */
  async setupTwoFactor(userId: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Monli Finance (${user.email})`,
      issuer: 'Monli Finance',
    })

    // Generate QR code
    const qrCode = await QRCode.toDataURL(secret.otpauth_url as string)

    // Save secret to database (not enabled yet)
    await db
      .update(users)
      .set({
        twoFactorSecret: secret.base32,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))

    return {
      secret: secret.base32,
      qrCode,
    }
  }

  /**
   * Enable 2FA after verification
   */
  async enableTwoFactor(userId: string, code: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user || !user.twoFactorSecret) {
      throw new Error('2FA not set up')
    }

    // Verify code
    const isValid = this.verifyTwoFactorCode(code, user.twoFactorSecret)
    if (!isValid) {
      throw new Error('Invalid 2FA code')
    }

    // Enable 2FA
    await db
      .update(users)
      .set({
        twoFactorEnabled: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))

    return { success: true }
  }

  /**
   * Disable 2FA
   */
  async disableTwoFactor(userId: string, code: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user || !user.twoFactorSecret) {
      throw new Error('2FA not enabled')
    }

    // Verify code
    const isValid = this.verifyTwoFactorCode(code, user.twoFactorSecret)
    if (!isValid) {
      throw new Error('Invalid 2FA code')
    }

    // Disable 2FA
    await db
      .update(users)
      .set({
        twoFactorEnabled: false,
        twoFactorSecret: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))

    return { success: true }
  }

  /**
   * Verify 2FA code
   */
  verifyTwoFactorCode(code: string, secret: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: code,
      window: 2, // Allow 2 time steps before and after
    })
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      twoFactorEnabled: user.twoFactorEnabled,
      isActive: user.isActive,
      createdAt: user.createdAt,
    }
  }
}

export const authService = new AuthService()
