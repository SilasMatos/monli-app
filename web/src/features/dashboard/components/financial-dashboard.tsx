'use client'

import { useState, useId } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Bell,
  DollarSign,
  Home,
  LineChart,
  Plus,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  User,
  Wallet,
  Target,
  Calendar,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  BarChart3,
  Receipt,
  GlobeIcon,
  Sun,
  Moon
} from 'lucide-react'

const transactions = [
  {
    id: 1,
    description: 'Salário',
    amount: 5000,
    type: 'income',
    category: 'Trabalho',
    date: '2024-01-15'
  },
  {
    id: 2,
    description: 'Supermercado',
    amount: -250,
    type: 'expense',
    category: 'Alimentação',
    date: '2024-01-14'
  },
  {
    id: 3,
    description: 'Freelance',
    amount: 800,
    type: 'income',
    category: 'Trabalho',
    date: '2024-01-13'
  },
  {
    id: 4,
    description: 'Conta de Luz',
    amount: -120,
    type: 'expense',
    category: 'Utilidades',
    date: '2024-01-12'
  },
  {
    id: 5,
    description: 'Investimento',
    amount: -1000,
    type: 'investment',
    category: 'Poupança',
    date: '2024-01-11'
  },
  {
    id: 6,
    description: 'Aluguel',
    amount: -1200,
    type: 'expense',
    category: 'Moradia',
    date: '2024-01-10'
  },
  {
    id: 7,
    description: 'Dividendos',
    amount: 150,
    type: 'income',
    category: 'Investimentos',
    date: '2024-01-09'
  }
]

const goals = [
  {
    name: 'Fundo de Emergência',
    current: 8500,
    target: 15000,
    color: 'bg-blue-500'
  },
  { name: 'Viagem Europa', current: 3200, target: 8000, color: 'bg-green-500' },
  { name: 'Novo Carro', current: 12000, target: 25000, color: 'bg-purple-500' },
  {
    name: 'Casa Própria',
    current: 45000,
    target: 80000,
    color: 'bg-orange-500'
  }
]

// Navigation links com os links existentes do dashboard financeiro
const navigationLinks = [
  { href: '#', label: 'Dashboard', icon: Home, active: true },
  { href: '#', label: 'Transações', icon: Receipt },
  { href: '#', label: 'Investimentos', icon: LineChart },
  { href: '#', label: 'Metas', icon: Target },
  { href: '#', label: 'Orçamento', icon: PiggyBank }
]

// Language options
const languages = [
  { value: 'en', label: 'En' },
  { value: 'pt', label: 'Pt' },
  { value: 'es', label: 'Es' },
  { value: 'fr', label: 'Fr' }
]

// Logo component
function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Wallet className="w-4 h-4 text-primary-foreground" />
      </div>
      <span className="font-bold text-xl">Monli</span>
    </div>
  )
}

