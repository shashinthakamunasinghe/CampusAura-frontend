import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'firebase';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'chart';
            }
            if (id.includes('react-icons')) {
              return 'icons';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
