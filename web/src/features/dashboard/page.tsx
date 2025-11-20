'use client'

import type React from 'react'
import { WalletCard } from './components/wallet-card'
import { BudgetCard } from './components/budget-card'
import { SubscriptionsCard } from './components/subscriptions-card'
import { CreditCardsCard } from './components/credit-cards-card'
import { TransactionsCard } from './components/transactions-card'

// --- MOCKED DATA (From your JSON) ---
const API_DATA = {
  dashboardData: {
    wallet: {
      endpoint: 'GET /wallet/balance',
      data: {
        currency: 'BRL',
        availableBalance: 3450.5,
        savedBalance: 12000.0,
        totalNetWorth: 15450.5
      }
    },
    budgetSummary: {
      endpoint: 'GET /budgets/summary',
      data: {
        totalBudgeted: 4000.0,
        totalSpent: 2850.0,
        spendingPercentage: 71.25,
        status: 'warning',
        activeBudgetsCount: 4,
        alertsTriggered: 1
      }
    },
    creditCards: {
      endpoint: 'GET /credit-cards',
      data: [
        {
          id: 'card-uuid-01',
          name: 'Nubank',
          brand: 'Mastercard',
          color: '#8A05BE',
          lastFourDigits: '1234',
          closingDay: 10,
          dueDay: 17,
          creditInfo: {
            limit: 5000.0,
            used: 1250.0,
            available: 3750.0
          }
        },
        {
          id: 'card-uuid-02',
          name: 'Inter Black',
          brand: 'Visa',
          color: '#FF7A00',
          lastFourDigits: '9876',
          closingDay: 5,
          dueDay: 12,
          creditInfo: {
            limit: 15000.0,
            used: 430.0,
            available: 14570.0
          }
        }
      ]
    },
    subscriptions: {
      monthlyTotal: {
        endpoint: 'GET /subscriptions/monthly-total',
        value: 189.7,
        currency: 'BRL'
      },
      upcoming: {
        endpoint: 'GET /subscriptions/upcoming?days=7',
        data: [
          {
            id: 'sub-01',
            name: 'Netflix',
            amount: 39.9,
            nextBillingDate: '2025-11-20T00:00:00Z',
            daysRemaining: 2,
            icon: 'netflix',
            color: '#E50914'
          },
          {
            id: 'sub-02',
            name: 'Spotify',
            amount: 21.9,
            nextBillingDate: '2025-11-22T00:00:00Z',
            daysRemaining: 4,
            icon: 'spotify',
            color: '#1DB954'
          }
        ]
      }
    },
    recentTransactions: {
      endpoint: 'GET /transactions?limit=5',
      data: [
        {
          id: 'tx-101',
          type: 'expense',
          category: 'Supermercado',
          description: 'Compras da Semana',
          amount: 450.2,
          date: '2025-11-18T14:30:00Z',
          paymentMethod: 'Debit Card'
        },
        {
          id: 'tx-102',
          type: 'income',
          category: 'Freelance',
          description: 'Projeto Web',
          amount: 1200.0,
          date: '2025-11-17T10:00:00Z',
          paymentMethod: 'Bank Transfer'
        },
        {
          id: 'tx-103',
          type: 'expense',
          category: 'Transporte',
          description: 'Uber',
          amount: 24.9,
          date: '2025-11-16T18:45:00Z',
          paymentMethod: 'Credit Card'
        }
      ]
    }
  }
}

// --- MAIN DASHBOARD ---

export function DashboardPage() {
  const { dashboardData } = API_DATA
  const {
    wallet,
    budgetSummary,
    creditCards,
    subscriptions,
    recentTransactions
  } = dashboardData

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Olá, Silas Matos
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overview do Sistema • {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <span className="font-semibold text-sm text-primary-foreground">
              USR
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <WalletCard data={wallet.data} />

        <BudgetCard
          data={{
            ...budgetSummary.data,
            status: budgetSummary.data.status as 'warning' | 'normal'
          }}
        />

        <SubscriptionsCard
          data={{
            monthlyTotal: subscriptions.monthlyTotal.value,
            upcoming: subscriptions.upcoming.data
          }}
        />

        <CreditCardsCard cards={creditCards.data} />

        <TransactionsCard transactions={recentTransactions.data as any} />
      </div>
    </div>
  )
}
