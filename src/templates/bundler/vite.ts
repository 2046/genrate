const lib = (ts?: boolean) => `import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, './src/index.${ts ? 'ts' : 'js'}'),
        formats: ['cjs', 'es'],
        name: 'Bundle',
        fileName: (format) => format === 'cjs' ? 'index.cjs.js' : format === 'es' ? 'index.esm.mjs' : ''
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
    plugins: [vue(), vueJsx()]
  }
})
`

const app = `import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.APP_PUBLIC_PATH,
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
`

export default {
  app,
  lib
}
