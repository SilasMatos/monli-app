'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  UserIcon,
  Moon02Icon,
  Sun03Icon,
  Menu01Icon,
  Notification02Icon,
  Search01Icon,
  Settings02Icon
} from '@hugeicons/core-free-icons'
import { useTheme } from '@/contexts/theme-context'
import { useSidebar } from '@/contexts/sidebar-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
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

function UserMenu() {
  const router = useRouter()

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
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder-user.jpg" alt="@usuario" />
            <AvatarFallback className="text-foreground">JS</AvatarFallback>
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
          <HugeiconsIcon
            icon={UserIcon}
            size={16}
            color="currentColor"
            strokeWidth={1.5}
            className="mr-2"
          />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <HugeiconsIcon
            icon={Settings02Icon}
            size={16}
            color="currentColor"
            strokeWidth={1.5}
            className="mr-2"
          />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={e => e.preventDefault()}
              disabled={logoutMutation.isPending}
              className="text-red-600 focus:text-red-600"
            >
              <span>{logoutMutation.isPending ? 'Saindo...' : 'Sair'}</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar logout</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja sair da sua conta?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function AppHeader() {
  const { theme, toggleTheme } = useTheme()
  const { toggleSidebar } = useSidebar()

  return (
    <header className="border-b">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        <div className="flex flex-1 items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 rounded-lg hover:bg-sidebar-accent transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <HugeiconsIcon
              icon={Menu01Icon}
              size={20}
              color="currentColor"
              strokeWidth={1.5}
            />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-foreground">
              Automations
            </h1>
            <span className="px-2.5 py-1 text-xs font-medium bg-sidebar-accent text-sidebar-primary rounded-md border border-sidebar-border">
              Draft
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden lg:block">
            <HugeiconsIcon
              icon={Search01Icon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
              className="absolute left-2 top-2.5 text-foreground"
            />
            <Input placeholder="Buscar..." className="pl-8 w-64" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 rounded-lg hover:bg-sidebar-accent transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <HugeiconsIcon
              icon={Notification02Icon}
              size={20}
              color="currentColor"
              strokeWidth={2}
            />
          </Button>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg hover:bg-sidebar-accent transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
            title={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            <HugeiconsIcon
              icon={theme === 'dark' ? Sun03Icon : Moon02Icon}
              size={18}
              color="currentColor"
              strokeWidth={2}
            />
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  )
}
