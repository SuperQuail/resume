import type { ReactNode } from 'react'

interface ItemHeadProps {
  title: string
  subtitle?: ReactNode
  period: string
}

/** 条目抬头：左侧标题（+ 副标题），右侧等宽日期 */
export function ItemHead({ title, subtitle, period }: ItemHeadProps) {
  return (
    <div className="flex flex-col gap-x-3 md:flex-row md:items-baseline md:justify-between print:flex-row print:items-baseline print:justify-between">
      <div className="text-[15px] font-bold">
        {title}
        {subtitle && (
          <span className="ml-2 text-[13px] font-normal text-muted">{subtitle}</span>
        )}
      </div>
      <span className="whitespace-nowrap font-mono text-xs text-muted">{period}</span>
    </div>
  )
}
