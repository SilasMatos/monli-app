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

export default function Sidebar() {
  return (
    <aside className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 gap-8">
      {/* Logo */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center cursor-pointer hover:opacity-80 transition">
        <HugeiconsIcon
          icon={SparklesIcon}
          size={20}
          color="currentColor"
          strokeWidth={1.5}
        />
      </div>

      {/* Add Button */}
      <button className="w-10 h-10 rounded-lg bg-sidebar-accent hover:bg-primary hover:text-primary-foreground transition flex items-center justify-center text-sidebar-foreground">
        <HugeiconsIcon
          icon={AddCircleIcon}
          size={20}
          color="currentColor"
          strokeWidth={1.5}
        />
      </button>

      {/* Navigation Icons */}
      <nav className="flex flex-col gap-4 flex-1">
        <NavIcon icon={ZapIcon} active />
        <NavIcon icon={GridIcon} />
        <NavIcon icon={Mail01Icon} />
        <NavIcon icon={BarChartIcon} />
        <NavIcon icon={BookOpen01Icon} />
      </nav>

      {/* Settings */}
      <button className="w-10 h-10 rounded-lg hover:bg-sidebar-accent transition flex items-center justify-center text-sidebar-foreground hover:text-sidebar-primary-foreground">
        <HugeiconsIcon
          icon={Settings02Icon}
          size={20}
          color="currentColor"
          strokeWidth={1.5}
        />
      </button>
    </aside>
  )
}

function NavIcon({ icon, active = false }: { icon: any; active?: boolean }) {
  return (
    <button
      className={`w-10 h-10 rounded-lg transition flex items-center justify-center ${
        active
          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent'
      }`}
    >
      <HugeiconsIcon
        icon={icon}
        size={20}
        color="currentColor"
        strokeWidth={1.5}
      />
    </button>
  )
}
