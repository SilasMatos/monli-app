import type React from 'react'

export const ProgressBar = ({
  value,
  variant = 'default',
  className = ''
}: {
  value: number
  variant?: 'default' | 'destructive'
  className?: string
}) => (
  <div
    className={`h-2 w-full bg-secondary rounded-full overflow-hidden ${className}`}
  >
    <div
      className={`h-full transition-all ${
        variant === 'destructive' ? 'bg-destructive' : 'bg-primary'
      }`}
      style={{ width: `${value}%` }}
    />
  </div>
)

export const Badge = ({
  children,
  variant = 'default',
  className = ''
}: {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'warning'
  className?: string
}) => {
  const variants = {
    default: 'bg-primary/10 text-primary',
    destructive: 'bg-destructive/10 text-destructive',
    warning: 'bg-destructive/10 text-destructive'
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
