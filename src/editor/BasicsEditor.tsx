import { useState } from 'react'
import { ChevronDown, Plus, X } from 'lucide-react'
import { Icon } from '../components/Icons'
import { guessIcon } from '../lib/contactIcon'
import { createId } from '../lib/id'
import { insertAt, patchAt, removeAt, replaceAt } from '../lib/list'
import { locatePreview } from '../lib/previewLocate'
import { cn } from '../lib/cn'
import type { Contact, IconName, Resume } from '../types'
import { EditorSection } from './EditorSection'
import { Field } from './Field'
import { IconButton } from './IconButton'

const ICON_OPTIONS: { value: IconName; label: string }[] = [
  { value: 'phone', label: '电话' },
  { value: 'mail', label: '邮箱' },
  { value: 'github', label: 'GitHub' },
  { value: 'link', label: '链接' },
]

interface BasicsEditorProps {
  basics: Resume['basics']
  onChange: (basics: Resume['basics']) => void
}

export function BasicsEditor({ basics, onChange }: BasicsEditorProps) {
  const [openContact, setOpenContact] = useState<string | null>(null)

  const set = (patch: Partial<Resume['basics']>) => onChange({ ...basics, ...patch })
  const setContact = (index: number, patch: Partial<Contact>) =>
    set({ contacts: patchAt(basics.contacts, index, patch) })

  /** 图标跟着内容走，但用户手动改过之后就不再覆盖 */
  const setContactText = (index: number, text: string) => {
    const contact = basics.contacts[index]
    const auto = guessIcon(contact.text) === contact.icon
    setContact(index, { text, icon: auto ? guessIcon(text) : contact.icon })
  }

  const addContact = () => {
    const contact: Contact = { id: createId('c'), icon: 'link', text: '' }
    set({ contacts: insertAt(basics.contacts, basics.contacts.length, contact) })
    setOpenContact(contact.id)
  }

  return (
    <EditorSection title="基本信息" badge={basics.name} onLocate={() => locatePreview(null)}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Field label="姓名" value={basics.name} onChange={(name) => set({ name })} />
        <Field label="职位" value={basics.role} onChange={(role) => set({ role })} />
      </div>

      <div>
        <span className="mb-1 block text-xs font-medium text-muted">头部标签</span>
        <div className="space-y-1.5">
          {basics.meta.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <input
                type="text"
                value={item}
                placeholder="5 年经验"
                onChange={(event) => set({ meta: replaceAt(basics.meta, index, event.target.value) })}
                className="min-w-0 flex-1 rounded-md border border-line bg-paper px-2.5 py-1.5 text-[13px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
              <IconButton label="删除" danger onClick={() => set({ meta: removeAt(basics.meta, index) })}>
                <X className="size-3.5" />
              </IconButton>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set({ meta: insertAt(basics.meta, basics.meta.length, '') })}
            className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
          >
            <Plus className="size-3.5" />
            添加标签
          </button>
        </div>
      </div>

      <Field
        label="个人简介"
        value={basics.summary}
        multiline
        rows={4}
        hint="Ctrl+B 加粗 · Ctrl+H 高亮"
        onChange={(summary) => set({ summary })}
      />

      <div>
        <span className="mb-1 block text-xs font-medium text-muted">联系方式</span>
        <div className="space-y-1.5">
          {basics.contacts.map((contact, index) => {
            const open = openContact === contact.id

            return (
              <div key={contact.id} className="rounded-lg border border-line bg-paper">
                <div className="flex items-center gap-1 pr-1">
                  <button
                    type="button"
                    onClick={() => setOpenContact(open ? null : contact.id)}
                    aria-expanded={open}
                    className="flex min-w-0 flex-1 items-center gap-2 py-2 pl-2.5 pr-1 text-left"
                  >
                    <Icon name={contact.icon} className="size-3.5 shrink-0 text-muted" />
                    <span className={cn('min-w-0 truncate text-[13px]', contact.text ? 'text-ink' : 'text-muted/60')}>
                      {contact.text || '未填写'}
                    </span>
                    {!open && contact.href && (
                      <span className="shrink-0 rounded bg-canvas px-1 py-0.5 text-[10px] text-muted">链接</span>
                    )}
                    <ChevronDown
                      className={cn('ml-auto size-3.5 shrink-0 text-muted transition-transform', open && 'rotate-180')}
                    />
                  </button>
                  <IconButton label="删除" danger onClick={() => set({ contacts: removeAt(basics.contacts, index) })}>
                    <X className="size-3.5" />
                  </IconButton>
                </div>

                {open && (
                  <div className="space-y-2 border-t border-line px-2.5 py-2.5">
                    <label className="flex items-center gap-2 text-xs text-muted">
                      图标
                      <select
                        value={contact.icon}
                        onChange={(event) => setContact(index, { icon: event.target.value as IconName })}
                        className="rounded-md border border-line bg-paper px-1.5 py-1 text-[13px] text-ink outline-none focus:border-accent"
                      >
                        {ICON_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field label="显示文本" value={contact.text} onChange={(text) => setContactText(index, text)} />
                    <Field
                      label="链接（可选）"
                      value={contact.href ?? ''}
                      placeholder="mailto: / https://"
                      onChange={(href) => setContact(index, { href: href.trim() || undefined })}
                    />
                  </div>
                )}
              </div>
            )
          })}
          <button
            type="button"
            onClick={addContact}
            className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
          >
            <Plus className="size-3.5" />
            添加联系方式
          </button>
        </div>
      </div>
    </EditorSection>
  )
}
