'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  ZapIcon,
  AddCircleIcon,
  GridIcon,
  SparklesIcon,
  Mail01Icon,
  BarChartIcon,
  BookOpen01Icon,
  Settings02Icon
} from '@hugeicons/core-free-icons'
import { useSidebar } from '@/contexts/sidebar-context'

export default function Sidebar() {
  const { isExpanded } = useSidebar()

  return (
    <aside
      className={`${
        isExpanded ? 'w-64' : 'w-16'
      } bg-sidebar border-r border-sidebar-border flex flex-col py-6 gap-6 transition-all duration-300`}
    >
      <div className={`flex flex-col ${isExpanded ? 'px-4' : 'items-center'}`}>
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

        {/* Add Button */}
        <button
          className={`mt-6 h-10 rounded-lg bg-sidebar-accent hover:bg-sidebar-primary hover:text-sidebar-primary-foreground text-sidebar-foreground transition-colors flex items-center justify-center ${
            isExpanded ? 'w-full px-4 gap-3 justify-start' : 'w-10'
          }`}
        >
          <HugeiconsIcon
            icon={AddCircleIcon}
            size={20}
            color="currentColor"
            strokeWidth={1.5}
          />
          {isExpanded && (
            <span className="text-sm font-medium">Create New</span>
          )}
        </button>
      </div>

      {/* Navigation Icons */}
      <nav
        className={`flex flex-col gap-2 flex-1 ${
          isExpanded ? 'px-4' : 'items-center'
        }`}
      >
        <NavIcon
          icon={ZapIcon}
          label="Automations"
          active
          isExpanded={isExpanded}
        />
        <NavIcon icon={GridIcon} label="Dashboard" isExpanded={isExpanded} />
        <NavIcon icon={Mail01Icon} label="Messages" isExpanded={isExpanded} />
        <NavIcon
          icon={BarChartIcon}
          label="Analytics"
          isExpanded={isExpanded}
        />
        <NavIcon
          icon={BookOpen01Icon}
          label="Documentation"
          isExpanded={isExpanded}
        />
      </nav>

      <div className={isExpanded ? 'px-4' : 'flex justify-center'}>
        <button
          className={`h-10 rounded-lg hover:bg-sidebar-accent transition-colors flex items-center text-muted-foreground hover:text-sidebar-foreground ${
            isExpanded
              ? 'w-full px-4 gap-3 justify-start'
              : 'w-10 justify-center'
          }`}
        >
          <HugeiconsIcon
            icon={Settings02Icon}
            size={20}
            color="currentColor"
            strokeWidth={1.5}
          />
          {isExpanded && <span className="text-sm">Settings</span>}
        </button>
      </div>
    </aside>
  )
}

function NavIcon({
  icon,
  label,
  active = false,
  isExpanded
}: {
  icon: any
  label: string
  active?: boolean
  isExpanded: boolean
}) {
  return (
    <button
      className={`h-10 rounded-lg transition-colors flex items-center ${
        isExpanded ? 'w-full px-4 gap-3 justify-start' : 'w-10 justify-center'
      } ${
        active
          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
      }`}
    >
      <HugeiconsIcon
        icon={icon}
        size={20}
        color="currentColor"
        strokeWidth={1.5}
      />
      {isExpanded && <span className="text-sm">{label}</span>}
    </button>
  )
}
