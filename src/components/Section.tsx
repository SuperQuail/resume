import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface SectionProps {
  title: string
  children: ReactNode
  className?: string
}

/** 区块：标题 + 一条延伸到右边缘的细线 */
export function Section({ title, children, className }: SectionProps) {
  return (
    <section data-section={title} className={cn('mt-7 print:mt-5', className)}>
      <h2 className="mb-3 flex items-center gap-3 text-[16px] font-bold tracking-wide">
        <span>{title}</span>
        <span className="h-px flex-1 bg-line" />
      </h2>
      {children}
    </section>
  )
}