// Theme toggle component
function ThemeToggle() {
  return (
    <Button variant="ghost" size="icon" className="size-8">
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

// User menu component
function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="@usuario" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">João Silva</p>
            <p className="text-xs leading-none text-muted-foreground">
              joao@exemplo.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const id = useId()

  const handleNavClick = (label: string) => {
    setActiveTab(label.toLowerCase())
  }

  return (
    <div className="min-h-screen bg-background">
      {/* New Navbar Template */}
      <header className="border-b px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => {
                      const Icon = link.icon
                      return (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuLink
                            href={link.href}
                            onClick={() => handleNavClick(link.label)}
                            className="flex-row items-center gap-2 py-1.5"
                            active={activeTab === link.label.toLowerCase()}
                          >
                            <Icon
                              size={16}
                              className="text-muted-foreground"
                              aria-hidden="true"
                            />
                            <span>{link.label}</span>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-6">
              {/* Logo */}
              <a href="#" className="text-primary hover:text-primary/90">
                <Logo />
              </a>
              {/* Desktop navigation - icon only */}
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="gap-2">
                  <TooltipProvider>
                    {navigationLinks.map(link => (
                      <NavigationMenuItem key={link.label}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <NavigationMenuLink
                              href={link.href}
                              onClick={() => handleNavClick(link.label)}
                              className={`flex size-8 items-center justify-center p-1.5 ${
                                activeTab === link.label.toLowerCase()
                                  ? 'bg-accent text-accent-foreground'
                                  : ''
                              }`}
                            >
                              <link.icon size={20} aria-hidden="true" />
                              <span className="sr-only">{link.label}</span>
                            </NavigationMenuLink>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="px-2 py-1 text-xs"
                          >
                            <p>{link.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </NavigationMenuItem>
                    ))}
                  </TooltipProvider>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop only */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-8 w-64" />
            </div>

            {/* Add Transaction Button */}
            <Button size="sm" className="hidden sm:flex">
              <Plus className="mr-2 h-4 w-4" />
              Nova Transação
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="size-8">
              <Bell className="h-4 w-4" />
            </Button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Language selector */}
            <Select defaultValue="pt">
              <SelectTrigger
                id={`language-${id}`}
                className="[&>svg]:text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground h-8 border-none px-2 shadow-none [&>svg]:shrink-0"
                aria-label="Select language"
              >
                <GlobeIcon size={16} aria-hidden="true" />
                <SelectValue className="hidden sm:inline-flex" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <span className="flex items-center gap-2">
                      <span className="truncate">{lang.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* User menu */}
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl font-bold">Olá, João! 👋</h1>
                <p className="text-muted-foreground">
                  Aqui está um resumo das suas finanças hoje.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Saldo Total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    R$ 23.450,00
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> em relação ao
                    mês passado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Receitas
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    R$ 5.800,00
                  </div>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Despesas
                  </CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    R$ 2.370,00
                  </div>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Investimentos
                  </CardTitle>
                  <LineChart className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    R$ 15.200,00
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.2%</span> rendimento
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Overview Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Transações Recentes</CardTitle>
                  <CardDescription>
                    Suas últimas movimentações financeiras
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map(transaction => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === 'income'
                                ? 'bg-green-100 text-green-600'
                                : transaction.type === 'expense'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-blue-100 text-blue-600'
                            }`}
                          >
                            {transaction.type === 'income' ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : transaction.type === 'expense' ? (
                              <ArrowDownRight className="w-4 h-4" />
                            ) : (
                              <LineChart className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              transaction.amount > 0
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {transaction.amount > 0 ? '+' : ''}R${' '}
                            {Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Spending by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Gastos por Categoria</CardTitle>
                  <CardDescription>
                    Distribuição dos seus gastos este mês
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Alimentação</span>
                      </div>
                      <span className="text-sm font-medium">R$ 850</span>
                    </div>
                    <Progress value={35} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Transporte</span>
                      </div>
                      <span className="text-sm font-medium">R$ 420</span>
                    </div>
                    <Progress value={20} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Entretenimento</span>
                      </div>
                      <span className="text-sm font-medium">R$ 320</span>
                    </div>
                    <Progress value={15} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Utilidades</span>
                      </div>
                      <span className="text-sm font-medium">R$ 280</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Transações Tab */}
        {activeTab === 'transações' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl font-bold">Transações</h1>
                <p className="text-muted-foreground">
                  Histórico completo de movimentações
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Período
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {transactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className={`flex items-center justify-between p-4 ${
                        index !== transactions.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-600'
                              : transaction.type === 'expense'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="w-5 h-5" />
                          ) : transaction.type === 'expense' ? (
                            <ArrowDownRight className="w-5 h-5" />
                          ) : (
                            <LineChart className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">
                              {transaction.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-medium ${
                            transaction.amount > 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.amount > 0 ? '+' : ''}R${' '}
                          {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Investimentos Tab */}
        {activeTab === 'investimentos' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Investimentos</h1>
              <p className="text-muted-foreground">
                Acompanhe seus investimentos e rendimentos
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Tesouro Direto
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-blue-600">
                      R$ 8.500,00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-green-600">+5.2%</span> este mês
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Ações
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-green-600">
                      R$ 4.200,00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-green-600">+12.8%</span> este mês
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Fundos
                    <PiggyBank className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-purple-600">
                      R$ 2.500,00
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-green-600">+3.1%</span> este mês
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Metas Tab */}
        {activeTab === 'metas' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl font-bold">Metas Financeiras</h1>
                <p className="text-muted-foreground">
                  Acompanhe o progresso dos seus objetivos
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Meta
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {goal.name}
                      <Target className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>R$ {goal.current.toLocaleString()}</span>
                        <span>R$ {goal.target.toLocaleString()}</span>
                      </div>
                      <Progress
                        value={(goal.current / goal.target) * 100}
                        className="h-3"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          {Math.round((goal.current / goal.target) * 100)}%
                          concluído
                        </span>
                        <span>
                          Faltam R${' '}
                          {(goal.target - goal.current).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orçamento Tab */}
        {activeTab === 'orçamento' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Orçamento Mensal</h1>
              <p className="text-muted-foreground">
                Controle seus gastos por categoria
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alimentação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>R$ 850 / R$ 1.200</span>
                      <span>71%</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>R$ 420 / R$ 600</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Entretenimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>R$ 320 / R$ 400</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Utilidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>R$ 280 / R$ 500</span>
                      <span>56%</span>
                    </div>
                    <Progress value={56} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Moradia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>R$ 1.200 / R$ 1.500</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saúde</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>R$ 180 / R$ 300</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
