import { FastifyRequest, FastifyReply } from 'fastify'
import { profileService } from '../services/profile-service'

export class ProfileController {
  /**
   * Get current user profile
   */
  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const profile = await profileService.getProfileByUserId(userId)

      return reply.status(200).send({
        success: true,
        data: { profile },
      })
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(404).send({
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
   * Update user profile
   */
  async updateProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const data = request.body as {
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

      const profile = await profileService.updateProfile(userId, data)

      return reply.status(200).send({
        success: true,
        data: { profile },
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
   * Update subscription
   */
  async updateSubscription(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const { planType, subscriptionEndDate } = request.body as {
        planType: 'free' | 'premium' | 'business'
        subscriptionEndDate?: string
      }

      const profile = await profileService.updateSubscription(
        userId,
        planType,
        subscriptionEndDate ? new Date(subscriptionEndDate) : undefined
      )

      return reply.status(200).send({
        success: true,
        data: { profile },
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
   * Cancel subscription
   */
  async cancelSubscription(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const profile = await profileService.cancelSubscription(userId)

      return reply.status(200).send({
        success: true,
        data: { profile },
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
   * Update notification preferences
   */
  async updateNotifications(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const settings = request.body as {
        notificationsEnabled?: boolean
        emailNotifications?: boolean
        pushNotifications?: boolean
      }

      const profile = await profileService.updateNotifications(userId, settings)

      return reply.status(200).send({
        success: true,
        data: { profile },
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
   * Deactivate profile
   */
  async deactivateProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const result = await profileService.deactivateProfile(userId)

      return reply.status(200).send({
        success: true,
        message: result.message,
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
}

export const profileController = new ProfileController()
