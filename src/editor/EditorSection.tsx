import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronRight, Crosshair } from 'lucide-react'
import { cn } from '../lib/cn'

interface EditorSectionProps {
  title: string
  badge?: string
  defaultOpen?: boolean
  /** 传入后在桌面端显示「在预览中定位」按钮 */
  onLocate?: () => void
  children: ReactNode
}

export function EditorSection({ title, badge, defaultOpen = true, onLocate, children }: EditorSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="rounded-xl border border-line bg-paper">
      <div className="flex items-center gap-1 pr-2">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-2 px-3.5 py-3 text-left"
        >
          <ChevronRight
            className={cn('size-3.5 shrink-0 text-muted transition-transform', open && 'rotate-90')}
            strokeWidth={2}
          />
          <span className="flex-1 truncate text-sm font-semibold">{title}</span>
          {badge && <span className="shrink-0 text-[11px] text-muted">{badge}</span>}
        </button>

        {onLocate && (
          <button
            type="button"
            onClick={onLocate}
            title="在预览中定位"
            aria-label="在预览中定位"
            className="hidden size-6 shrink-0 place-items-center rounded text-muted transition hover:bg-canvas hover:text-ink lg:grid"
          >
            <Crosshair className="size-3.5" />
          </button>
        )}
      </div>

      {open && <div className="space-y-3 border-t border-line px-3.5 py-3.5">{children}</div>}
    </section>
  )
}
