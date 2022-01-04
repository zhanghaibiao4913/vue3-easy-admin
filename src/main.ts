import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// eslint-disable-next-line import/no-unresolved
import 'vite-plugin-svg-icons/register'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementIcons from '@element-plus/icons-vue'
import './assets/styles/reset.css'
import './assets/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import { useAppStore } from './store/modules/app'
import directive from './directives'
import SvgIcon from './components/svg-icon/index.vue'

const app = createApp(App)
app.use(store)
const appStore = useAppStore()

// ElementPlus
app.use(ElementPlus, {
  size: appStore.uiSize,
  zIndex: 3000,
  locale: zhCn
})

// 将 element-plus 的图标库注册到全局
Object.keys(ElementIcons).forEach(key => {
  app.component(key, ElementIcons[key as keyof typeof ElementIcons])
})

// svg图标组件
app.component('svg-icon', SvgIcon)
app.use(directive)

app.use(router)
app.mount('#app')
