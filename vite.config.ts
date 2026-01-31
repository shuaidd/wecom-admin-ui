import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { readdirSync, statSync } from 'node:fs'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

function scanHtmlEntries() {
  const pagesDir = resolve(__dirname, 'admin')
  const entries: Record<string, string> = {
    main: resolve(__dirname, 'index.html'),
  }

  function scanDir(dir: string, basePath: string = '') {
    const files = readdirSync(dir)

    for (const file of files) {
      const fullPath = resolve(dir, file)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        const newBasePath = basePath ? `${basePath}/${file}` : file
        scanDir(fullPath, newBasePath)
      } else if (file.endsWith('.html')) {
        const htmlPath = basePath ? `${basePath}/${file}` : file
        const entryName = htmlPath.replace(/[\/\\]/g, '-').replace(/\.html$/, '')
        console.log(`Scanned HTML entry: ${entryName} -> ${htmlPath}`)
        entries[entryName] = resolve(__dirname, pagesDir, htmlPath)
      }
    }
  }

  scanDir(pagesDir)

  return entries
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: false,
        },
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
        dts: 'src/components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        input: scanHtmlEntries(),
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('@ant-design/icons-vue')) {
                return 'icons'
              }
              if (id.includes('ant-design-vue')) {
                return 'antd'
              }
              if (id.includes('vue')) {
                return 'vue-vendor'
              }
              if (id.includes('pinia')) {
                return 'pinia'
              }
              if (id.includes('vue-router')) {
                return 'vue-router'
              }
              if (id.includes('@vueuse')) {
                return 'vueuse'
              }
              return 'vendor'
            }
          },
        },
      },
    },
    define: {
      'import.meta.env.VITE_APP_TITLE': JSON.stringify(env.VITE_APP_TITLE),
      'import.meta.env.VITE_APP_ENV': JSON.stringify(env.VITE_APP_ENV),
      'import.meta.env.VITE_APP_API_BASE_URL': JSON.stringify(env.VITE_APP_API_BASE_URL),
    },
  }
})
