import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'my-interactive-portfolio' with your GitHub repository name.
  base: '/my-interactive-portfolio/',
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
