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
├─ editor/                  # 编辑侧：字段、列表、各区块表单、工具栏、弹层
├─ preview/ResumePreview.tsx# 预览侧：把数据渲染成简历
├─ components/              # 简历排版组件（Header / Section / 条目卡片…）
├─ data/sampleResume.ts     # 示例内容（重置时恢复）
├─ data/emptyResume.ts      # 空白简历（清空时使用）
├─ lib/                     # cn / 富文本 / 要点行转换 / 行内记号 / 图标推断 / 列表操作 / id
└─ types.ts                 # 数据结构
```

行内语法：`**文字**` 加粗、`==文字==` 主色等宽高亮（适合放数字成果）。

## 编辑小技巧

- **要点整段编辑**：一个框一行一条，可直接粘贴多行，空行自动忽略；项目要点用 `[背景]` `[方案]` `[结果]` 开头会变成前缀
- **快捷键**：选中文字后 `Ctrl/Cmd + B` 加粗、`Ctrl/Cmd + H` 高亮；`Ctrl/Cmd + Z` 撤销、`Ctrl/Cmd + Shift + Z` 重做（增删条目、导入、清空都可撤销）
- **历史版本**：工具栏「历史」自动留存最近 20 个版本（最短间隔 1 分钟），点一下即可恢复
- **两种起点**：「更多」菜单里可以清空成空白简历，也可以恢复示例内容
- **联系方式**折叠成一行，点开才编辑链接；图标会跟着内容自动识别

## 部署

推送到 `main` 即自动构建发布（`.github/workflows/deploy.yml`）。Pages 源已是 GitHub Actions。
