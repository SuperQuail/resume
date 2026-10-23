/** 简历数据结构；所有条目都带 id，便于编辑时增删与排序 */

export type IconName = 'phone' | 'mail' | 'github' | 'link'

export interface Contact {
  id: string
  icon: IconName
  text: string
  href?: string
}

export interface Basics {
  name: string
  /** 职位，头部会以 "> " 前缀展示 */
  role: string
  /** 头部一行元信息，用 · 分隔 */
  meta: string[]
  /** 个人简介；支持 **加粗** 与 ==强调== */
  summary: string
  contacts: Contact[]
}

export interface SkillItem {
  id: string
  /** 掌握程度：熟练掌握 / 熟悉 / 了解 */
  lead: string
  /** 支持 **加粗** 与 ==强调== */
  text: string
}

export interface Bullet {
  id: string
  /** 可选前缀，如 背景 / 方案 / 结果 */
  label?: string
  /** 支持 **加粗** 与 ==强调== */
  text: string
}

export interface WorkItem {
  id: string
  company: string
  position: string
  /** 部门 / 汇报关系等补充信息 */
  team?: string
  period: string
  bullets: Bullet[]
}

export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectItem {
  id: string
  name: string
  role?: string
  link?: ProjectLink
  period: string
  stack: string[]
  bullets: Bullet[]
}

export interface EducationItem {
  id: string
  school: string
  /** 专业 · 学历 */
  detail?: string
  period: string
}

export interface Resume {
  /** 数据结构版本，方便以后做存储迁移 */
  version: 1
  basics: Basics
  skills: SkillItem[]
  work: WorkItem[]
  projects: ProjectItem[]
  education: EducationItem[]
}
