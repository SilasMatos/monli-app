'use client'

import { useId } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useTranslations } from 'next-intl'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLogout } from '@/hooks/use-mutation'
import { toast } from 'sonner'

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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Bell,
  Home,
  LineChart,
  Search,
  Settings,
  User,
  Wallet,
  Target,
  PiggyBank,
  Receipt,
  LogOut
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { CircleAlert } from 'lucide-react'

const navigationLinks = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/transactions', label: 'Transações', icon: Receipt },
  { href: '/investments', label: 'Investimentos', icon: LineChart },
  { href: '/goals', label: 'Metas', icon: Target },
  { href: '/budget', label: 'Orçamento', icon: PiggyBank }
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

function UserMenu() {
  const router = useRouter()
  const t = useTranslations('user')

  const logoutMutation = useLogout({
    onSuccess: () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.clear()

      toast.success('Logout realizado com sucesso!')

      router.push('/login')
    },
    onError: (error: any) => {
      console.error('Erro no logout:', error)
      toast.error('Erro ao fazer logout. Redirecionando mesmo assim...')

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.clear()
      router.push('/login')
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

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
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>{t('profile')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>{t('settings')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={e => e.preventDefault()}
              disabled={logoutMutation.isPending}
              className="text-white focus:text-red-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>
                {logoutMutation.isPending ? t('loggingOut') : t('logout')}
              </span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-full border dark:border-gray-800 dark:bg-black bg-gray-300"
                aria-hidden="true"
              >
                <CircleAlert className="text-gray-400 " size={18} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('logoutConfirm')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('logoutDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {logoutMutation.isPending ? t('loggingOut') : t('logout')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const id = useId()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('navbar')

  const handleNavClick = (href: string) => {
    router.push(href)
  }

  return (
    <header className="border-b">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
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
                            onClick={() => handleNavClick(link.href)}
                            className="flex-row items-center gap-2 py-1.5"
                            active={pathname === link.href}
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
              <a href="/" className="text-primary hover:text-primary/90">
                <Logo />
              </a>
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList className="gap-2">
                  <TooltipProvider>
                    {navigationLinks.map(link => (
                      <NavigationMenuItem key={link.label}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <NavigationMenuLink
                              href={link.href}
                              onClick={() => handleNavClick(link.href)}
                              className={`flex size-8 items-center justify-center p-1.5 ${
                                pathname === link.href
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

          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('search')} className="pl-8 w-64" />
            </div>

            <Button variant="ghost" size="icon" className="size-8">
              <Bell className="h-4 w-4" />
            </Button>

            {/* Theme toggle */}
            <ThemeToggle />

            <LanguageSwitcher />

            {/* User menu */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
