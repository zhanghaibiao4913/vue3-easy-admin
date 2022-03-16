import { defineConfig } from 'vite'
import PluginVue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VitePluginCompression from 'vite-plugin-compression'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  server: {
    port: 9011, // 本地开发端口
    open: false, // 启动时是否自动打开浏览器
    cors: true // 是否允许跨域
  },
  plugins: [
    PluginVue(),
    VueSetupExtend(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    VitePluginCompression({
      threshold: 10240 // 超过10kb进行压缩
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    sourcemap: false,
    terserOptions: {
      compress: {
        // 生产环境打包配置 去除 console debugger
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
