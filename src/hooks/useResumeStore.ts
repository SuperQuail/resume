import { useCallback, useEffect, useRef, useState } from 'react'
import { sampleResume } from '../data/sampleResume'
import type { Resume } from '../types'

const STORAGE_KEY = 'resume-editor:resume:v1'

export type SaveState = 'saved' | 'saving'

function loadResume(): Resume {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return sampleResume
    const parsed = JSON.parse(raw) as Resume
    if (!parsed || parsed.version !== 1 || !parsed.basics) return sampleResume
    return parsed
  } catch {
    return sampleResume
  }
}

/** 简历状态 + localStorage 自动保存（400ms 防抖） */
export function useResumeStore() {
  const [resume, setResume] = useState<Resume>(loadResume)
  const [saveState, setSaveState] = useState<SaveState>('saved')
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    setSaveState('saving')
    if (timer.current !== null) window.clearTimeout(timer.current)

    timer.current = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resume))
        setSavedAt(Date.now())
      } catch {
        // 隐私模式 / 空间不足时静默失败，不影响编辑
      }
      setSaveState('saved')
    }, 400)

    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [resume])

  const update = useCallback((updater: (prev: Resume) => Resume) => setResume(updater), [])
  const replace = useCallback((next: Resume) => setResume(next), [])
  const reset = useCallback(() => setResume(sampleResume), [])

  return { resume, update, replace, reset, saveState, savedAt }
}
