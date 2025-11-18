import type { FastifyInstance } from 'fastify'
import { SubscriptionController } from '../controllers/subscription-controller'
import { authenticateUser } from '../middlewares/auth-middleware'

export async function subscriptionRoutes(app: FastifyInstance) {
  const controller = new SubscriptionController()

  // Rotas protegidas (requerem autenticação)
  app.register(async (authenticatedApp: FastifyInstance) => {
    authenticatedApp.addHook('onRequest', authenticateUser)

    // Rotas de assinaturas do usuário
    authenticatedApp.post('/subscriptions', controller.create.bind(controller))
    authenticatedApp.get('/subscriptions', controller.list.bind(controller))
    authenticatedApp.get('/subscriptions/monthly-total', controller.getMonthlyTotal.bind(controller))
    authenticatedApp.get('/subscriptions/upcoming', controller.getUpcoming.bind(controller))
    authenticatedApp.get('/subscriptions/:id', controller.getById.bind(controller))
    authenticatedApp.put('/subscriptions/:id', controller.update.bind(controller))
    authenticatedApp.delete('/subscriptions/:id', controller.delete.bind(controller))
    authenticatedApp.patch('/subscriptions/:id/pause', controller.pause.bind(controller))
    authenticatedApp.patch('/subscriptions/:id/reactivate', controller.reactivate.bind(controller))

    // Rotas de empresas de assinatura (públicas dentro de autenticação)
    authenticatedApp.get('/subscription-companies', controller.listCompanies.bind(controller))
    authenticatedApp.get('/subscription-companies/:id', controller.getCompanyById.bind(controller))
  })
}
