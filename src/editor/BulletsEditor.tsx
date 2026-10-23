import { Plus, X } from 'lucide-react'
import { createId } from '../lib/id'
import { patchAt, removeAt } from '../lib/list'
import type { Bullet } from '../types'
import { IconButton } from './IconButton'

interface BulletsEditorProps {
  bullets: Bullet[]
  onChange: (next: Bullet[]) => void
  /** 项目经验里可以给每条加"背景 / 方案 / 结果"前缀 */
  withLabel?: boolean
  addLabel?: string
}

export function BulletsEditor({ bullets, onChange, withLabel = false, addLabel = '添加一条' }: BulletsEditorProps) {
  return (
    <div className="space-y-2">
      <span className="text-xs font-medium text-muted">要点</span>

      {bullets.map((bullet, index) => (
        <div key={bullet.id} className="flex items-start gap-1.5">
          {withLabel && (
            <input
              type="text"
              value={bullet.label ?? ''}
              placeholder="前缀"
              onChange={(event) => onChange(patchAt(bullets, index, { label: event.target.value }))}
              className="w-14 shrink-0 rounded-md border border-line bg-paper px-2 py-1.5 text-[13px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          )}

          <textarea
            value={bullet.text}
            rows={2}
            placeholder="用 **加粗** 突出技术，用 ==数字== 突出成果"
            onChange={(event) => onChange(patchAt(bullets, index, { text: event.target.value }))}
            className="min-w-0 flex-1 resize-y rounded-md border border-line bg-paper px-2.5 py-1.5 text-[13px] leading-relaxed outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
          />

          <IconButton label="删除这条" danger onClick={() => onChange(removeAt(bullets, index))}>
            <X className="size-3.5" />
          </IconButton>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...bullets, { id: createId('b'), text: '' }])}
        className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
      >
        <Plus className="size-3.5" />
        {addLabel}
      </button>
    </div>
  )
}
