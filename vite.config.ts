import { defineConfig } from 'vite'
import PluginVue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VitePluginSvgIcons from 'vite-plugin-svg-icons'

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
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    VitePluginSvgIcons({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
