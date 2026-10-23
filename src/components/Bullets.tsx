import { cn } from '../lib/cn'
import { RichText } from '../lib/RichText'
import type { Bullet } from '../types'

/** 圆点列表：label 会渲染成 "背景：" 这样的加粗前缀 */
export function Bullets({ items, className }: { items: Bullet[]; className?: string }) {
  return (
    <ul className={cn('mt-1.5 list-disc space-y-0.5 pl-4.5 marker:text-accent', className)}>
      {items.map((bullet, index) => (
        <li key={index}>
          {bullet.label && <strong className="font-semibold">{bullet.label}：</strong>}
          <RichText text={bullet.text} />
        </li>
      ))}
    </ul>
  )
}
