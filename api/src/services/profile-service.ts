import { db } from '../db'
import { userProfiles } from '../db/schema'
import { eq } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'

export interface CreateProfileData {
  userId: string
  phone?: string
  avatar?: string
  bio?: string
  address?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  language?: string
  theme?: string
  currency?: string
  timezone?: string
}

export interface UpdateProfileData {
  phone?: string
  avatar?: string
  bio?: string
  address?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  language?: string
  theme?: string
  currency?: string
  timezone?: string
  notificationsEnabled?: boolean
  emailNotifications?: boolean
  pushNotifications?: boolean
}

export class ProfileService {
  /**
   * Create user profile with default values
   */
  async createProfile(data: CreateProfileData) {
    const profileResult = await db
      .insert(userProfiles)
      .values({
        id: uuidv7(),
        userId: data.userId,
        phone: data.phone,
        avatar: data.avatar,
        bio: data.bio,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country || 'Brazil',
        zipCode: data.zipCode,
        language: data.language || 'pt-BR',
        theme: data.theme || 'light',
        currency: data.currency || 'BRL',
        timezone: data.timezone || 'America/Sao_Paulo',
        planType: 'free',
        subscriptionStatus: 'active',
        notificationsEnabled: true,
        emailNotifications: true,
        pushNotifications: true,
        isActive: true,
      })
      .returning()

    return (profileResult as any[])[0]
  }

  /**
   * Get profile by user ID
   */
  async getProfileByUserId(userId: string) {
    const profile = await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, userId),
    })

    if (!profile) {
      throw new Error('Profile not found')
    }

    return profile
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: UpdateProfileData) {
    await this.getProfileByUserId(userId)

    const result = await db
      .update(userProfiles)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, userId))
      .returning()

    return (result as any[])[0]
  }

  /**
   * Update subscription plan
   */
  async updateSubscription(
    userId: string,
    planType: 'free' | 'premium' | 'business',
    subscriptionEndDate?: Date
  ) {
    await this.getProfileByUserId(userId)

    const result = await db
      .update(userProfiles)
      .set({
        planType,
        subscriptionStatus: 'active',
        subscriptionStartDate: new Date(),
        subscriptionEndDate,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, userId))
      .returning()

    return (result as any[])[0]
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(userId: string) {
    await this.getProfileByUserId(userId)

    const result = await db
      .update(userProfiles)
      .set({
        planType: 'free',
        subscriptionStatus: 'cancelled',
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, userId))
      .returning()

    return (result as any[])[0]
  }

  /**
   * Update notification preferences
   */
  async updateNotifications(
    userId: string,
    settings: {
      notificationsEnabled?: boolean
      emailNotifications?: boolean
      pushNotifications?: boolean
    }
  ) {
    await this.getProfileByUserId(userId)

    const result = await db
      .update(userProfiles)
      .set({
        ...settings,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, userId))
      .returning()

    return (result as any[])[0]
  }

  /**
   * Deactivate profile
   */
  async deactivateProfile(userId: string) {
    await this.getProfileByUserId(userId)

    await db
      .update(userProfiles)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(userProfiles.userId, userId))

    return { success: true, message: 'Profile deactivated' }
  }
}

export const profileService = new ProfileService()
