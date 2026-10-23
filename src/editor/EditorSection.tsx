import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

interface EditorSectionProps {
  title: string
  badge?: string
  defaultOpen?: boolean
  children: ReactNode
}

export function EditorSection({ title, badge, defaultOpen = true, children }: EditorSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="rounded-xl border border-line bg-paper">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-2 px-3.5 py-3 text-left"
      >
        <ChevronRight
          className={cn('size-3.5 shrink-0 text-muted transition-transform', open && 'rotate-90')}
          strokeWidth={2}
        />
        <span className="flex-1 text-sm font-semibold">{title}</span>
        {badge && <span className="text-[11px] text-muted">{badge}</span>}
      </button>

      {open && <div className="space-y-3 border-t border-line px-3.5 py-3.5">{children}</div>}
    </section>
  )
}
