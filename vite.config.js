import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static, client-only build. Deploy `dist/` to Cloudflare Pages.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
