import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Plugins
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from "unplugin-vue-router";
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: true,
    }),
    vue(),
    Components({
      dts: true,
      resolvers: [
        PrimeVueResolver(),
      ]
    }),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true,
      },
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
        'pinia'
      ]
    })
  ],
  define: {
    // vue
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  },
  esbuild: {
    drop: ["console", "debugger"],
    legalComments: "none",
    format: "esm",
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
