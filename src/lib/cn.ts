import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 类名合并工具：clsx 负责条件拼接，twMerge 负责消解 Tailwind 冲突。
 * 例如 cn('px-6', props.className) 在传入 'px-10' 时，最终只有 px-10 生效。
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
