import { createId } from '../lib/id'
import { locatePreview } from '../lib/previewLocate'
import type { ProjectItem } from '../types'
import { BulletsEditor } from './BulletsEditor'
import { EditorSection } from './EditorSection'
import { Field } from './Field'
import { ListEditor } from './ListEditor'

/** 技术栈在编辑框里用 / 或 、 分隔，保存时自动拆成数组 */
function parseStack(value: string): string[] {
  return value
    .split(/[/、,，]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function ProjectsEditor({ projects, onChange }: { projects: ProjectItem[]; onChange: (next: ProjectItem[]) => void }) {
  return (
    <EditorSection title="项目经验" badge={projects.length + ' 个'} onLocate={() => locatePreview('项目经验')}>
      <ListEditor
        items={projects}
        onChange={onChange}
        createItem={() => ({
          id: createId('p'),
          name: '',
          role: '',
          period: '',
          stack: [],
          bullets: [{ id: createId('b'), label: '背景', text: '' }],
        })}
        addLabel="添加项目"
        itemTitle={(item, index) => '项目 ' + (index + 1) + ' · ' + (item.name || '未填写')}
        renderItem={(item, { patch }) => (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Field label="项目名称" value={item.name} onChange={(name) => patch({ name })} />
              <Field
                label="担任角色"
                value={item.role ?? ''}
                placeholder="技术负责人"
                onChange={(role) => patch({ role })}
              />
            </div>
            <Field
              label="时间"
              value={item.period}
              placeholder="2023.05 — 2023.12"
              onChange={(period) => patch({ period })}
            />
            <Field
              label="技术栈"
              value={item.stack.join(' / ')}
              placeholder="qiankun / React 18 / pnpm workspace"
              onChange={(value) => patch({ stack: parseStack(value) })}
            />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Field
                label="链接文字（可选）"
                value={item.link?.label ?? ''}
                placeholder="GitHub"
                onChange={(label) =>
                  patch({ link: label || item.link?.href ? { label, href: item.link?.href ?? '' } : undefined })
                }
              />
              <Field
                label="链接地址（可选）"
                value={item.link?.href ?? ''}
                placeholder="https://"
                onChange={(href) =>
                  patch({ link: href || item.link?.label ? { label: item.link?.label ?? '', href } : undefined })
                }
              />
            </div>
            <BulletsEditor bullets={item.bullets} onChange={(bullets) => patch({ bullets })} withLabel />
          </>
        )}
      />
    </EditorSection>
  )
}
