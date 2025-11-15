'use client'

import { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Search01Icon,
  GridIcon,
  AddCircleIcon,
  ArrowUpDownIcon,
  ArrowDown01Icon,
  ZapIcon,
  AlertCircleIcon,
  PlayIcon
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import AutomationTable from '@/features/dashboard/components/automation-table'

const automations = [
  {
    id: 1,
    name: 'Buzzing Your Inbox',
    icon: '⚡',
    description: 'Sends a welcome sequence to new subscribers',
    status: 'Draft',
    enrolledSubscribers: 0,
    completedSubscribers: 0,
    lastEdited: 'just now'
  },
  {
    id: 2,
    name: 'First Hello Flow',
    icon: '👋',
    description: 'A short email sequence to greet and guide ne...',
    status: 'Running',
    enrolledSubscribers: 76,
    completedSubscribers: 65,
    lastEdited: '2 minutes ago'
  },
  {
    id: 3,
    name: 'Welcome Journey 🚀',
    icon: '🚀',
    description: 'Full onboarding experience with delayed educ...',
    status: 'Running',
    enrolledSubscribers: 12,
    completedSubscribers: 16,
    lastEdited: '1 hours ago'
  },
  {
    id: 4,
    name: "You're In! 🎉",
    icon: '🎉',
    description: 'Instant welcome + next steps for newsletter r...',
    status: 'Draft',
    enrolledSubscribers: 0,
    completedSubscribers: 0,
    lastEdited: '25 minutes ago'
  },
  {
    id: 5,
    name: "Let's Get Started 👋",
    icon: '👋',
    description: 'Kicks off engagement with next-step guidance',
    status: 'Draft',
    enrolledSubscribers: 0,
    completedSubscribers: 0,
    lastEdited: '50 minutes ago'
  },
  {
    id: 6,
    name: 'Still With Us? 👀',
    icon: '👀',
    description: 'Re-engagement flow for inactive new subscri...',
    status: 'Paused',
    enrolledSubscribers: 42,
    completedSubscribers: 73,
    lastEdited: '25 minutes ago'
  },
  {
    id: 7,
    name: 'Next Steps & Tips 💡',
    icon: '💡',
    description: 'Sends helpful tips and links after initial welco...',
    status: 'Running',
    enrolledSubscribers: 89,
    completedSubscribers: 112,
    lastEdited: '1 day ago'
  }
]

const getStatusColor = (
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Running':
      return 'default'
    case 'Draft':
      return 'secondary'
    case 'Paused':
      return 'destructive'
    default:
      return 'outline'
  }
}

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'Running':
      return 'bg-emerald-500/10 text-emerald-400'
    case 'Draft':
      return 'bg-slate-500/10 text-slate-400'
    case 'Paused':
      return 'bg-red-500/10 text-red-400'
    default:
      return 'bg-slate-500/10 text-slate-400'
  }
}

export function AutomationsPage() {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="border-b border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <HugeiconsIcon
                icon={ZapIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Automations
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-muted-foreground"
            >
              Help
            </Button>
            <Button size="sm" variant="ghost" className="text-xs">
              Share & earn
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Craft seamless automated journeys for your newsletter subscribers.
          Need help getting started?{' '}
          <a href="#" className="text-primary hover:underline">
            Watch the tutorial
          </a>
        </p>
      </div>

      {/* Filters */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            className="gap-2 text-xs"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <HugeiconsIcon
              icon={ArrowUpDownIcon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
            />
            Sorted by creation date
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
            />
          </Button>
          <Button size="sm" variant="outline" className="gap-2 text-xs">
            All automations
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
            />
          </Button>
          <Button size="sm" variant="outline" className="gap-2 text-xs">
            <HugeiconsIcon
              icon={AlertCircleIcon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
            />
            Status
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
            />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <HugeiconsIcon
                icon={Search01Icon}
                size={16}
                color="currentColor"
                strokeWidth={1.5}
              />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button size="sm" variant="ghost">
            <HugeiconsIcon
              icon={GridIcon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
            />
          </Button>

          <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
            <HugeiconsIcon
              icon={AddCircleIcon}
              size={16}
              color="currentColor"
              strokeWidth={1.5}
            />
            Create New
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <AutomationTable automations={automations} />
      </div>

      {/* Pagination */}
      <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground">
        Showing 7 of 7 item
      </div>
    </div>
  )
}
