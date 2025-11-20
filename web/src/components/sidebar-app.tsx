'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Plus,
  CreditCard,
  Receipt,
  Target,
  User,
  Settings,
  PlayCircle
} from 'lucide-react'
import { useSidebar } from '@/contexts/sidebar-context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

const navigationItems = [
  {
    href: '/',
    icon: LayoutDashboard,
    label: 'Dashboard'
  },
  {
    href: '/transactions',
    icon: Receipt,
    label: 'Transactions'
  },
  {
    href: '/subscriptions',
    icon: PlayCircle,
    label: 'Subscriptions'
  },
  {
    href: '/budgets',
    icon: Target,
    label: 'Budgets'
  },
  {
    href: '/credit-cards',
    icon: CreditCard,
    label: 'Credit Cards'
  },
  {
    href: '/profile',
    icon: User,
    label: 'Profile'
  }
]

export default function Sidebar() {
  const { isExpanded } = useSidebar()
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <aside
        className={`${
          isExpanded ? 'w-64' : 'w-16'
        } bg-sidebar border-r border-sidebar-border flex flex-col py-6 gap-6 transition-all duration-300`}
      >
        <div
          className={`flex flex-col ${isExpanded ? 'px-4' : 'items-center'}`}
        >
          {/* Logo */}
          <div
            className={`flex items-center gap-3 ${
              isExpanded ? '' : 'justify-center'
            }`}
          >
            <div
              className="flex justify-center items-center
       "
            >
              <h1 className="font-medium italic text-sidebar-foreground">M</h1>
            </div>
            {isExpanded && (
              <span className="text-sidebar-foreground font-semibold text-lg whitespace-nowrap">
                Monli App
              </span>
            )}
          </div>
        </div>

        {/* Navigation Icons */}
        <nav
          className={`flex flex-col gap-2 flex-1 ${
            isExpanded ? 'px-4' : 'items-center'
          }`}
        >
          {navigationItems.map(item => (
            <NavIcon
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={
                pathname === item.href ||
                (pathname === '/' && item.href === '/')
              }
              isExpanded={isExpanded}
            />
          ))}
        </nav>

        <div className={isExpanded ? 'px-4' : 'flex justify-center'}>
          {isExpanded ? (
            <Link
              href="/settings"
              className="h-10 w-full rounded-lg hover:bg-sidebar-accent transition-colors flex items-center text-muted-foreground hover:text-sidebar-foreground px-4 gap-3 justify-start"
            >
              <Settings size={20} />
              <span className="text-sm">Settings</span>
            </Link>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="h-10 w-10 rounded-lg hover:bg-sidebar-accent transition-colors flex items-center justify-center text-muted-foreground hover:text-sidebar-foreground"
                >
                  <Settings size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}

function NavIcon({
  href,
  icon: Icon,
  label,
  active = false,
  isExpanded
}: {
  href: string
  icon: any
  label: string
  active?: boolean
  isExpanded: boolean
}) {
  const linkClassName = `h-10 rounded-lg transition-colors flex items-center ${
    isExpanded ? 'w-full px-4 gap-3 justify-start' : 'w-10 justify-center'
  } ${
    active
      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
  }`

  if (isExpanded) {
    return (
      <Link href={href} className={linkClassName}>
        <Icon size={20} />
        <span className="text-sm">{label}</span>
      </Link>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href} className={linkClassName}>
          <Icon size={20} />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
