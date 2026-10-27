import type { Bullet } from '../types'
import { createId } from './id'

/** 要点整段编辑：多条要点 ↔ 一个 textarea 的行文本 */

export interface BulletLine {
  label?: string
  text: string
}

const LIST_MARKER = /^[-*•·]\s+/
const LABEL_PREFIX = /^\[([^\]\n]{1,6})\]\s*/

/** 数据结构 → 文本：一条一行，带前缀的写成 [背景] 正文 */
export function formatBullets(bullets: Bullet[], withLabel: boolean): string {
  return bullets
    .map((bullet) => (withLabel && bullet.label ? '[' + bullet.label + '] ' + bullet.text : bullet.text))
    .join('\n')
}

/** 文本 → 数据结构：按行拆，去掉空行与列表符号，可选解析 [前缀] */
export function parseBullets(raw: string, withLabel: boolean): BulletLine[] {
  const lines: BulletLine[] = []

  for (const source of raw.split(/\r?\n/)) {
    let text = source.trim().replace(LIST_MARKER, '')
    if (!text) continue

    let label: string | undefined
    if (withLabel) {
      const matched = LABEL_PREFIX.exec(text)
      if (matched) {
        label = matched[1].trim()
        text = text.slice(matched[0].length).trim()
      }
    }

    if (!text && !label) continue
    lines.push(label ? { label, text } : { text })
  }

  return lines
}

/** 按下标复用旧 id：避免每次输入都换一批 key，新增行才生成新 id */
export function mergeBulletIds(lines: BulletLine[], previous: Bullet[]): Bullet[] {
  return lines.map((line, index) => {
    const id = previous[index]?.id ?? createId('b')
    return line.label ? { id, label: line.label, text: line.text } : { id, text: line.text }
  })
}
