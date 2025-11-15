import { FastifyInstance } from 'fastify'
import { creditCardController } from '../controllers/credit-card-controller'
import { authenticateUser } from '../middlewares/auth-middleware'

export async function creditCardRoutes(app: FastifyInstance) {
  // Create credit card
  app.post('/credit-cards', { preHandler: authenticateUser }, (req, reply) => 
    creditCardController.createCard(req, reply)
  )

  // Get all credit cards
  app.get('/credit-cards', { preHandler: authenticateUser }, (req, reply) => 
    creditCardController.getAllCards(req, reply)
  )

  // Get credit card by ID
  app.get('/credit-cards/:id', { preHandler: authenticateUser }, (req, reply) => 
    creditCardController.getCardById(req, reply)
  )

  // Update credit card
  app.put('/credit-cards/:id', { preHandler: authenticateUser }, (req, reply) => 
    creditCardController.updateCard(req, reply)
  )

  // Delete credit card (soft delete)
  app.delete('/credit-cards/:id', { preHandler: authenticateUser }, (req, reply) => 
    creditCardController.deleteCard(req, reply)
  )

  // Get available credit
  app.get('/credit-cards/:id/available-credit', { preHandler: authenticateUser }, (req, reply) => 
    creditCardController.getAvailableCredit(req, reply)
  )

  // Add expense to credit card
  app.post('/credit-cards/:id/expense', { preHandler: authenticateUser }, (req, reply) => 
    creditCardController.addExpense(req, reply)
  )
}
