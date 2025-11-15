import { FastifyInstance } from 'fastify'
import { budgetController } from '../controllers/budget-controller'
import { authenticateUser } from '../middlewares/auth-middleware'

export async function budgetRoutes(app: FastifyInstance) {
  // Create budget
  app.post('/budgets', { preHandler: authenticateUser }, (req, reply) => 
    budgetController.createBudget(req, reply)
  )

  // Get all budgets
  app.get('/budgets', { preHandler: authenticateUser }, (req, reply) => 
    budgetController.getAllBudgets(req, reply)
  )

  // Get active budgets (current period)
  app.get('/budgets/active', { preHandler: authenticateUser }, (req, reply) => 
    budgetController.getActiveBudgets(req, reply)
  )

  // Get budget summary
  app.get('/budgets/summary', { preHandler: authenticateUser }, (req, reply) => 
    budgetController.getBudgetSummary(req, reply)
  )

  // Get budget by ID
  app.get('/budgets/:id', { preHandler: authenticateUser }, (req, reply) => 
    budgetController.getBudgetById(req, reply)
  )

  // Update budget
  app.put('/budgets/:id', { preHandler: authenticateUser }, (req, reply) => 
    budgetController.updateBudget(req, reply)
  )

  // Delete budget (soft delete)
  app.delete('/budgets/:id', { preHandler: authenticateUser }, (req, reply) => 
    budgetController.deleteBudget(req, reply)
  )
}
