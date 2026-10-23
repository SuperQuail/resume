import type { WorkItem } from '../types'
import { Bullets } from './Bullets'
import { ItemHead } from './ItemHead'

export function WorkItemCard({ item }: { item: WorkItem }) {
  return (
    <article className="mt-5 break-inside-avoid first:mt-0">
      <ItemHead title={item.company} subtitle={item.position} period={item.period} />
      {item.team && <div className="mt-0.5 text-[13px] text-muted">{item.team}</div>}
      <Bullets items={item.bullets} />
    </article>
  )
}
