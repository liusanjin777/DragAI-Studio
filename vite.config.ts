/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    // 生产环境去除console打印
    drop: ['console', 'debugger']
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import (reference) "${fileURLToPath(
            new URL('./src/style/main.less', import.meta.url)
          )}";`
        }
      }
    },
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  }
})
