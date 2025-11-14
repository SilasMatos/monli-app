import { FastifyInstance } from 'fastify'
import { walletController } from '../controllers/account-controller'
import { authenticateUser } from '../middlewares/auth-middleware'

export async function accountRoutes(app: FastifyInstance) {
  // Wallet routes
  app.get('/wallet', { preHandler: authenticateUser }, (req, reply) => 
    walletController.getWallet(req, reply)
  )

  app.put('/wallet', { preHandler: authenticateUser }, (req, reply) => 
    walletController.updateWallet(req, reply)
  )

  app.get('/wallet/balance', { preHandler: authenticateUser }, (req, reply) => 
    walletController.getBalance(req, reply)
  )

  // Transaction routes
  app.post('/transactions', { preHandler: authenticateUser }, (req, reply) => 
    walletController.createTransaction(req, reply)
  )

  app.get('/transactions', { preHandler: authenticateUser }, (req, reply) => 
    walletController.getTransactions(req, reply)
  )

  // Transfer between balance and saved
  app.post('/wallet/transfer-to-saved', { preHandler: authenticateUser }, (req, reply) => 
    walletController.transferToSaved(req, reply)
  )

  app.post('/wallet/transfer-from-saved', { preHandler: authenticateUser }, (req, reply) => 
    walletController.transferFromSaved(req, reply)
  )
}
