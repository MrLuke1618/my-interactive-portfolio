import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// FIX: Import 'process' from 'node:process' to use the correct Node.js types
// and avoid conflicts with client-side ambient declarations.
import process from 'node:process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    // IMPORTANT: Replace 'my-interactive-portfolio' with your GitHub repository name.
    base: '/my-interactive-portfolio/',
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
  }
})