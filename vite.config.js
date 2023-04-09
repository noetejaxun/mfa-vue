import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
        compilerOptions: {
          // treat all tags with a "ui5-" prefix as custom elements
          isCustomElement: tag => tag.startsWith('ui5-')
        }
      }
  }), vueJsx()],
  base: process.env.NODE_ENV === 'production' ? '/ui5-webcomponents-sample-vue' : '/',
  build: {
    rollupOptions: {
      output: {
        format: 'esm',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
