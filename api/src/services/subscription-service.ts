import { db } from '../db'
import { subscriptions, subscriptionCompanies } from '../db/schema'
import { eq, and, gte, lte, desc, asc } from 'drizzle-orm'
import type { NewSubscription, Subscription } from '../db/schema/subscriptions'

export class SubscriptionService {
  // Criar nova assinatura
  async createSubscription(data: NewSubscription): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values({
        ...data,
        updatedAt: new Date()
      })
      .returning()

    return subscription
  }

  // Buscar assinaturas do usuário
  async getSubscriptionsByUserId(
    userId: string,
    filters?: {
      status?: string
      isActive?: boolean
    }
  ): Promise<Subscription[]> {
    const conditions = [eq(subscriptions.userId, userId)]

    if (filters?.status) {
      conditions.push(eq(subscriptions.status, filters.status))
    }

    if (filters?.isActive !== undefined) {
      conditions.push(eq(subscriptions.isActive, filters.isActive))
    }

    return await db
      .select()
      .from(subscriptions)
      .where(and(...conditions))
      .orderBy(desc(subscriptions.nextBillingDate))
  }

  // Buscar assinatura por ID
  async getSubscriptionById(
    id: string,
    userId: string
  ): Promise<Subscription | null> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(
        and(eq(subscriptions.id, id), eq(subscriptions.userId, userId))
      )
      .limit(1)

    return subscription || null
  }

  // Atualizar assinatura
  async updateSubscription(
    id: string,
    userId: string,
    data: Partial<NewSubscription>
  ): Promise<Subscription | null> {
    const [updated] = await db
      .update(subscriptions)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(
        and(eq(subscriptions.id, id), eq(subscriptions.userId, userId))
      )
      .returning()

    return updated || null
  }

  // Deletar assinatura (soft delete)
  async deleteSubscription(id: string, userId: string): Promise<boolean> {
    const [deleted] = await db
      .update(subscriptions)
      .set({
        isActive: false,
        status: 'cancelled',
        updatedAt: new Date()
      })
      .where(
        and(eq(subscriptions.id, id), eq(subscriptions.userId, userId))
      )
      .returning()

    return !!deleted
  }

  // Calcular custo total mensal das assinaturas ativas
  async calculateMonthlyTotal(userId: string): Promise<number> {
    const activeSubscriptions = await this.getSubscriptionsByUserId(userId, {
      status: 'active',
      isActive: true
    })

    let total = 0
    for (const sub of activeSubscriptions) {
      const amount = Number.parseFloat(sub.amount)

      switch (sub.billingCycle) {
        case 'monthly':
          total += amount
          break
        case 'quarterly':
          total += amount / 3
          break
        case 'semiannual':
          total += amount / 6
          break
        case 'annual':
          total += amount / 12
          break
      }
    }

    return Math.round(total * 100) / 100
  }

  // Buscar assinaturas com vencimento próximo
  async getUpcomingBillings(userId: string, daysAhead = 7): Promise<Subscription[]> {
    const now = new Date()
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + daysAhead)

    return await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, userId),
          eq(subscriptions.status, 'active'),
          eq(subscriptions.isActive, true),
          gte(subscriptions.nextBillingDate, now),
          lte(subscriptions.nextBillingDate, futureDate)
        )
      )
      .orderBy(asc(subscriptions.nextBillingDate))
  }

  // Pausar assinatura
  async pauseSubscription(id: string, userId: string): Promise<Subscription | null> {
    return await this.updateSubscription(id, userId, {
      status: 'paused'
    })
  }

  // Reativar assinatura
  async reactivateSubscription(id: string, userId: string): Promise<Subscription | null> {
    return await this.updateSubscription(id, userId, {
      status: 'active'
    })
  }

  // Buscar empresas de assinatura
  async getSubscriptionCompanies(filters?: {
    category?: string
    isActive?: boolean
  }): Promise<typeof subscriptionCompanies.$inferSelect[]> {
    const conditions = []

    if (filters?.category) {
      conditions.push(eq(subscriptionCompanies.category, filters.category))
    }

    if (filters?.isActive !== undefined) {
      conditions.push(eq(subscriptionCompanies.isActive, filters.isActive))
    }

    const query = conditions.length > 0
      ? db.select().from(subscriptionCompanies).where(and(...conditions))
      : db.select().from(subscriptionCompanies)

    return await query.orderBy(asc(subscriptionCompanies.name))
  }

  // Buscar empresa por ID
  async getSubscriptionCompanyById(id: string) {
    const [company] = await db
      .select()
      .from(subscriptionCompanies)
      .where(eq(subscriptionCompanies.id, id))
      .limit(1)

    return company || null
  }
}
