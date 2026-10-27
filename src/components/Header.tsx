import { Fragment } from 'react'
import type { Basics } from '../types'
import { Icon } from './Icons'

/** 头部：左边姓名 / 职位 / 元信息，右边联系方式；全空时不占位（空白简历） */
export function Header({ basics }: { basics: Basics }) {
  const hasIdentity = Boolean(basics.name || basics.role || basics.meta.length || basics.contacts.length)
  if (!hasIdentity) return null

  return (
    <header className="flex flex-col gap-4 border-b-2 border-ink pb-6 md:flex-row md:items-start md:justify-between md:gap-6 print:flex-row print:items-start print:justify-between print:gap-6">
      <div>
        {basics.name && <h1 className="text-[28px] font-bold tracking-wide">{basics.name}</h1>}

        {basics.role && (
          <div className="mt-1 font-mono text-accent">
            <span className="text-muted">&gt; </span>
            {basics.role}
          </div>
        )}

        {basics.meta.length > 0 && (
          <div className="mt-2.5 flex flex-wrap items-center gap-y-1 text-[13px] text-muted">
            {basics.meta.map((item, index) => (
              <Fragment key={item}>
                {index > 0 && <span aria-hidden="true" className="mx-2.5 h-3 w-px shrink-0 bg-line" />}
                <span>{item}</span>
              </Fragment>
            ))}
          </div>
        )}
      </div>

      {basics.contacts.length > 0 && (
        <ul className="flex flex-col gap-1 text-[13px] md:items-end print:items-end">
          {basics.contacts.map((contact) => (
            <li key={contact.id} className="flex items-center gap-1.5 md:flex-row-reverse print:flex-row-reverse">
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
      )}
    </header>
  )
}
