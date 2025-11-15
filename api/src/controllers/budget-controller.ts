import { FastifyRequest, FastifyReply } from 'fastify'
import { budgetService } from '../services/budget-service'

export class BudgetController {
  async createBudget(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const body = request.body as {
        name: string
        description?: string
        amount: string
        tags?: string[]
        category?: string
        startDate: string
        endDate: string
        alertPercentage?: string
        alertEnabled?: boolean
      }

      // Validações
      if (!body.name || !body.amount || !body.startDate || !body.endDate) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields: name, amount, startDate, endDate',
        })
      }

      const startDate = new Date(body.startDate)
      const endDate = new Date(body.endDate)

      if (startDate >= endDate) {
        return reply.status(400).send({
          success: false,
          error: 'End date must be after start date',
        })
      }

      if (parseFloat(body.amount) <= 0) {
        return reply.status(400).send({
          success: false,
          error: 'Amount must be greater than zero',
        })
      }

      const budget = await budgetService.createBudget({
        userId,
        name: body.name,
        description: body.description,
        amount: body.amount,
        tags: body.tags,
        category: body.category,
        startDate,
        endDate,
        alertPercentage: body.alertPercentage,
        alertEnabled: body.alertEnabled,
      })

      return reply.status(201).send({
        success: true,
        data: { budget },
      })
    } catch (error) {
      console.error('Error creating budget:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getAllBudgets(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { includeInactive } = request.query as { includeInactive?: string }

      const budgets = await budgetService.getBudgetsByUserId(
        userId,
        includeInactive === 'true'
      )

      return reply.status(200).send({
        success: true,
        data: { budgets },
      })
    } catch (error) {
      console.error('Error fetching budgets:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getBudgetById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const budget = await budgetService.getBudgetById(id, userId)

      if (!budget) {
        return reply.status(404).send({
          success: false,
          error: 'Budget not found',
        })
      }

      return reply.status(200).send({
        success: true,
        data: { budget },
      })
    } catch (error) {
      console.error('Error fetching budget:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async updateBudget(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }
      const body = request.body as {
        name?: string
        description?: string
        amount?: string
        tags?: string[]
        category?: string
        startDate?: string
        endDate?: string
        alertPercentage?: string
        alertEnabled?: boolean
        isActive?: boolean
      }

      const budget = await budgetService.getBudgetById(id, userId)
      if (!budget) {
        return reply.status(404).send({
          success: false,
          error: 'Budget not found',
        })
      }

      // Converter datas se fornecidas
      const updateData: any = { ...body }
      if (body.startDate) {
        updateData.startDate = new Date(body.startDate)
      }
      if (body.endDate) {
        updateData.endDate = new Date(body.endDate)
      }

      const updated = await budgetService.updateBudget(id, userId, updateData)

      return reply.status(200).send({
        success: true,
        data: { budget: updated },
      })
    } catch (error) {
      console.error('Error updating budget:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async deleteBudget(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const budget = await budgetService.getBudgetById(id, userId)
      if (!budget) {
        return reply.status(404).send({
          success: false,
          error: 'Budget not found',
        })
      }

      await budgetService.deleteBudget(id, userId)

      return reply.status(204).send()
    } catch (error) {
      console.error('Error deleting budget:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getActiveBudgets(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const budgets = await budgetService.getActiveBudgets(userId)

      return reply.status(200).send({
        success: true,
        data: { budgets },
      })
    } catch (error) {
      console.error('Error fetching active budgets:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getBudgetSummary(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const summary = await budgetService.getBudgetSummary(userId)

      return reply.status(200).send({
        success: true,
        data: summary,
      })
    } catch (error) {
      console.error('Error fetching budget summary:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

export const budgetController = new BudgetController()
