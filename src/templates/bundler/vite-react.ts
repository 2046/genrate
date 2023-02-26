const lib = (ts?: boolean) => `import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.${ts ? 'ts' : 'js'}'),
      name: 'Bundle',
      format: ['cjs', 'es'],
      fileName: (format) => format === 'cjs' ? 'index.cjs.js' : format === 'es' ? 'index.esm.mjs' : ''
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
`

const app = () => `import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode })=>{
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.APP_PUBLIC_PATH,
    plugins: [react()],
  }
})
`

export default {
  lib,
  app
}
