import { createId } from '../lib/id'
import { locatePreview } from '../lib/previewLocate'
import type { EducationItem } from '../types'
import { EditorSection } from './EditorSection'
import { Field } from './Field'
import { ListEditor } from './ListEditor'

interface EducationEditorProps {
  education: EducationItem[]
  onChange: (next: EducationItem[]) => void
}

export function EducationEditor({ education, onChange }: EducationEditorProps) {
  return (
    <EditorSection title="教育经历" badge={education.length + ' 条'} defaultOpen={false} onLocate={() => locatePreview('教育经历')}>
      <ListEditor
        items={education}
        onChange={onChange}
        createItem={() => ({ id: createId('e'), school: '', detail: '', period: '' })}
        addLabel="添加教育经历"
        itemTitle={(item, index) => '学校 ' + (index + 1) + ' · ' + (item.school || '未填写')}
        renderItem={(item, { patch }) => (
          <>
            <Field label="学校" value={item.school} onChange={(school) => patch({ school })} />
            <Field
              label="专业 · 学历"
              value={item.detail ?? ''}
              placeholder="计算机科学与技术 · 本科"
              onChange={(detail) => patch({ detail })}
            />
            <Field
              label="时间"
              value={item.period}
              placeholder="2016.09 — 2020.06"
              onChange={(period) => patch({ period })}
            />
          </>
        )}
      />
    </EditorSection>
  )
}
