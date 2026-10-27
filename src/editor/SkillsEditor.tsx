import { createId } from '../lib/id'
import { locatePreview } from '../lib/previewLocate'
import type { SkillItem } from '../types'
import { EditorSection } from './EditorSection'
import { Field } from './Field'
import { ListEditor } from './ListEditor'

interface SkillsEditorProps {
  skills: SkillItem[]
  onChange: (next: SkillItem[]) => void
}

export function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  return (
    <EditorSection title="专业技能" badge={skills.length + ' 条'} defaultOpen={false} onLocate={() => locatePreview('专业技能')}>
      <ListEditor
        items={skills}
        onChange={onChange}
        createItem={() => ({ id: createId('s'), lead: '熟悉', text: '' })}
        addLabel="添加技能条目"
        itemTitle={(item, index) => '技能 ' + (index + 1) + ' · ' + (item.lead || '未填写')}
        renderItem={(item, { patch }) => (
          <>
            <Field
              label="掌握程度"
              value={item.lead}
              placeholder="熟练掌握 / 熟悉 / 了解"
              onChange={(lead) => patch({ lead })}
            />
            <Field
              label="描述"
              value={item.text}
              multiline
              rows={2}
              hint="Ctrl+B 加粗 · Ctrl+H 高亮"
              onChange={(text) => patch({ text })}
            />
          </>
        )}
      />
    </EditorSection>
  )
}
