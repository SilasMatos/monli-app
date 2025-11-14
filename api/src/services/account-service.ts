import { db } from '../db'
import { wallets, transactions, walletHistory } from '../db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'

export interface CreateWalletData {
  userId: string
  balance?: number
  savedBalance?: number
}

export interface UpdateWalletData {
  showBalance?: boolean
}

export interface CreateTransactionData {
  userId: string
  walletId: string
  type: 'income' | 'expense' | 'transfer_to_saved' | 'transfer_from_saved'
  category?: string
  amount: number
  description?: string
  date: Date
  tags?: string[]
}

export class WalletService {
  /**
   * Log wallet operation to history
   */
  private async logWalletHistory(data: {
    userId: string
    walletId: string
    operation: string
    amount?: number
    balanceAfter: number
    savedBalanceAfter: number
    description?: string
    transactionId?: string
    metadata?: Record<string, any>
  }) {
    await db.insert(walletHistory).values({
      id: uuidv7(),
      userId: data.userId,
      walletId: data.walletId,
      operation: data.operation,
      amount: data.amount?.toString(),
      balanceAfter: data.balanceAfter.toString(),
      savedBalanceAfter: data.savedBalanceAfter.toString(),
      description: data.description,
      transactionId: data.transactionId,
      metadata: data.metadata ? JSON.stringify(data.metadata) : null,
    })
  }

  /**
   * Create user wallet
   */
  async createWallet(data: CreateWalletData) {
    const walletResult = await db
      .insert(wallets)
      .values({
        id: uuidv7(),
        userId: data.userId,
        balance: (data.balance || 0).toString(),
        savedBalance: (data.savedBalance || 0).toString(),
        showBalance: true,
      })
      .returning()

    const wallet = (walletResult as any[])[0]

    // Log wallet creation
    await this.logWalletHistory({
      userId: data.userId,
      walletId: wallet.id,
      operation: 'wallet_created',
      balanceAfter: data.balance || 0,
      savedBalanceAfter: data.savedBalance || 0,
      description: 'Carteira criada',
    })

    // Create initial transaction if there's a balance
    if (data.balance && data.balance !== 0) {
      await db.insert(transactions).values({
        id: uuidv7(),
        userId: data.userId,
        walletId: wallet.id,
        type: data.balance > 0 ? 'income' : 'expense',
        category: 'Saldo Inicial',
        amount: Math.abs(data.balance).toString(),
        description: 'Saldo inicial da carteira',
        date: new Date(),
      })
    }

    return wallet
  }

  /**
   * Get wallet by user ID
   */
  async getWalletByUserId(userId: string) {
    const wallet = await db.query.wallets.findFirst({
      where: eq(wallets.userId, userId),
    })

    if (!wallet) {
      throw new Error('Wallet not found')
    }

    return wallet
  }

  /**
   * Update wallet settings
   */
  async updateWallet(userId: string, data: UpdateWalletData) {
    const wallet = await this.getWalletByUserId(userId)

    const result = await db
      .update(wallets)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(wallets.userId, userId))
      .returning()

    const updatedWallet = (result as any[])[0]

    // Log visibility toggle if changed
    if (data.showBalance !== undefined && data.showBalance !== wallet.showBalance) {
      await this.logWalletHistory({
        userId,
        walletId: wallet.id,
        operation: 'toggle_visibility',
        balanceAfter: parseFloat(updatedWallet.balance),
        savedBalanceAfter: parseFloat(updatedWallet.savedBalance),
        description: `Visibilidade do saldo ${data.showBalance ? 'ativada' : 'desativada'}`,
        metadata: { showBalance: data.showBalance },
      })
    }

    return updatedWallet
  }

  /**
   * Create a transaction
   */
  async createTransaction(data: CreateTransactionData) {
    const wallet = await this.getWalletByUserId(data.userId)

    // Calculate new balances based on transaction type
    let newBalance = parseFloat(wallet.balance)
    let newSavedBalance = parseFloat(wallet.savedBalance)

    switch (data.type) {
      case 'income':
        newBalance += data.amount
        break
      case 'expense':
        newBalance -= data.amount
        break
      case 'transfer_to_saved':
        newBalance -= data.amount
        newSavedBalance += data.amount
        break
      case 'transfer_from_saved':
        newSavedBalance -= data.amount
        newBalance += data.amount
        break
    }

    // Validate balances
    if (newBalance < 0) {
      throw new Error('Insufficient balance')
    }
    if (newSavedBalance < 0) {
      throw new Error('Insufficient saved balance')
    }

    const transactionId = uuidv7()

    // Create transaction record
    const result = await db
      .insert(transactions)
      .values({
        id: transactionId,
        userId: data.userId,
        walletId: wallet.id,
        type: data.type,
        category: data.category,
        amount: data.amount.toString(),
        description: data.description,
        date: data.date,
        tags: data.tags ? JSON.stringify(data.tags) : null,
      })
      .returning()

    const transaction = (result as any[])[0]

    // Update wallet balances
    await db
      .update(wallets)
      .set({
        balance: newBalance.toString(),
        savedBalance: newSavedBalance.toString(),
        updatedAt: new Date(),
      })
      .where(eq(wallets.id, wallet.id))

    // Log operation to wallet history
    let operation = ''
    let description = ''
    
    switch (data.type) {
      case 'income':
        operation = 'add_balance'
        description = 'Adição ao saldo'
        break
      case 'expense':
        operation = 'remove_balance'
        description = 'Remoção do saldo'
        break
      case 'transfer_to_saved':
        operation = 'transfer_to_saved'
        description = 'Transferência para saldo guardado'
        break
      case 'transfer_from_saved':
        operation = 'transfer_from_saved'
        description = 'Transferência do saldo guardado'
        break
    }

    await this.logWalletHistory({
      userId: data.userId,
      walletId: wallet.id,
      operation,
      amount: data.amount,
      balanceAfter: newBalance,
      savedBalanceAfter: newSavedBalance,
      description: data.description || description,
      transactionId: transaction.id,
      metadata: {
        type: data.type,
        category: data.category,
      },
    })

    return transaction
  }

  /**
   * Get transactions
   */
  async getTransactionsByUserId(userId: string, limit = 100) {
    const wallet = await this.getWalletByUserId(userId)

    return await db.query.transactions.findMany({
      where: eq(transactions.walletId, wallet.id),
      orderBy: [desc(transactions.date), desc(transactions.createdAt)],
      limit,
    })
  }

  /**
   * Get wallet balance
   */
  async getBalance(userId: string) {
    const wallet = await this.getWalletByUserId(userId)
    
    return {
      balance: parseFloat(wallet.balance),
      savedBalance: parseFloat(wallet.savedBalance),
      total: parseFloat(wallet.balance) + parseFloat(wallet.savedBalance),
      showBalance: wallet.showBalance,
    }
  }

  /**
   * Transfer between balance and saved
   */
  async transferToSaved(userId: string, amount: number) {
    return await this.createTransaction({
      userId,
      walletId: '', // Will be fetched inside createTransaction
      type: 'transfer_to_saved',
      category: 'Transferência para Reserva',
      amount,
      description: 'Transferência do saldo principal para saldo guardado',
      date: new Date(),
    })
  }

  async transferFromSaved(userId: string, amount: number) {
    return await this.createTransaction({
      userId,
      walletId: '', // Will be fetched inside createTransaction
      type: 'transfer_from_saved',
      category: 'Transferência da Reserva',
      amount,
      description: 'Transferência do saldo guardado para saldo principal',
      date: new Date(),
    })
  }
}

export const walletService = new WalletService()
