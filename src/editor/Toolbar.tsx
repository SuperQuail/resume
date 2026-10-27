import { useRef } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import {
  Download,
  History,
  MoreHorizontal,
  Printer,
  Redo2,
  RotateCcw,
  Trash2,
  Undo2,
  Upload,
} from 'lucide-react'
import type { SaveState, Snapshot } from '../hooks/useResumeStore'
import { cn } from '../lib/cn'
import type { Resume } from '../types'
import { Popover } from './Popover'

export const ACCENTS = [
  { name: '蓝', value: '#0969da' },
  { name: '紫', value: '#8250df' },
  { name: '绿', value: '#1a7f37' },
  { name: '橙', value: '#bc4c00' },
  { name: '墨', value: '#24292f' },
]

const menuItem =
  'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-ink transition hover:bg-canvas'

interface IconActionProps {
  icon: ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}

/** 幽灵图标按钮：不抢主按钮的视觉重量 */
function IconAction({ icon, label, onClick, disabled, active }: IconActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={cn(
        'grid size-8 place-items-center rounded-md text-muted transition hover:bg-canvas hover:text-ink',
        active && 'bg-canvas text-ink',
        disabled && 'cursor-not-allowed opacity-30 hover:bg-transparent hover:text-muted',
      )}
    >
      {icon}
    </button>
  )
}

function clockText(at: number): string {
  return new Date(at).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function snapshotText(at: number): string {
  const date = new Date(at)
  const time = clockText(at)
  if (date.toDateString() === new Date().toDateString()) return time
  return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }) + ' ' + time
}

interface ToolbarProps {
  resume: Resume
  saveState: SaveState
  savedAt: number | null
  accent: string
  snapshots: Snapshot[]
  canUndo: boolean
  canRedo: boolean
  onAccent: (value: string) => void
  onImport: (next: Resume) => void
  onReset: () => void
  onClear: () => void
  onUndo: () => void
  onRedo: () => void
  onRestoreSnapshot: (snapshot: Snapshot) => void
}

export function Toolbar({
  resume,
  saveState,
  savedAt,
  accent,
  snapshots,
  canUndo,
  canRedo,
  onAccent,
  onImport,
  onReset,
  onClear,
  onUndo,
  onRedo,
  onRestoreSnapshot,
}: ToolbarProps) {
  const fileInput = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = (resume.basics.name || 'resume') + '.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      const parsed = JSON.parse(await file.text()) as Resume
      if (!parsed || parsed.version !== 1 || !parsed.basics) throw new Error('bad shape')
      onImport(parsed)
    } catch {
      window.alert('导入失败：不是有效的简历 JSON 文件')
    }
  }

  return (
    <header className="no-print z-20 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-line bg-paper px-3 py-1.5 lg:px-4">
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-md bg-ink font-mono text-sm font-bold text-white">
          #
        </span>
        <span className="text-sm font-semibold">简历编辑器</span>
      </div>

      <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-muted sm:text-xs">
        <span className={cn('size-1.5 rounded-full', saveState === 'saved' ? 'bg-green-500' : 'bg-amber-500')} />
        {saveState === 'saved' ? (savedAt ? '已保存 ' + clockText(savedAt) : '尚未修改') : '保存中…'}
      </span>

      <div className="ml-auto flex items-center gap-0.5">
        <IconAction icon={<Undo2 className="size-4" />} label="撤销 (Ctrl+Z)" onClick={onUndo} disabled={!canUndo} />
        <IconAction
          icon={<Redo2 className="size-4" />}
          label="重做 (Ctrl+Shift+Z)"
          onClick={onRedo}
          disabled={!canRedo}
        />

        <span className="mx-1.5 h-5 w-px bg-line" />

        <Popover
          panelClassName="w-64"
          trigger={(open, toggle) => (
            <IconAction icon={<History className="size-4" />} label="历史版本" active={open} onClick={toggle} />
          )}
        >
          {(close) => (
            <div>
              <p className="px-2 py-1.5 text-[11px] text-muted">最近 {snapshots.length} 个版本 · 点一下恢复</p>
              <div className="max-h-72 overflow-y-auto">
                {snapshots.length === 0 ? (
                  <p className="px-2 py-3 text-xs leading-relaxed text-muted">
                    还没有历史版本，编辑一会儿后会自动留存（至少间隔 1 分钟，最多 20 个）。
                  </p>
                ) : (
                  [...snapshots].reverse().map((snapshot) => (
                    <button
                      key={snapshot.at}
                      type="button"
                      onClick={() => {
                        close()
                        onRestoreSnapshot(snapshot)
                      }}
                      className={cn(menuItem, 'gap-2')}
                    >
                      <span className="shrink-0 font-mono text-[11px] text-muted">
                        {snapshotText(snapshot.at)}
                      </span>
                      <span className="truncate">
                        {snapshot.resume.basics.name || '未命名'} · {snapshot.resume.basics.role || '空白简历'}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </Popover>

        <Popover
          panelClassName="w-44"
          trigger={(open, toggle) => (
            <button
              type="button"
              onClick={toggle}
              title="主题色"
              aria-label="主题色"
              className={cn(
                'grid size-8 place-items-center rounded-md transition hover:bg-canvas',
                open && 'bg-canvas',
              )}
            >
              <span
                className="size-3.5 rounded-full ring-2 ring-line ring-offset-2"
                style={{ backgroundColor: accent }}
              />
            </button>
          )}
        >
          {() => (
            <div className="p-1">
              <p className="px-1 pb-1.5 text-[11px] text-muted">主题色</p>
              <div className="flex items-center gap-2 px-1 pb-1">
                {ACCENTS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    aria-label={'主题色 ' + item.name}
                    onClick={() => onAccent(item.value)}
                    style={{ backgroundColor: item.value }}
                    className={cn(
                      'size-5 rounded-full ring-offset-2 transition',
                      accent === item.value ? 'ring-2 ring-ink/60' : 'hover:scale-110',
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </Popover>

        <Popover
          align="right"
          panelClassName="w-56"
          trigger={(open, toggle) => (
            <IconAction icon={<MoreHorizontal className="size-4" />} label="更多" active={open} onClick={toggle} />
          )}
        >
          {(close) => (
            <div>
              <button
                type="button"
                onClick={() => {
                  close()
                  fileInput.current?.click()
                }}
                className={menuItem}
              >
                <Upload className="size-3.5 text-muted" />
                导入 JSON
              </button>
              <button
                type="button"
                onClick={() => {
                  close()
                  handleExport()
                }}
                className={menuItem}
              >
                <Download className="size-3.5 text-muted" />
                导出 JSON
              </button>

              <div className="my-1 h-px bg-line" />

              <button
                type="button"
                onClick={() => {
                  close()
                  onReset()
                }}
                className={menuItem}
              >
                <RotateCcw className="size-3.5 text-muted" />
                恢复示例简历
              </button>
              <button
                type="button"
                onClick={() => {
                  close()
                  onClear()
                }}
                className={cn(menuItem, 'text-red-600 hover:bg-red-50')}
              >
                <Trash2 className="size-3.5" />
                清空为空白简历
              </button>
              <p className="px-2 pb-1 pt-1.5 text-[10px] leading-relaxed text-muted/80">以上操作都可以 Ctrl+Z 撤销</p>
            </div>
          )}
        </Popover>

        <button
          type="button"
          onClick={() => window.print()}
          className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
        >
          <Printer className="size-3.5" />
          <span className="hidden sm:inline">打印 / PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>

        <input ref={fileInput} type="file" accept="application/json,.json" className="hidden" onChange={handleFile} />
      </div>
    </header>
  )
}
