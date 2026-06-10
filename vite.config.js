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
        // Function form so react/jsx-runtime (and scheduler) land in `vendor`
        // with the rest of React. The object form missed jsx-runtime, which
        // then got grouped into the r3f chunk — and because r3f statically
        // imports three, the entry (every component uses JSX) ended up eagerly
        // loading both r3f and three on every page. Keeping React together in
        // vendor breaks that chain: three/r3f now load only on demand.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'vendor'
          if (id.includes('@react-three')) return 'r3f'
          if (id.includes('postprocessing')) return 'postprocessing'
          if (id.includes('ogl')) return 'ogl'
          if (/[\\/]three[\\/]/.test(id)) return 'three'
          if (id.includes('matter-js')) return 'physics'
        },
      },
    },
  },
})
