import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface SectionProps {
  title: string
  children: ReactNode
  className?: string
}

/** 区块：`# 标题 ————` 的分隔线样式 */
export function Section({ title, children, className }: SectionProps) {
  return (
    <section className={cn('mt-7 print:mt-5', className)}>
      <h2 className="mb-3.5 flex items-center gap-2.5 font-mono text-[15px] font-semibold">
        <span className="text-accent">#</span>
        <span>{title}</span>
        <span className="h-px flex-1 bg-line" />
      </h2>
      {children}
    </section>
  )
}
