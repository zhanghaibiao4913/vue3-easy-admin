import { createRouter, createWebHashHistory } from 'vue-router'
import { ElLoading } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/modules/user'
import { flatRoutes, cloneDeep } from '@/utils'
import constantRoutes from './constant'

NProgress.configure({
  easing: 'ease',
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes]
})

router.beforeEach(async to => {
  NProgress.start()
  const userStore = useUserStore()
  if (userStore.token) {
    if (to.name === 'Login') {
      return { name: 'Home' }
    }
    const permissionRoutes = userStore.permissionRoutes
    if (permissionRoutes.length === 0) {
      const loadingInstance = ElLoading.service({
        text: '加载权限数据'
      })
      const routes = await userStore.generatePermissionRoutes()
      // console.log('routes===', routes)
      const finalRoutes = flatRoutes(cloneDeep(routes))
      // console.log('finalRoutes===', finalRoutes)
      finalRoutes.forEach(item => {
        router.addRoute(item)
      })
      loadingInstance.close()
      return to.fullPath
    }
    return true
  } else {
    if (to.meta.auth === undefined || to.meta.auth === true) {
      return { name: 'Login' }
    }
    return true
  }
})

router.afterEach(to => {
  NProgress.done()
  // console.log(to)
  // 设置页面标题
  const appTitle = import.meta.env.VITE_APP_TITLE
  const title = to.meta?.title ? `${to.meta.title}-${appTitle}` : appTitle
  document.title = title
})

export default router
