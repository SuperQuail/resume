import type { ProjectItem } from '../types'
import { Bullets } from './Bullets'
import { ItemHead } from './ItemHead'

export function ProjectItemCard({ item }: { item: ProjectItem }) {
  const subtitle = (
    <>
      {item.role}
      {item.link && (
        <>
          {' · '}
          <a href={item.link.href} target="_blank" rel="noreferrer">
            {item.link.label}
          </a>
        </>
      )}
    </>
  )

  return (
    <article className="mt-5 break-inside-avoid first:mt-0">
      <ItemHead title={item.name} subtitle={subtitle} period={item.period} />
      {item.stack.length > 0 && (
        <div className="mt-0.5 text-[13px] text-muted">技术栈：{item.stack.join(' / ')}</div>
      )}
      <Bullets items={item.bullets} />
    </article>
  )
}
