import { defineConfig, loadEnv } from 'vite'
import PluginVue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VitePluginCompression from 'vite-plugin-compression'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const appTitle = env.VITE_APP_TITLE
  return {
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    server: {
      port: 9011, // 本地开发端口
      open: false, // 启动时是否自动打开浏览器
      cors: true // 是否允许跨域
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '/#/': resolve(__dirname, 'types')
      }
    },
    build: {
      sourcemap: false,
      minify: 'esbuild'
    },
    esbuild: {
      pure: ['console.log', 'debugger']
    },
    plugins: [
      PluginVue(),
      VueSetupExtend(),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: ['vue'],
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true
        }
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'types/components.d.ts'
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(root, 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      VitePluginCompression({
        threshold: 10240 // 超过10kb进行压缩
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: appTitle
          }
        }
      })
    ]
  }
})
