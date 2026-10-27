import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { cn } from '../lib/cn'
import { markupTokenFor, wrapSelection } from '../lib/markup'

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  multiline?: boolean
  rows?: number
  hint?: string
  className?: string
}

const inputClass =
  'w-full rounded-md border border-line bg-paper px-2.5 py-1.5 text-[13px] text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/15'

type FieldElement = HTMLInputElement | HTMLTextAreaElement

export function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
  rows = 3,
  hint,
  className,
}: FieldProps) {
  const handleKeyDown = (event: ReactKeyboardEvent<FieldElement>) => {
    if (event.nativeEvent.isComposing) return
    const token = markupTokenFor(event)
    if (!token) return
    event.preventDefault()
    wrapSelection(event.currentTarget, token)
  }

  return (
    <label className={cn('block', className)}>
      <span className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-muted">{label}</span>
        {hint && <span className="text-[11px] text-muted/70">{hint}</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(inputClass, 'resize-y leading-relaxed')}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          className={inputClass}
        />
      )}
    </label>
  )
}
