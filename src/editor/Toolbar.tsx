import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Download, Printer, RotateCcw, Upload } from 'lucide-react'
import type { SaveState } from '../hooks/useResumeStore'
import type { Resume } from '../types'

export const ACCENTS = [
  { name: '蓝', value: '#0969da' },
  { name: '紫', value: '#8250df' },
  { name: '绿', value: '#1a7f37' },
  { name: '橙', value: '#bc4c00' },
  { name: '墨', value: '#24292f' },
]

const buttonClass =
  'inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs text-ink transition hover:border-accent/40 hover:bg-accent/5 hover:text-accent'

interface ToolbarProps {
  resume: Resume
  saveState: SaveState
  savedAt: number | null
  accent: string
  onAccent: (value: string) => void
  onImport: (next: Resume) => void
  onReset: () => void
}

export function Toolbar({ resume, saveState, savedAt, accent, onAccent, onImport, onReset }: ToolbarProps) {
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

  const handleReset = () => {
    if (window.confirm('确定要清空当前内容、恢复示例简历吗？此操作不可撤销。')) onReset()
  }

  return (
    <header className="no-print z-20 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-paper px-3 py-2.5 lg:px-4">
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-md bg-ink font-mono text-sm font-bold text-white">
          #
        </span>
        <span className="text-sm font-semibold">简历编辑器</span>
      </div>

      <span className="hidden items-center gap-1.5 text-xs text-muted sm:flex">
        <span className={'size-1.5 rounded-full ' + (saveState === 'saved' ? 'bg-green-500' : 'bg-amber-500')} />
        {saveState === 'saved'
          ? savedAt
            ? '已保存 ' + new Date(savedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
            : '尚未修改'
          : '保存中…'}
      </span>

      <div className="ml-auto flex items-center gap-2">
        <div className="mr-1 hidden items-center gap-1 sm:flex" title="主题色">
          {ACCENTS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-label={'主题色 ' + item.name}
              onClick={() => onAccent(item.value)}
              style={{ backgroundColor: item.value }}
              className={
                'size-4 rounded-full ring-offset-2 transition ' +
                (accent === item.value ? 'ring-2 ring-ink/60' : 'hover:scale-110')
              }
            />
          ))}
        </div>

        <button type="button" className={buttonClass} onClick={() => fileInput.current?.click()}>
          <Upload className="size-3.5" />
          导入
        </button>
        <button type="button" className={buttonClass} onClick={handleExport}>
          <Download className="size-3.5" />
          导出
        </button>
        <button type="button" className={buttonClass} onClick={() => window.print()}>
          <Printer className="size-3.5" />
          打印 / PDF
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={handleReset}
        >
          <RotateCcw className="size-3.5" />
          重置
        </button>

        <input ref={fileInput} type="file" accept="application/json,.json" className="hidden" onChange={handleFile} />
      </div>
    </header>
  )
}
