import { useCallback, useEffect, useMemo, useState } from 'react'
import { emptyResume } from '../data/emptyResume'
import { sampleResume } from '../data/sampleResume'
import type { Resume } from '../types'

const STORAGE_KEY = 'resume-editor:resume:v1'
const SNAPSHOT_KEY = 'resume-editor:history:v1'

const HISTORY_LIMIT = 60
const SNAPSHOT_LIMIT = 20
/** 两次快照最短间隔：编辑十分钟大概留 10 个版本 */
const SNAPSHOT_GAP = 60_000
/** 快速打字合并成一次撤销步 */
const COALESCE_MS = 700
const SAVE_DELAY = 400

export type SaveState = 'saved' | 'saving'

export interface Snapshot {
  at: number
  resume: Resume
}

interface HistoryState {
  past: Resume[]
  present: Resume
  future: Resume[]
  lastPushAt: number
}

function isResume(value: unknown): value is Resume {
  const resume = value as Resume | null | undefined
  return Boolean(resume && resume.version === 1 && resume.basics)
}

function loadResume(): Resume {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return sampleResume
    const parsed: unknown = JSON.parse(raw)
    return isResume(parsed) ? parsed : sampleResume
  } catch {
    return sampleResume
  }
}

function loadSnapshots(): Snapshot[] {
  try {
    const raw = window.localStorage.getItem(SNAPSHOT_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item): item is Snapshot => {
        const snapshot = item as Snapshot | null
        return Boolean(snapshot && typeof snapshot.at === 'number' && isResume(snapshot.resume))
      })
      .slice(-SNAPSHOT_LIMIT)
  } catch {
    return []
  }
}

function persistSnapshots(snapshots: Snapshot[]) {
  try {
    window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots))
  } catch {
    // 空间不足：只留最近 5 个再试一次，仍失败就放弃（不影响编辑）
    try {
      window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots.slice(-5)))
    } catch {
      // 隐私模式 / 配额耗尽：静默失败
    }
  }
}

/** 简历状态：撤销栈 + localStorage 自动保存 + 历史快照（400ms 防抖） */
export function useResumeStore() {
  const [history, setHistory] = useState<HistoryState>(() => ({
    past: [],
    present: loadResume(),
    future: [],
    lastPushAt: 0,
  }))
  const [snapshots, setSnapshots] = useState<Snapshot[]>(loadSnapshots)
  const [saveState, setSaveState] = useState<SaveState>('saved')
  const [savedAt, setSavedAt] = useState<number | null>(null)

  const resume = history.present
  const sampleJson = useMemo(() => JSON.stringify(sampleResume), [])

  const update = useCallback((updater: (prev: Resume) => Resume) => {
    setHistory((state) => {
      const next = updater(state.present)
      if (next === state.present) return state

      const now = Date.now()
      const shouldPush = state.future.length > 0 || now - state.lastPushAt > COALESCE_MS
      return {
        past: shouldPush ? [...state.past, state.present].slice(-HISTORY_LIMIT) : state.past,
        present: next,
        future: [],
        lastPushAt: shouldPush ? now : state.lastPushAt,
      }
    })
  }, [])

  const replace = useCallback((next: Resume) => {
    setHistory((state) => {
      if (next === state.present) return state
      return {
        past: [...state.past, state.present].slice(-HISTORY_LIMIT),
        present: next,
        future: [],
        lastPushAt: Date.now(),
      }
    })
  }, [])

  const reset = useCallback(() => replace(sampleResume), [replace])
  const clear = useCallback(() => replace(emptyResume), [replace])

  const undo = useCallback(() => {
    setHistory((state) => {
      if (state.past.length === 0) return state
      return {
        past: state.past.slice(0, -1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future].slice(0, HISTORY_LIMIT),
        lastPushAt: 0,
      }
    })
  }, [])

  const redo = useCallback(() => {
    setHistory((state) => {
      if (state.future.length === 0) return state
      const [present, ...rest] = state.future
      return {
        past: [...state.past, state.present].slice(-HISTORY_LIMIT),
        present,
        future: rest,
        lastPushAt: 0,
      }
    })
  }, [])

  useEffect(() => {
    setSaveState('saving')
    const json = JSON.stringify(resume)

    const timer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY, json)
        setSavedAt(Date.now())
      } catch {
        // 隐私模式 / 空间不足：静默失败，不影响编辑
      }
      setSaveState('saved')

      setSnapshots((prev) => {
        const last = prev[prev.length - 1]
        const now = Date.now()
        // 首次打开示例内容不占快照位
        if (prev.length === 0 && json === sampleJson) return prev
        if (last && now - last.at < SNAPSHOT_GAP) return prev
        if (last && JSON.stringify(last.resume) === json) return prev
        return [...prev, { at: now, resume }].slice(-SNAPSHOT_LIMIT)
      })
    }, SAVE_DELAY)

    return () => window.clearTimeout(timer)
  }, [resume, sampleJson])

  useEffect(() => {
    persistSnapshots(snapshots)
  }, [snapshots])

  const restoreSnapshot = useCallback((snapshot: Snapshot) => replace(snapshot.resume), [replace])

  return {
    resume,
    update,
    replace,
    reset,
    clear,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    snapshots,
    restoreSnapshot,
    saveState,
    savedAt,
  }
}
