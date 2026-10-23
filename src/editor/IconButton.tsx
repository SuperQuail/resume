import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface IconButtonProps {
  label: string
  onClick: () => void
  children: ReactNode
  danger?: boolean
  disabled?: boolean
  className?: string
}

export function IconButton({ label, onClick, children, danger, disabled, className }: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'grid size-6 place-items-center rounded text-muted transition hover:bg-canvas hover:text-ink disabled:cursor-not-allowed disabled:opacity-30',
        danger && 'hover:bg-red-50 hover:text-red-600',
        className,
      )}
    >
      {children}
    </button>
  )
}
