import type { ReactNode } from 'react'
import { EducationItemCard } from '../components/EducationItemCard'
import { Header } from '../components/Header'
import { Page } from '../components/Page'
import { ProjectItemCard } from '../components/ProjectItemCard'
import { Section } from '../components/Section'
import { SkillList } from '../components/SkillList'
import { WorkItemCard } from '../components/WorkItemCard'
import { RichText } from '../lib/RichText'
import type { Resume } from '../types'

/** 预览区：完全复用排版组件，只受 state 驱动 */
export function ResumePreview({ resume }: { resume: Resume }) {
  const sections: { title: string; body: ReactNode }[] = [
    {
      title: '个人简介',
      body: (
        <p>
          <RichText text={resume.basics.summary} />
        </p>
      ),
    },
    { title: '专业技能', body: <SkillList skills={resume.skills} /> },
    {
      title: '工作经验',
      body: (
        <>
          {resume.work.map((item) => (
            <WorkItemCard key={item.id} item={item} />
          ))}
        </>
      ),
    },
    {
      title: '项目经验',
      body: (
        <>
          {resume.projects.map((item) => (
            <ProjectItemCard key={item.id} item={item} />
          ))}
        </>
      ),
    },
    {
      title: '教育经历',
      body: (
        <>
          {resume.education.map((item) => (
            <EducationItemCard key={item.id} item={item} />
          ))}
        </>
      ),
    },
  ]

  return (
    <div className="p-4 lg:p-8 print:p-0">
      <Page>
        <Header basics={resume.basics} />

        {sections
          .filter((section) => (section.title === '个人简介' ? resume.basics.summary.trim().length > 0 : hasContent(section.title, resume)))
          .map((section) => (
            <Section key={section.title} title={section.title}>
              {section.body}
            </Section>
          ))}

        <footer className="mt-8 text-center font-mono text-xs text-muted print:hidden">
          // 编辑内容会实时同步到这里 · Ctrl + P 导出 PDF
        </footer>
      </Page>
    </div>
  )
}

/** 空区块自动隐藏，避免简历里出现空标题 */
function hasContent(title: string, resume: Resume): boolean {
  switch (title) {
    case '专业技能':
      return resume.skills.length > 0
    case '工作经验':
      return resume.work.length > 0
    case '项目经验':
      return resume.projects.length > 0
    case '教育经历':
      return resume.education.length > 0
    default:
      return true
  }
}
