import { db } from '../db'
import { budgets, transactions } from '../db/schema'
import { eq, and, desc, gte, lte, sql } from 'drizzle-orm'

interface CreateBudgetInput {
  userId: string
  name: string
  description?: string
  amount: string
  tags?: string[]
  category?: string
  startDate: Date
  endDate: Date
  alertPercentage?: string
  alertEnabled?: boolean
}

interface UpdateBudgetInput {
  name?: string
  description?: string
  amount?: string
  tags?: string[]
  category?: string
  startDate?: Date
  endDate?: Date
  alertPercentage?: string
  alertEnabled?: boolean
  isActive?: boolean
}

export class BudgetService {
  async createBudget(data: CreateBudgetInput) {
    const [budget] = await db.insert(budgets).values({
      userId: data.userId,
      name: data.name,
      description: data.description,
      amount: data.amount,
      tags: data.tags,
      category: data.category,
      startDate: data.startDate,
      endDate: data.endDate,
      alertPercentage: data.alertPercentage,
      alertEnabled: data.alertEnabled,
    }).returning()

    return budget
  }

  async getBudgetsByUserId(userId: string, includeInactive = false) {
    const conditions = [eq(budgets.userId, userId)]
    
    if (!includeInactive) {
      conditions.push(eq(budgets.isActive, true))
    }

    const userBudgets = await db
      .select()
      .from(budgets)
      .where(and(...conditions))
      .orderBy(desc(budgets.createdAt))

    // Calcular gastos para cada orçamento
    const budgetsWithSpent = await Promise.all(
      userBudgets.map(async (budget) => {
        const spent = await this.calculateSpent(budget.id, userId)
        return {
          ...budget,
          spent: spent.toFixed(2),
          remaining: (parseFloat(budget.amount) - spent).toFixed(2),
          percentage: ((spent / parseFloat(budget.amount)) * 100).toFixed(2),
        }
      })
    )

    return budgetsWithSpent
  }

  async getBudgetById(budgetId: string, userId: string) {
    const [budget] = await db
      .select()
      .from(budgets)
      .where(and(
        eq(budgets.id, budgetId),
        eq(budgets.userId, userId),
        eq(budgets.isActive, true)
      ))

    if (!budget) {
      return null
    }

    const spent = await this.calculateSpent(budgetId, userId)
    
    return {
      ...budget,
      spent: spent.toFixed(2),
      remaining: (parseFloat(budget.amount) - spent).toFixed(2),
      percentage: ((spent / parseFloat(budget.amount)) * 100).toFixed(2),
    }
  }

  async updateBudget(budgetId: string, userId: string, data: UpdateBudgetInput) {
    const [updated] = await db
      .update(budgets)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(
        eq(budgets.id, budgetId),
        eq(budgets.userId, userId)
      ))
      .returning()

    return updated
  }

  async deleteBudget(budgetId: string, userId: string) {
    // Soft delete
    const [deleted] = await db
      .update(budgets)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(and(
        eq(budgets.id, budgetId),
        eq(budgets.userId, userId)
      ))
      .returning()

    return deleted
  }

  async calculateSpent(budgetId: string, userId: string): Promise<number> {
    const [budget] = await db
      .select()
      .from(budgets)
      .where(eq(budgets.id, budgetId))

    if (!budget) {
      return 0
    }

    // Buscar transações de despesas no período do orçamento
    let query = db
      .select()
      .from(transactions)
      .where(and(
        eq(transactions.userId, userId),
        eq(transactions.type, 'expense'),
        gte(transactions.date, budget.startDate),
        lte(transactions.date, budget.endDate)
      ))

    const allTransactions = await query

    // Filtrar por tags ou categoria
    let filteredTransactions = allTransactions

    if (budget.tags && budget.tags.length > 0) {
      filteredTransactions = allTransactions.filter(transaction => {
        if (!transaction.tags) return false
        
        try {
          const transactionTags = JSON.parse(transaction.tags)
          // Verifica se alguma tag do budget está presente nas tags da transação
          return budget.tags?.some(budgetTag => 
            transactionTags.includes(budgetTag)
          )
        } catch {
          return false
        }
      })
    } else if (budget.category) {
      filteredTransactions = allTransactions.filter(transaction => 
        transaction.category === budget.category
      )
    }

    // Somar os valores
    const total = filteredTransactions.reduce((sum, transaction) => {
      return sum + parseFloat(transaction.amount)
    }, 0)

    return total
  }

  async getActiveBudgets(userId: string) {
    const now = new Date()
    
    const activeBudgets = await db
      .select()
      .from(budgets)
      .where(and(
        eq(budgets.userId, userId),
        eq(budgets.isActive, true),
        lte(budgets.startDate, now),
        gte(budgets.endDate, now)
      ))
      .orderBy(desc(budgets.createdAt))

    // Calcular gastos para cada orçamento
    const budgetsWithSpent = await Promise.all(
      activeBudgets.map(async (budget) => {
        const spent = await this.calculateSpent(budget.id, userId)
        const percentage = (spent / parseFloat(budget.amount)) * 100
        
        return {
          ...budget,
          spent: spent.toFixed(2),
          remaining: (parseFloat(budget.amount) - spent).toFixed(2),
          percentage: percentage.toFixed(2),
          isOverBudget: spent > parseFloat(budget.amount),
          shouldAlert: budget.alertEnabled && percentage >= parseFloat(budget.alertPercentage || '80'),
        }
      })
    )

    return budgetsWithSpent
  }

  async getBudgetSummary(userId: string) {
    const activeBudgets = await this.getActiveBudgets(userId)
    
    const totalBudgeted = activeBudgets.reduce((sum, budget) => 
      sum + parseFloat(budget.amount), 0
    )
    
    const totalSpent = activeBudgets.reduce((sum, budget) => 
      sum + parseFloat(budget.spent), 0
    )
    
    const overBudgetCount = activeBudgets.filter(b => b.isOverBudget).length
    const alertsCount = activeBudgets.filter(b => b.shouldAlert).length

    return {
      totalBudgets: activeBudgets.length,
      totalBudgeted: totalBudgeted.toFixed(2),
      totalSpent: totalSpent.toFixed(2),
      totalRemaining: (totalBudgeted - totalSpent).toFixed(2),
      overBudgetCount,
      alertsCount,
      budgets: activeBudgets,
    }
  }
}

export const budgetService = new BudgetService()
