import { RichText } from '../lib/RichText'
import type { SkillItem } from '../types'

export function SkillList({ skills }: { skills: SkillItem[] }) {
  return (
    <ul className="list-disc space-y-1 pl-4.5 marker:text-muted/50">
      {skills.map((skill, index) => (
        <li key={index}>
          <span className="font-semibold">{skill.lead}</span> <RichText text={skill.text} />
        </li>
      ))}
    </ul>
  )
}
