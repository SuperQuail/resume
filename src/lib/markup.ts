/** 行内记号（**加粗** / ==高亮==）的快捷输入，作用于 input / textarea */

type Field = HTMLInputElement | HTMLTextAreaElement

export interface KeyLike {
  key: string
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  altKey: boolean
}

const TOKENS: Record<string, string> = { b: '**', h: '==' }

/** 命中快捷键时返回对应记号；输入法组合输入由调用方先挡掉 */
export function markupTokenFor(event: KeyLike): string | null {
  if (!(event.ctrlKey || event.metaKey)) return null
  if (event.altKey || event.shiftKey) return null
  return TOKENS[event.key.toLowerCase()] ?? null
}

/** 用原生 setter 回写并派发 input 事件，React 受控组件才会同步 */
function setNativeValue(field: Field, value: string) {
  const proto = field instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set
  if (!setter) return
  setter.call(field, value)
  field.dispatchEvent(new Event('input', { bubbles: true }))
}

/** 给选区包上记号；选区本身已带同一记号时取消（toggle） */
export function wrapSelection(field: Field, token: string): void {
  const value = field.value
  const start = field.selectionStart ?? value.length
  const end = field.selectionEnd ?? start
  const selected = value.slice(start, end)

  const wrapped = selected.length >= token.length * 2 && selected.startsWith(token) && selected.endsWith(token)
  const next = wrapped
    ? value.slice(0, start) + selected.slice(token.length, -token.length) + value.slice(end)
    : value.slice(0, start) + token + selected + token + value.slice(end)

  const selection: [number, number] = wrapped
    ? [start, end - token.length * 2]
    : [start + token.length, end + token.length]

  setNativeValue(field, next)
  window.requestAnimationFrame(() => {
    field.focus()
    field.setSelectionRange(selection[0], selection[1])
  })
}
