import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { formatBullets, mergeBulletIds, parseBullets } from '../lib/bulletText'
import { markupTokenFor, wrapSelection } from '../lib/markup'
import type { Bullet } from '../types'

interface BulletsEditorProps {
  bullets: Bullet[]
  onChange: (next: Bullet[]) => void
  /** 项目经验里可以给每条加"背景 / 方案 / 结果"前缀 */
  withLabel?: boolean
}

const MAX_HEIGHT = 460

/**
 * 要点整段编辑：一个文本框一行一条，粘贴多行会自动按行拆开。
 * draft 是输入中的真值，外部变更（撤销 / 恢复 / 切换条目）才回灌。
 */
export function BulletsEditor({ bullets, onChange, withLabel = false }: BulletsEditorProps) {
  const [draft, setDraft] = useState(() => formatBullets(bullets, withLabel))
  const lastEmitted = useRef(draft)
  const textarea = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const next = formatBullets(bullets, withLabel)
    if (next === lastEmitted.current) return
    lastEmitted.current = next
    setDraft(next)
  }, [bullets, withLabel])

  useLayoutEffect(() => {
    const element = textarea.current
    if (!element) return
    element.style.height = 'auto'
    const next = Math.min(element.scrollHeight, MAX_HEIGHT)
    element.style.height = next + 'px'
    element.style.overflowY = element.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
  }, [draft])

  const handleChange = (raw: string) => {
    setDraft(raw)
    const next = mergeBulletIds(parseBullets(raw, withLabel), bullets)
    lastEmitted.current = formatBullets(next, withLabel)
    onChange(next)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing) return
    const token = markupTokenFor(event)
    if (!token) return
    event.preventDefault()
    wrapSelection(event.currentTarget, token)
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-muted">要点</span>
        <span className="text-[11px] text-muted/70">
          {withLabel ? '一行一条 · [前缀] 开头生效' : '一行一条 · 可直接粘贴多行'}
        </span>
      </div>
      <textarea
        ref={textarea}
        value={draft}
        rows={3}
        spellCheck={false}
        placeholder={
          withLabel
            ? '一行一条，可直接粘贴多行\n[背景] 单体应用 30 万行代码\n[方案] 按业务域拆分 8 个子应用'
            : '一行一条，可直接粘贴多行\n用 **加粗** 突出技术，用 ==数字== 突出成果'
        }
        onChange={(event) => handleChange(event.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full resize-none rounded-md border border-line bg-paper px-2.5 py-1.5 text-[13px] leading-relaxed outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"
      />
    </div>
  )
}
