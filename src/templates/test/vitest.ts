export default function (ts?: boolean) {
  return `import { mergeConfig } from 'vite'
import viteConfig from './vite.config'
import { defineConfig } from 'vitest/config'
${ts ? "import type { UserConfigFn } from 'vite'" : ''}
  
export default mergeConfig(${ts ? '(<UserConfigFn>viteConfig)' : 'viteConfig'}({ command: 'serve', mode: 'development' }), defineConfig({
  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/.[tj]sx$/]
    },
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
}))`
}
