import type { Resume } from '../types'

/** 空白简历：从零开始写时用，避免一条条删示例 */
export const emptyResume: Resume = {
  version: 1,
  basics: {
    name: '',
    role: '',
    meta: [],
    summary: '',
    contacts: [],
  },
  skills: [],
  work: [],
  projects: [],
  education: [],
}
