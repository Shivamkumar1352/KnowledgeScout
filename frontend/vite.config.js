import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy any request starting with /api to your backend
      '/api': {
        target: 'https://knowledge-backend.onrender.com',
        changeOrigin: true,
        secure: true, // if using https
      },
    },
  },
})
