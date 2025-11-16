'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Zap,
  ArrowUpRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Eye,
  RefreshCw,
  Search,
  Filter,
  MoreHorizontal,
  CreditCard,
  Plane,
  Hotel,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Loader2,
  Wallet,
  Target,
  Calendar,
  AlertCircle,
  DollarSign,
  Receipt,
  PlayCircle,
  PauseCircle
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function DashboardPage() {
  const chartData = [
    { month: 'Jan', profit: 45, loss: 20 },
    { month: 'Feb', profit: 52, loss: 15 },
    { month: 'Mar', profit: 38, loss: 18 },
    { month: 'Apr', profit: 48, loss: 12 },
    { month: 'May', profit: 55, loss: 10 },
    { month: 'Jun', profit: 42, loss: 22 },
    { month: 'Jul', profit: 47, loss: 16 },
    { month: 'Aug', profit: 40, loss: 14 }
  ]

  const recentActivities = [
    {
      id: 'INV.050076',
      icon: ShoppingCart,
      activity: 'Mobile App Purchase',
      price: '$25,500',
      status: 'Completed',
      statusColor: 'text-emerald-500',
      date: '17 Apr, 2025 03:45 PM'
    },
    {
      id: 'INV.050075',
      icon: Hotel,
      activity: 'Hotel Booking',
      price: '$32,750',
      status: 'Pending',
      statusColor: 'text-orange-500',
      date: '15 Apr, 2026 11:30 AM'
    },
    {
      id: 'INV.050074',
      icon: Plane,
      activity: 'Flight Ticket Booking',
      price: '$40,200',
      status: 'Completed',
      statusColor: 'text-emerald-500',
      date: '15 Apr, 2025 12:00 PM'
    },
    {
      id: 'INV.050073',
      icon: ShoppingCart,
      activity: 'Grocery Purchase',
      price: '$50,200',
      status: 'In Progress',
      statusColor: 'text-yellow-500',
      date: '14 Apr, 2025 09:15 PM'
    }
  ]

  const subscriptions = [
    {
      id: 1,
      name: 'Netflix',
      amount: 39.9,
      nextBilling: '2025-12-01',
      status: 'active',
      icon: '🎬',
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Spotify',
      amount: 19.9,
      nextBilling: '2025-11-25',
      status: 'active',
      icon: '🎵',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Adobe Creative Cloud',
      amount: 54.9,
      nextBilling: '2025-12-10',
      status: 'active',
      icon: '🎨',
      color: 'bg-red-600'
    },
    {
      id: 4,
      name: 'GitHub',
      amount: 12.0,
      nextBilling: '2025-11-20',
      status: 'paused',
      icon: '💻',
      color: 'bg-zinc-800'
    }
  ]

  const budgets = [
    {
      id: 1,
      name: 'Alimentação',
      spent: 780,
      total: 1000,
      category: 'food',
      alertAt: 80,
      color: 'bg-orange-500'
    },
    {
      id: 2,
      name: 'Transporte',
      spent: 320,
      total: 500,
      category: 'transport',
      alertAt: 90,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Entretenimento',
      spent: 450,
      total: 600,
      category: 'entertainment',
      alertAt: 80,
      color: 'bg-purple-500'
    }
  ]

  const upcomingBills = [
    {
      id: 1,
      name: 'Netflix Premium',
      amount: 39.9,
      dueDate: '2025-12-01',
      daysLeft: 15,
      type: 'subscription'
    },
    {
      id: 2,
      name: 'Internet Banda Larga',
      amount: 89.9,
      dueDate: '2025-11-25',
      daysLeft: 9,
      type: 'utility'
    },
    {
      id: 3,
      name: 'Cartão Nubank',
      amount: 1250.0,
      dueDate: '2025-11-22',
      daysLeft: 6,
      type: 'credit_card'
    }
  ]

  return (
    <div className="min-h-screen ">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto  space-y-8"
      >
        {/* Header */}
        <motion.div variants={item} className="space-y-2">
          <h1 className="text-4xl font-bold">Good morning, Sajibur</h1>
          <p className="text-muted-foreground">
            Stay on top of your tasks, monitor progress, and track status.
          </p>
        </motion.div>

        {/* Top Section: Balance & Metrics */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column - Balance & Wallets */}
          <motion.div variants={item} className="space-y-6 lg:col-span-5">
            {/* Total Balance Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">$689,372.00</div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                      <TrendingUp className="h-3 w-3" />
                      <span>1.5%</span>
                      <span className="text-muted-foreground">
                        From last month
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <span>🇺🇸</span> USD
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 gap-2">
                    <Zap className="h-4 w-4" />
                    Transfer
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Request
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Wallets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Wallets | Total 8 wallets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>🇺🇸</span> USD
                    </div>
                    <div className="text-lg font-bold">$22,878.00</div>
                    <div className="text-xs text-emerald-500">+0.5% Active</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>🇪🇺</span> EUR
                    </div>
                    <div className="text-lg font-bold">€18,345.00</div>
                    <div className="text-xs text-emerald-500">+1.1% Active</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>🇬🇧</span> GBP
                    </div>
                    <div className="text-lg font-bold">£15,000.00</div>
                    <div className="text-xs text-destructive">
                      -0.3% Inactive
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Spending Limit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Monthly Spending Limit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={28} className="h-2" />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    $1,400.00 spent out of
                  </span>
                  <span className="font-medium">$5,500.00</span>
                </div>
              </CardContent>
            </Card>

            {/* My Cards */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    My Cards
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs">
                    + Add new
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* Black Card */}
                  <div className="relative aspect-[1.6/1] overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 text-white shadow-lg">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <CreditCard className="h-6 w-6" />
                        <div className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                          Active
                        </div>
                      </div>
                      <div>
                        <div className="text-xs opacity-70">•••• 8945</div>
                      </div>
                    </div>
                    <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
                  </div>

                  {/* Orange Card */}
                  <div className="relative aspect-[1.6/1] overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-4 text-white shadow-lg">
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <CreditCard className="h-6 w-6" />
                        <div className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                          Active
                        </div>
                      </div>
                      <div>
                        <div className="text-xs opacity-70">•••• 2847</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Metrics & Chart */}
          <motion.div variants={item} className="space-y-6 lg:col-span-7">
            {/* Metrics Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Total Earnings */}
              <Card className="border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium opacity-90">
                      Total Earnings
                    </CardTitle>
                    <Eye className="h-4 w-4 opacity-70" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$950</div>
                  <div className="mt-1 flex items-center gap-1 text-xs opacity-90">
                    <TrendingUp className="h-3 w-3" />
                    <span>7.5%</span>
                    <span>This month</span>
                  </div>
                </CardContent>
              </Card>

              {/* Total Spending */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Spending
                    </CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$700</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <TrendingDown className="h-3 w-3" />
                    <span>1.5%</span>
                    <span className="text-muted-foreground">This month</span>
                  </div>
                </CardContent>
              </Card>

              {/* Total Income */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Income
                    </CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$1,050</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>3.5%</span>
                    <span className="text-muted-foreground">This month</span>
                  </div>
                </CardContent>
              </Card>

              {/* Total Revenue */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$850</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>4.5%</span>
                    <span className="text-muted-foreground">This month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Total Income Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Total Income</CardTitle>
                    <CardDescription>
                      View your income in a certain period of time
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-orange-500" />
                      <span>Profit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-sm bg-zinc-900" />
                      <span>Loss</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-end justify-between gap-2">
                  {chartData.map((data, index) => (
                    <motion.div
                      key={data.month}
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex flex-1 flex-col justify-end gap-1"
                    >
                      <div className="flex flex-col gap-1">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.2,
                            duration: 0.4
                          }}
                          className="w-full origin-bottom rounded-t-md bg-orange-500"
                          style={{ height: `${data.profit}%` }}
                        />
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            duration: 0.4
                          }}
                          className="w-full origin-bottom rounded-b-md bg-zinc-900"
                          style={{ height: `${data.loss}%` }}
                        />
                      </div>
                      <div className="mt-2 text-center text-xs text-muted-foreground">
                        {data.month}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Subscriptions & Budgets Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Active Subscriptions */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-purple-500" />
                      Active Subscriptions
                    </CardTitle>
                    <CardDescription>
                      $
                      {subscriptions
                        .reduce(
                          (sum, sub) =>
                            sub.status === 'active' ? sum + sub.amount : sum,
                          0
                        )
                        .toFixed(2)}{' '}
                      monthly
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subscriptions.map((sub, index) => (
                    <motion.div
                      key={sub.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${sub.color} text-white text-xl`}
                        >
                          {sub.icon}
                        </div>
                        <div>
                          <div className="font-medium">{sub.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Next:{' '}
                            {new Date(sub.nextBilling).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${sub.amount}</div>
                        <div
                          className={`text-xs ${
                            sub.status === 'active'
                              ? 'text-emerald-500'
                              : 'text-orange-500'
                          }`}
                        >
                          {sub.status === 'active' ? (
                            <span className="flex items-center gap-1">
                              <PlayCircle className="h-3 w-3" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <PauseCircle className="h-3 w-3" />
                              Paused
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Budget Overview */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      Budget Overview
                    </CardTitle>
                    <CardDescription>Monthly spending limits</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgets.map((budget, index) => {
                    const percentage = (budget.spent / budget.total) * 100
                    const isOverAlert = percentage >= budget.alertAt

                    return (
                      <motion.div
                        key={budget.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{budget.name}</span>
                            {isOverAlert && (
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ${budget.spent} / ${budget.total}
                          </span>
                        </div>
                        <div className="relative">
                          <Progress
                            value={percentage}
                            className={`h-2 ${
                              isOverAlert ? '[&>div]:bg-orange-500' : ''
                            }`}
                          />
                          <div
                            className="absolute top-0 h-2 w-0.5 bg-red-500"
                            style={{ left: `${budget.alertAt}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{percentage.toFixed(1)}% used</span>
                          <span>
                            ${(budget.total - budget.spent).toFixed(2)} left
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Bills & Recent Transactions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Bills */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-500" />
                      Upcoming Bills
                    </CardTitle>
                    <CardDescription>Next 30 days</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingBills.map((bill, index) => (
                    <motion.div
                      key={bill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between rounded-lg border p-3 ${
                        bill.daysLeft <= 7
                          ? 'border-orange-500 bg-orange-500/5'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          {bill.type === 'subscription' && (
                            <PlayCircle className="h-5 w-5" />
                          )}
                          {bill.type === 'utility' && (
                            <Zap className="h-5 w-5" />
                          )}
                          {bill.type === 'credit_card' && (
                            <CreditCard className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{bill.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Due: {new Date(bill.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${bill.amount}</div>
                        <div
                          className={`text-xs ${
                            bill.daysLeft <= 7
                              ? 'text-orange-500 font-medium'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {bill.daysLeft} days left
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Credit Cards Summary */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-indigo-500" />
                      Credit Cards
                    </CardTitle>
                    <CardDescription>Available credit overview</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Nubank</span>
                      <span className="text-sm text-muted-foreground">
                        $3,500 / $5,000
                      </span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>70% used</span>
                      <span>$1,500 available</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Inter</span>
                      <span className="text-sm text-muted-foreground">
                        $1,200 / $3,000
                      </span>
                    </div>
                    <Progress value={40} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>40% used</span>
                      <span>$1,800 available</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">C6 Bank</span>
                      <span className="text-sm text-muted-foreground">
                        $450 / $2,000
                      </span>
                    </div>
                    <Progress value={22.5} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>22.5% used</span>
                      <span>$1,550 available</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-muted p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Total Available
                      </span>
                      <span className="text-lg font-bold text-emerald-500">
                        $4,850
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-violet-500" />
                    Recent Transactions
                  </CardTitle>
                  <CardDescription>Latest financial activities</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search" className="w-64 pl-9" />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-xs text-muted-foreground">
                      <th className="pb-3 text-left font-medium">Order ID</th>
                      <th className="pb-3 text-left font-medium">Activity</th>
                      <th className="pb-3 text-left font-medium">Price</th>
                      <th className="pb-3 text-left font-medium">Status</th>
                      <th className="pb-3 text-left font-medium">Date</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon
                      const StatusIcon =
                        activity.status === 'Completed'
                          ? CheckCircle2
                          : activity.status === 'Pending'
                          ? Clock
                          : Loader2

                      return (
                        <motion.tr
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b last:border-0"
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm font-medium">
                                {activity.id}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                                <Icon className="h-4 w-4 text-muted-foreground" />
                              </div>
                              <span className="text-sm">
                                {activity.activity}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-sm font-medium">
                              {activity.price}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <StatusIcon
                                className={`h-4 w-4 ${activity.statusColor}`}
                              />
                              <span
                                className={`text-sm ${activity.statusColor}`}
                              >
                                {activity.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-sm text-muted-foreground">
                              {activity.date}
                            </span>
                          </td>
                          <td className="py-4">
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
