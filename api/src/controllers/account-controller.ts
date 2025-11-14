import { FastifyRequest, FastifyReply } from 'fastify'
import { walletService } from '../services/account-service'

export class WalletController {
  /**
   * Get wallet
   */
  async getWallet(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const wallet = await walletService.getWalletByUserId(userId)

      return reply.status(200).send({
        success: true,
        data: { wallet },
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
   * Update wallet settings
   */
  async updateWallet(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const { showBalance } = request.body as {
        showBalance?: boolean
      }

      const wallet = await walletService.updateWallet(userId, { showBalance })

      return reply.status(200).send({
        success: true,
        data: { wallet },
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
   * Get balance
   */
  async getBalance(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const balance = await walletService.getBalance(userId)

      return reply.status(200).send({
        success: true,
        data: balance,
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
   * Create transaction
   */
  async createTransaction(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const { type, category, amount, description, date, tags } = request.body as {
        type: 'income' | 'expense' | 'transfer_to_saved' | 'transfer_from_saved'
        category?: string
        amount: number
        description?: string
        date?: string
        tags?: string[]
      }

      const transaction = await walletService.createTransaction({
        userId,
        walletId: '', // Will be fetched in service
        type,
        category,
        amount,
        description,
        date: date ? new Date(date) : new Date(),
        tags,
      })

      return reply.status(201).send({
        success: true,
        data: { transaction },
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
   * Get transactions
   */
  async getTransactions(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { limit } = request.query as { limit?: string }

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const transactions = await walletService.getTransactionsByUserId(
        userId,
        limit ? parseInt(limit) : 100
      )

      return reply.status(200).send({
        success: true,
        data: { transactions },
      })
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  /**
   * Transfer to saved balance
   */
  async transferToSaved(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const { amount } = request.body as { amount: number }

      const transaction = await walletService.transferToSaved(userId, amount)

      return reply.status(201).send({
        success: true,
        data: { transaction },
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
   * Transfer from saved balance
   */
  async transferFromSaved(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      if (!userId) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
        })
      }

      const { amount } = request.body as { amount: number }

      const transaction = await walletService.transferFromSaved(userId, amount)

      return reply.status(201).send({
        success: true,
        data: { transaction },
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

export const walletController = new WalletController()
