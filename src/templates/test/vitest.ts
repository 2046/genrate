export default `/// <reference types="vitest" />

import { mergeConfig } from 'vite'
import viteConfig from './vite.config'
import { defineConfig } from 'vitest/config'

export default mergeConfig(viteConfig(), defineConfig({
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
