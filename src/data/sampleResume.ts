import type { Resume } from '../types'

/** 示例简历：首次打开或点"重置"时使用。id 只是 React key / 排序用，随便改不影响展示 */
export const sampleResume: Resume = {
  version: 1,
  basics: {
    name: '张三',
    role: '高级前端工程师 / Full-Stack',
    meta: ['5 年经验', '本科 · 计算机科学', '上海', '随时到岗'],
    summary:
      '5 年 Web 开发经验，专注前端工程化与性能优化，具备 Node.js 服务端开发能力。主导过百万级 DAU 产品的架构升级，热衷开源，维护的组件库在 GitHub 获得 ==2k+== Star。',
    contacts: [
      { id: 'c-phone', icon: 'phone', text: '138-0000-0000' },
      { id: 'c-mail', icon: 'mail', text: 'example@mail.com', href: 'mailto:example@mail.com' },
      { id: 'c-gh', icon: 'github', text: 'github.com/username', href: 'https://github.com/username' },
      { id: 'c-blog', icon: 'link', text: 'blog.example.com', href: 'https://blog.example.com' },
    ],
  },

  skills: [
    {
      id: 's1',
      lead: '熟练掌握',
      text: '**TypeScript / JavaScript**，熟悉 ES6+ 新特性，了解 Go 并能编写简单服务。',
    },
    {
      id: 's2',
      lead: '熟练使用',
      text: '**React**、**Vue 3** 及其生态，熟悉 Next.js 服务端渲染，理解虚拟 DOM 与 Diff 原理。',
    },
    {
      id: 's3',
      lead: '熟悉',
      text: '前端工程化，能基于 **Vite / Webpack** 搭建项目脚手架，有 Monorepo 与微前端落地经验。',
    },
    {
      id: 's4',
      lead: '熟悉',
      text: '**Node.js**，能使用 NestJS 开发 BFF 层接口，熟悉 MySQL、Redis 的基本使用与优化。',
    },
    {
      id: 's5',
      lead: '熟悉',
      text: '前端性能优化与监控体系，能从加载、渲染、网络等维度定位并解决问题。',
    },
    { id: 's6', lead: '熟悉', text: 'Docker、CI/CD 流程，熟练使用 Git 进行团队协作。' },
  ],

  work: [
    {
      id: 'w1',
      company: '某某科技有限公司',
      position: '高级前端工程师',
      team: '电商事业部 · 前端负责人（团队 6 人）',
      period: '2022.03 — 至今',
      bullets: [
        { id: 'w1b1', text: '主导商城前端从 Webpack 迁移至 Vite，构建耗时降低 ==70%==。' },
        {
          id: 'w1b2',
          text: '搭建前端监控平台，覆盖错误、性能与行为埋点，线上故障平均发现时间缩短至 ==5 分钟==。',
        },
        {
          id: 'w1b3',
          text: '制定团队代码规范与 Code Review 流程，推动单测覆盖率从 ==12%== 提升到 ==65%==。',
        },
      ],
    },
    {
      id: 'w2',
      company: '某某网络公司',
      position: '前端工程师',
      team: 'SaaS 产品部',
      period: '2020.07 — 2022.02',
      bullets: [
        {
          id: 'w2b1',
          text: '负责 CRM 系统核心模块开发，封装表单 / 表格低代码组件，复用于 ==20+== 业务页面。',
        },
        { id: 'w2b2', text: '优化首屏加载，LCP 从 3.8s 降至 ==1.4s==。' },
      ],
    },
  ],

  projects: [
    {
      id: 'p1',
      name: '商城中台微前端改造',
      role: '技术负责人',
      period: '2023.05 — 2023.12',
      stack: ['qiankun', 'React 18', 'pnpm workspace'],
      bullets: [
        { id: 'p1b1', label: '背景', text: '单体应用 30 万行代码，多团队协作冲突频繁，发布需整体回归。' },
        { id: 'p1b2', label: '方案', text: '按业务域拆分 ==8== 个子应用，统一登录态、路由与公共依赖共享。' },
        {
          id: 'p1b3',
          label: '结果',
          text: '各团队独立发布，发布频率提升 ==3 倍==，回滚时间 < 1 分钟。',
        },
      ],
    },
    {
      id: 'p2',
      name: 'mini-ui 开源组件库',
      role: '作者',
      link: { label: 'GitHub', href: 'https://github.com/username/mini-ui' },
      period: '2021 — 至今',
      stack: ['Vue 3', 'TypeScript', 'Vitest'],
      bullets: [
        { id: 'p2b1', text: '轻量级移动端组件库，包含 40+ 组件，支持按需引入与主题定制。' },
        { id: 'p2b2', text: 'GitHub ==2.1k== Star，npm 周下载量 ==8k+==。' },
      ],
    },
  ],

  education: [
    {
      id: 'e1',
      school: '某某大学',
      detail: '计算机科学与技术 · 本科',
      period: '2016.09 — 2020.06',
    },
  ],
}
