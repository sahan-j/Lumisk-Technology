import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber'],
          gfx: ['ogl', 'postprocessing'],
          physics: ['matter-js'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
