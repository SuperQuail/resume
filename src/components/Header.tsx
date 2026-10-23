import { Fragment } from 'react'
import type { Basics } from '../types'
import { Icon } from './Icons'

/** 头部：左边姓名 / 职位 / 元信息，右边联系方式 */
export function Header({ basics }: { basics: Basics }) {
  return (
    <header className="flex flex-col gap-4 border-b-2 border-ink pb-6 md:flex-row md:items-start md:justify-between md:gap-6 print:flex-row print:items-start print:justify-between print:gap-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-wide">{basics.name}</h1>

        <div className="mt-1 font-mono text-accent">
          <span className="text-muted">&gt; </span>
          {basics.role}
        </div>

        <div className="mt-2.5 text-[13px] text-muted">
          {basics.meta.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && <span className="px-1.5 text-line">·</span>}
              <span>{item}</span>
            </Fragment>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-1 text-[13px] md:items-end print:items-end">
        {basics.contacts.map((contact) => (
          <li key={contact.text} className="flex items-center gap-1.5 md:flex-row-reverse print:flex-row-reverse">
            <Icon name={contact.icon} className="size-3.5 shrink-0 text-muted" />
            {contact.href ? (
              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                {contact.text}
              </a>
            ) : (
              <span>{contact.text}</span>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}
