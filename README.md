# 可编辑简历网站（React + Vite + Tailwind）

在线地址：<https://superquail.github.io/resume/>

一个**能在浏览器里直接编辑**的程序员简历站点：左侧表单改内容，右侧实时预览，
自动保存到本地，可导出/导入 JSON，一键打印成 A4 PDF。

## 开发

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm typecheck
pnpm build
```

## 目录

```
src/
├─ App.tsx                  # 应用外壳：工具栏 + 编辑面板 + 预览
├─ hooks/useResumeStore.ts  # 状态 + localStorage 自动保存
├─ editor/                  # 编辑侧：字段、列表、各区块表单、工具栏
├─ preview/ResumePreview.tsx# 预览侧：把数据渲染成简历
├─ components/              # 简历排版组件（Header / Section / 条目卡片…）
├─ data/sampleResume.ts     # 示例内容（重置时恢复）
├─ lib/                     # cn / 富文本解析 / 列表操作 / id
└─ types.ts                 # 数据结构
```

行内语法：`**文字**` 加粗、`==文字==` 主色等宽高亮（适合放数字成果）。

## 部署

推送到 `main` 即自动构建发布（`.github/workflows/deploy.yml`）。Pages 源已是 GitHub Actions。
