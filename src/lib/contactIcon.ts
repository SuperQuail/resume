import type { IconName } from '../types'

/** 联系方式图标按内容推断：只在用户没手动改过图标时自动跟随 */

const PHONE = /^\+?[\d\s()-]{6,}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function guessIcon(text: string): IconName {
  const value = text.trim()
  if (!value) return 'link'
  if (PHONE.test(value)) return 'phone'
  if (EMAIL.test(value)) return 'mail'
  if (/github\.com/i.test(value)) return 'github'
  return 'link'
}
