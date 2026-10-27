import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { BasicsEditor } from './editor/BasicsEditor'
import { EducationEditor } from './editor/EducationEditor'
import { ProjectsEditor } from './editor/ProjectsEditor'
import { SkillsEditor } from './editor/SkillsEditor'
import { Toolbar, ACCENTS } from './editor/Toolbar'
import { WorkEditor } from './editor/WorkEditor'
import { useResumeStore } from './hooks/useResumeStore'
import { cn } from './lib/cn'
import { ResumePreview } from './preview/ResumePreview'

const ACCENT_KEY = 'resume-editor:accent:v1'

type View = 'edit' | 'preview'

export default function App() {
  const {
    resume,
    update,
    replace,
    reset,
    clear,
    undo,
    redo,
    canUndo,
    canRedo,
    snapshots,
    restoreSnapshot,
    saveState,
    savedAt,
  } = useResumeStore()

  const [accent, setAccent] = useState<string>(() => {
    try {
      return window.localStorage.getItem(ACCENT_KEY) ?? ACCENTS[0].value
    } catch {
      return ACCENTS[0].value
    }
  })

  const [view, setView] = useState<View>('edit')

  useEffect(() => {
    try {
      window.localStorage.setItem(ACCENT_KEY, accent)
    } catch {
      // 忽略隐私模式下的写入失败
    }
  }, [accent])

  // 标签页标题跟随姓名变化
  useEffect(() => {
    document.title = (resume.basics.name || '我的') + ' · 在线简历'
  }, [resume.basics.name])

  // 全局撤销 / 重做（输入框内也拦截，受控输入的原生撤销本就不可靠）
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.altKey) return
      const key = event.key.toLowerCase()

      if (key === 'z' && !event.shiftKey) {
        event.preventDefault()
        undo()
        return
      }

      if ((key === 'z' && event.shiftKey) || key === 'y') {
        event.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [undo, redo])

  return (
    <div className="app-shell flex h-dvh flex-col" style={{ '--color-accent': accent } as CSSProperties}>
      <Toolbar
        resume={resume}
        saveState={saveState}
        savedAt={savedAt}
        accent={accent}
        snapshots={snapshots}
        canUndo={canUndo}
        canRedo={canRedo}
        onAccent={setAccent}
        onImport={replace}
        onReset={reset}
        onClear={clear}
        onUndo={undo}
        onRedo={redo}
        onRestoreSnapshot={restoreSnapshot}
      />

      {/* 移动端：编辑 / 预览 切换 */}
      <div className="no-print flex gap-1 border-b border-line bg-paper px-3 py-1.5 lg:hidden">
        {(
          [
            { key: 'edit', label: '编辑' },
            { key: 'preview', label: '预览' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setView(tab.key)}
            className={cn(
              'flex-1 rounded-md py-1.5 text-xs transition',
              view === tab.key ? 'bg-ink text-white' : 'text-muted hover:bg-canvas',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="app-body flex min-h-0 flex-1 lg:grid lg:grid-cols-[400px_1fr]">
        <aside
          className={cn(
            'editor-pane min-h-0 overflow-y-auto bg-canvas p-3 lg:block lg:border-r lg:border-line',
            view === 'edit' ? 'block' : 'hidden',
          )}
        >
          <div className="space-y-3 pb-8">
            <BasicsEditor basics={resume.basics} onChange={(basics) => update((prev) => ({ ...prev, basics }))} />
            <SkillsEditor skills={resume.skills} onChange={(skills) => update((prev) => ({ ...prev, skills }))} />
            <WorkEditor work={resume.work} onChange={(work) => update((prev) => ({ ...prev, work }))} />
            <ProjectsEditor
              projects={resume.projects}
              onChange={(projects) => update((prev) => ({ ...prev, projects }))}
            />
            <EducationEditor
              education={resume.education}
              onChange={(education) => update((prev) => ({ ...prev, education }))}
            />
          </div>
        </aside>

        <main
          className={cn(
            'preview-pane min-h-0 overflow-y-auto bg-canvas lg:block',
            view === 'preview' ? 'block' : 'hidden',
          )}
        >
          <ResumePreview resume={resume} />
        </main>
      </div>
    </div>
  )
}
