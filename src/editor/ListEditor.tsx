import type { ReactNode } from 'react'
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react'
import { insertAt, moveItem, patchAt, removeAt } from '../lib/list'
import { IconButton } from './IconButton'

interface ListEditorProps<T extends { id: string }> {
  items: T[]
  onChange: (next: T[]) => void
  createItem: () => T
  addLabel: string
  renderItem: (item: T, api: { patch: (patch: Partial<T>) => void }) => ReactNode
  itemTitle: (item: T, index: number) => string
}

/** 可增删、可上下移动的条目列表（工作 / 项目 / 教育 / 技能共用） */
export function ListEditor<T extends { id: string }>({
  items,
  onChange,
  createItem,
  addLabel,
  renderItem,
  itemTitle,
}: ListEditorProps<T>) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-lg border border-line bg-canvas/40 p-3">
          <div className="mb-2 flex items-center gap-1">
            <span className="flex-1 truncate text-xs font-medium text-muted">
              {itemTitle(item, index)}
            </span>
            <IconButton
              label="上移"
              disabled={index === 0}
              onClick={() => onChange(moveItem(items, index, index - 1))}
            >
              <ChevronUp className="size-3.5" />
            </IconButton>
            <IconButton
              label="下移"
              disabled={index === items.length - 1}
              onClick={() => onChange(moveItem(items, index, index + 1))}
            >
              <ChevronDown className="size-3.5" />
            </IconButton>
            <IconButton label="删除" danger onClick={() => onChange(removeAt(items, index))}>
              <X className="size-3.5" />
            </IconButton>
          </div>

          <div className="space-y-2">
            {renderItem(item, { patch: (patch) => onChange(patchAt(items, index, patch)) })}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange(insertAt(items, items.length, createItem()))}
        className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-line py-2 text-xs text-muted transition hover:border-accent/50 hover:bg-accent/5 hover:text-accent"
      >
        <Plus className="size-3.5" />
        {addLabel}
      </button>
    </div>
  )
}
