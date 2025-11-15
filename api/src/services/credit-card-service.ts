import { db } from '../db'
import { creditCards } from '../db/schema'
import { eq, and, desc } from 'drizzle-orm'

interface CreateCreditCardInput {
  userId: string
  name: string
  lastFourDigits: string
  brand: string
  creditLimit: string
  closingDay: number
  dueDay: number
  color?: string
  icon?: string
}

interface UpdateCreditCardInput {
  name?: string
  creditLimit?: string
  closingDay?: number
  dueDay?: number
  color?: string
  icon?: string
  isActive?: boolean
}

export class CreditCardService {
  async createCard(data: CreateCreditCardInput) {
    const [card] = await db.insert(creditCards).values({
      userId: data.userId,
      name: data.name,
      lastFourDigits: data.lastFourDigits,
      brand: data.brand,
      creditLimit: data.creditLimit,
      closingDay: data.closingDay,
      dueDay: data.dueDay,
      color: data.color,
      icon: data.icon,
    }).returning()

    return card
  }

  async getCardsByUserId(userId: string) {
    const cards = await db
      .select()
      .from(creditCards)
      .where(and(
        eq(creditCards.userId, userId),
        eq(creditCards.isActive, true)
      ))
      .orderBy(desc(creditCards.createdAt))

    return cards
  }

  async getCardById(cardId: string, userId: string) {
    const [card] = await db
      .select()
      .from(creditCards)
      .where(and(
        eq(creditCards.id, cardId),
        eq(creditCards.userId, userId),
        eq(creditCards.isActive, true)
      ))

    return card
  }

  async updateCard(cardId: string, userId: string, data: UpdateCreditCardInput) {
    const [updated] = await db
      .update(creditCards)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(
        eq(creditCards.id, cardId),
        eq(creditCards.userId, userId)
      ))
      .returning()

    return updated
  }

  async deleteCard(cardId: string, userId: string) {
    // Soft delete
    const [deleted] = await db
      .update(creditCards)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(and(
        eq(creditCards.id, cardId),
        eq(creditCards.userId, userId)
      ))
      .returning()

    return deleted
  }

  async updateBalance(cardId: string, userId: string, amount: string) {
    const card = await this.getCardById(cardId, userId)
    if (!card) {
      throw new Error('Card not found')
    }

    const currentBalance = parseFloat(card.currentBalance)
    const amountToAdd = parseFloat(amount)
    const newBalance = (currentBalance + amountToAdd).toFixed(2)

    const creditLimit = parseFloat(card.creditLimit)
    if (parseFloat(newBalance) > creditLimit) {
      throw new Error('Credit limit exceeded')
    }

    const [updated] = await db
      .update(creditCards)
      .set({
        currentBalance: newBalance,
        updatedAt: new Date(),
      })
      .where(eq(creditCards.id, cardId))
      .returning()

    return updated
  }

  async getAvailableCredit(cardId: string, userId: string) {
    const card = await this.getCardById(cardId, userId)
    if (!card) {
      throw new Error('Card not found')
    }

    const creditLimit = parseFloat(card.creditLimit)
    const currentBalance = parseFloat(card.currentBalance)
    const available = creditLimit - currentBalance

    return {
      creditLimit: card.creditLimit,
      currentBalance: card.currentBalance,
      availableCredit: available.toFixed(2),
      utilizationPercentage: ((currentBalance / creditLimit) * 100).toFixed(2),
    }
  }
}

export const creditCardService = new CreditCardService()
