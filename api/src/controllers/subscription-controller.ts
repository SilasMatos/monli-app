import type { FastifyReply, FastifyRequest } from 'fastify'
import { SubscriptionService } from '../services/subscription-service'
import { z } from 'zod'

const subscriptionService = new SubscriptionService()

// Schema de validação
const createSubscriptionSchema = z.object({
  companyId: z.string().optional(),
  customName: z.string().optional(),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/),
  currency: z.string().default('BRL'),
  billingCycle: z.enum(['monthly', 'quarterly', 'semiannual', 'annual']),
  startDate: z.string().datetime(),
  nextBillingDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  status: z.enum(['active', 'paused', 'cancelled', 'expired']).default('active'),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
  notifyDaysBefore: z.number().int().min(0).max(30).default(3),
  autoRenew: z.boolean().default(true),
  category: z.string().optional(),
  color: z.string().optional(),
  icon: z.string().optional()
})

const updateSubscriptionSchema = createSubscriptionSchema.partial()

export class SubscriptionController {
  // Criar nova assinatura
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const body = createSubscriptionSchema.parse(request.body)

      // Validar que tem companyId ou customName
      if (!body.companyId && !body.customName) {
        return reply.status(400).send({
          error: 'Você deve fornecer companyId ou customName'
        })
      }

      const subscription = await subscriptionService.createSubscription({
        ...body,
        userId,
        startDate: new Date(body.startDate),
        nextBillingDate: new Date(body.nextBillingDate),
        endDate: body.endDate ? new Date(body.endDate) : null
      })

      return reply.status(201).send(subscription)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ error: error.issues })
      }
      console.error('Erro ao criar assinatura:', error)
      return reply.status(500).send({ error: 'Erro ao criar assinatura' })
    }
  }

  // Listar assinaturas do usuário
  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { status, isActive } = request.query as {
        status?: string
        isActive?: string
      }

      const filters = {
        status,
        isActive: isActive ? isActive === 'true' : undefined
      }

      const subscriptions = await subscriptionService.getSubscriptionsByUserId(
        userId,
        filters
      )

      return reply.status(200).send(subscriptions)
    } catch (error) {
      console.error('Erro ao listar assinaturas:', error)
      return reply.status(500).send({ error: 'Erro ao listar assinaturas' })
    }
  }

  // Buscar assinatura por ID
  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const subscription = await subscriptionService.getSubscriptionById(id, userId)

      if (!subscription) {
        return reply.status(404).send({ error: 'Assinatura não encontrada' })
      }

      return reply.status(200).send(subscription)
    } catch (error) {
      console.error('Erro ao buscar assinatura:', error)
      return reply.status(500).send({ error: 'Erro ao buscar assinatura' })
    }
  }

  // Atualizar assinatura
  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }
      const body = updateSubscriptionSchema.parse(request.body)

      const data: any = { ...body }
      if (body.startDate) data.startDate = new Date(body.startDate)
      if (body.nextBillingDate) data.nextBillingDate = new Date(body.nextBillingDate)
      if (body.endDate) data.endDate = new Date(body.endDate)

      const subscription = await subscriptionService.updateSubscription(
        id,
        userId,
        data
      )

      if (!subscription) {
        return reply.status(404).send({ error: 'Assinatura não encontrada' })
      }

      return reply.status(200).send(subscription)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ error: error.issues })
      }
      console.error('Erro ao atualizar assinatura:', error)
      return reply.status(500).send({ error: 'Erro ao atualizar assinatura' })
    }
  }

  // Deletar assinatura
  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const deleted = await subscriptionService.deleteSubscription(id, userId)

      if (!deleted) {
        return reply.status(404).send({ error: 'Assinatura não encontrada' })
      }

      return reply.status(204).send()
    } catch (error) {
      console.error('Erro ao deletar assinatura:', error)
      return reply.status(500).send({ error: 'Erro ao deletar assinatura' })
    }
  }

  // Calcular custo total mensal
  async getMonthlyTotal(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId

      const total = await subscriptionService.calculateMonthlyTotal(userId)

      return reply.status(200).send({
        monthlyTotal: total,
        currency: 'BRL'
      })
    } catch (error) {
      console.error('Erro ao calcular total mensal:', error)
      return reply.status(500).send({ error: 'Erro ao calcular total mensal' })
    }
  }

  // Buscar assinaturas com vencimento próximo
  async getUpcoming(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { days } = request.query as { days?: string }
      const daysAhead = days ? Number.parseInt(days) : 7

      const subscriptions = await subscriptionService.getUpcomingBillings(
        userId,
        daysAhead
      )

      return reply.status(200).send(subscriptions)
    } catch (error) {
      console.error('Erro ao buscar vencimentos próximos:', error)
      return reply
        .status(500)
        .send({ error: 'Erro ao buscar vencimentos próximos' })
    }
  }

  // Pausar assinatura
  async pause(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const subscription = await subscriptionService.pauseSubscription(id, userId)

      if (!subscription) {
        return reply.status(404).send({ error: 'Assinatura não encontrada' })
      }

      return reply.status(200).send(subscription)
    } catch (error) {
      console.error('Erro ao pausar assinatura:', error)
      return reply.status(500).send({ error: 'Erro ao pausar assinatura' })
    }
  }

  // Reativar assinatura
  async reactivate(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (request as any).userId
      const { id } = request.params as { id: string }

      const subscription = await subscriptionService.reactivateSubscription(
        id,
        userId
      )

      if (!subscription) {
        return reply.status(404).send({ error: 'Assinatura não encontrada' })
      }

      return reply.status(200).send(subscription)
    } catch (error) {
      console.error('Erro ao reativar assinatura:', error)
      return reply.status(500).send({ error: 'Erro ao reativar assinatura' })
    }
  }

  // Listar empresas de assinatura
  async listCompanies(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { category, isActive } = request.query as {
        category?: string
        isActive?: string
      }

      const filters = {
        category,
        isActive: isActive ? isActive === 'true' : undefined
      }

      const companies = await subscriptionService.getSubscriptionCompanies(filters)

      return reply.status(200).send(companies)
    } catch (error) {
      console.error('Erro ao listar empresas:', error)
      return reply.status(500).send({ error: 'Erro ao listar empresas' })
    }
  }

  // Buscar empresa por ID
  async getCompanyById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }

      const company = await subscriptionService.getSubscriptionCompanyById(id)

      if (!company) {
        return reply.status(404).send({ error: 'Empresa não encontrada' })
      }

      return reply.status(200).send(company)
    } catch (error) {
      console.error('Erro ao buscar empresa:', error)
      return reply.status(500).send({ error: 'Erro ao buscar empresa' })
    }
  }
}
