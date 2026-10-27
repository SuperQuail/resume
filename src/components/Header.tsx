import { Fragment } from 'react'
import type { Basics } from '../types'
import { Icon } from './Icons'

/** 头部：姓名 / 职位 / 元信息在左，联系方式在右；全空时不占位（空白简历） */
export function Header({ basics }: { basics: Basics }) {
  const hasIdentity = Boolean(basics.name || basics.role || basics.meta.length || basics.contacts.length)
  if (!hasIdentity) return null

  return (
    <header className="flex flex-col gap-4 border-b-2 border-ink pb-6 md:flex-row md:items-start md:justify-between md:gap-8 print:flex-row print:items-start print:justify-between print:gap-8">
      <div>
        {basics.name && <h1 className="text-[26px] font-bold tracking-wide">{basics.name}</h1>}

        {basics.role && <p className="mt-1 text-[14px] font-medium text-ink/70">{basics.role}</p>}

        {basics.meta.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-muted">
            {basics.meta.map((item, index) => (
              <Fragment key={item + index}>
                <span className="whitespace-nowrap">{item}</span>
              </Fragment>
            ))}
          </div>
        )}
      </div>

      {basics.contacts.length > 0 && (
        <ul className="flex flex-col gap-1 text-[13px] md:items-end print:items-end">
          {basics.contacts.map((contact) => (
            <li key={contact.id} className="flex items-center gap-2 md:flex-row-reverse print:flex-row-reverse">
              <Icon name={contact.icon} className="size-3.5 shrink-0 text-muted/70" />
              {contact.href ? (
                <a
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="text-ink transition hover:text-accent hover:underline"
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
