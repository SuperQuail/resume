import { createId } from '../lib/id'
import type { WorkItem } from '../types'
import { BulletsEditor } from './BulletsEditor'
import { EditorSection } from './EditorSection'
import { Field } from './Field'
import { ListEditor } from './ListEditor'

interface WorkEditorProps {
  work: WorkItem[]
  onChange: (next: WorkItem[]) => void
}

export function WorkEditor({ work, onChange }: WorkEditorProps) {
  return (
    <EditorSection title="工作经验" badge={work.length + ' 段'}>
      <ListEditor
        items={work}
        onChange={onChange}
        createItem={() => ({
          id: createId('w'),
          company: '',
          position: '',
          team: '',
          period: '',
          bullets: [{ id: createId('b'), text: '' }],
        })}
        addLabel="添加工作经历"
        itemTitle={(item, index) => '经历 ' + (index + 1) + ' · ' + (item.company || '未填写')}
        renderItem={(item, { patch }) => (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Field label="公司" value={item.company} onChange={(company) => patch({ company })} />
              <Field label="职位" value={item.position} onChange={(position) => patch({ position })} />
            </div>
            <Field
              label="部门 / 补充说明"
              value={item.team ?? ''}
              placeholder="电商事业部 · 前端负责人（团队 6 人）"
              onChange={(team) => patch({ team })}
            />
            <Field
              label="时间"
              value={item.period}
              placeholder="2022.03 — 至今"
              onChange={(period) => patch({ period })}
            />
            <BulletsEditor
              bullets={item.bullets}
              onChange={(bullets) => patch({ bullets })}
              addLabel="添加要点"
            />
          </>
        )}
      />
    </EditorSection>
  )
}