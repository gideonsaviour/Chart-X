import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the app under /Chart-X/; Vercel serves it from /.
  base: process.env.VERCEL ? '/' : '/Chart-X/'
})
