import { FastifyInstance } from 'fastify'
import { profileController } from '../controllers/profile-controller'
import { authenticateUser } from '../middlewares/auth-middleware'

export async function profileRoutes(app: FastifyInstance) {
  // Profile routes
  app.get('/profile', { preHandler: authenticateUser }, (req, reply) => 
    profileController.getProfile(req, reply)
  )

  app.put('/profile', { preHandler: authenticateUser }, (req, reply) => 
    profileController.updateProfile(req, reply)
  )

  app.delete('/profile', { preHandler: authenticateUser }, (req, reply) => 
    profileController.deactivateProfile(req, reply)
  )

  // Subscription routes
  app.put('/profile/subscription', { preHandler: authenticateUser }, (req, reply) => 
    profileController.updateSubscription(req, reply)
  )

  app.post('/profile/subscription/cancel', { preHandler: authenticateUser }, (req, reply) => 
    profileController.cancelSubscription(req, reply)
  )

  // Notification preferences
  app.put('/profile/notifications', { preHandler: authenticateUser }, (req, reply) => 
    profileController.updateNotifications(req, reply)
  )
}
