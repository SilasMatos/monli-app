import { FastifyRequest, FastifyReply } from 'fastify'
import { creditCardService } from '../services/credit-card-service'

export class CreditCardController {
  async createCard(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const body = request.body as {
        name: string
        lastFourDigits: string
        brand: string
        creditLimit: string
        closingDay: number
        dueDay: number
        color?: string
        icon?: string
      }

      // Validações
      if (!body.name || !body.lastFourDigits || !body.brand || !body.creditLimit) {
        return reply.status(400).send({
          success: false,
          error: 'Missing required fields',
        })
      }

      if (body.lastFourDigits.length !== 4 || !/^\d+$/.test(body.lastFourDigits)) {
        return reply.status(400).send({
          success: false,
          error: 'Last four digits must be exactly 4 numeric characters',
        })
      }

      if (body.closingDay < 1 || body.closingDay > 31) {
        return reply.status(400).send({
          success: false,
          error: 'Closing day must be between 1 and 31',
        })
      }

      if (body.dueDay < 1 || body.dueDay > 31) {
        return reply.status(400).send({
          success: false,
          error: 'Due day must be between 1 and 31',
        })
      }

      const card = await creditCardService.createCard({
        userId,
        ...body,
      })

      return reply.status(201).send({
        success: true,
        data: { card },
      })
    } catch (error) {
      console.error('Error creating credit card:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getAllCards(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const cards = await creditCardService.getCardsByUserId(userId)

      return reply.status(200).send({
        success: true,
        data: { cards },
      })
    } catch (error) {
      console.error('Error fetching credit cards:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getCardById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const card = await creditCardService.getCardById(id, userId)

      if (!card) {
        return reply.status(404).send({
          success: false,
          error: 'Credit card not found',
        })
      }

      return reply.status(200).send({
        success: true,
        data: { card },
      })
    } catch (error) {
      console.error('Error fetching credit card:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async updateCard(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }
      const body = request.body as {
        name?: string
        creditLimit?: string
        closingDay?: number
        dueDay?: number
        color?: string
        icon?: string
        isActive?: boolean
      }

      const card = await creditCardService.getCardById(id, userId)
      if (!card) {
        return reply.status(404).send({
          success: false,
          error: 'Credit card not found',
        })
      }

      const updated = await creditCardService.updateCard(id, userId, body)

      return reply.status(200).send({
        success: true,
        data: { card: updated },
      })
    } catch (error) {
      console.error('Error updating credit card:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async deleteCard(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const card = await creditCardService.getCardById(id, userId)
      if (!card) {
        return reply.status(404).send({
          success: false,
          error: 'Credit card not found',
        })
      }

      await creditCardService.deleteCard(id, userId)

      return reply.status(204).send()
    } catch (error) {
      console.error('Error deleting credit card:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getAvailableCredit(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const card = await creditCardService.getCardById(id, userId)
      if (!card) {
        return reply.status(404).send({
          success: false,
          error: 'Credit card not found',
        })
      }

      const creditInfo = await creditCardService.getAvailableCredit(id, userId)

      return reply.status(200).send({
        success: true,
        data: creditInfo,
      })
    } catch (error) {
      console.error('Error fetching available credit:', error)
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async addExpense(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }
      const { amount } = request.body as { amount: string }

      if (!amount || parseFloat(amount) <= 0) {
        return reply.status(400).send({
          success: false,
          error: 'Invalid amount',
        })
      }

      const card = await creditCardService.getCardById(id, userId)
      if (!card) {
        return reply.status(404).send({
          success: false,
          error: 'Credit card not found',
        })
      }

      const updated = await creditCardService.updateBalance(id, userId, amount)

      return reply.status(200).send({
        success: true,
        data: { card: updated },
        message: 'Expense added to credit card',
      })
    } catch (error: any) {
      console.error('Error adding expense to credit card:', error)
      
      if (error.message === 'Credit limit exceeded') {
        return reply.status(400).send({
          success: false,
          error: 'Credit limit exceeded',
        })
      }

      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

export const creditCardController = new CreditCardController()
