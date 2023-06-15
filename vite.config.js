import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://api-tradetrek.onrender.com',
      '/public': 'https://api-tradetrek.onrender.com/'
    }
    // hello
  }
})
