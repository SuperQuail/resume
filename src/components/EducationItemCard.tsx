import type { EducationItem } from '../types'
import { ItemHead } from './ItemHead'

export function EducationItemCard({ item }: { item: EducationItem }) {
  return (
    <article className="mt-5 break-inside-avoid first:mt-0">
      <ItemHead title={item.school} subtitle={item.detail} period={item.period} />
    </article>
  )
}
