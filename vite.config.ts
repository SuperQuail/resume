import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base 用相对路径：本地预览、根域名站、GitHub Pages 子路径（/resume/）都能直接跑
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
