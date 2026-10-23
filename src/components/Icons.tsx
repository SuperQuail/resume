import { Link2, Mail, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { IconName } from '../types'

/**
 * 图标统一用 lucide-react。
 * 例外：GitHub 是品牌图标，lucide 1.x 已移除品牌图标集，这里用内联 path 兜底。
 */
const LUCIDE_MAP: Record<Exclude<IconName, 'github'>, LucideIcon> = {
  phone: Phone,
  mail: Mail,
  link: Link2,
}

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  if (name === 'github') return <GithubMark className={className} />

  const IconComponent = LUCIDE_MAP[name]
  return <IconComponent className={className} strokeWidth={1.75} aria-hidden="true" />
}
