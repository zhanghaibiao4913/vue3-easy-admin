import { createRouter, createWebHashHistory } from 'vue-router'
import constantRoutes from './constant'
import dynamicRoutes from './dynamic'
import { useUserStore } from '@/store/modules/user'
import { ElLoading, ElMessage  } from 'element-plus'
import { flatRoutes } from '@/utils'
import { cloneDeep } from 'lodash-es'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...constantRoutes
  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  if (userStore.token) {
    if (to.name === 'Login') {
      return { name: 'Home' }
    } else {
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
    }
  } else {
    if (to.meta.auth === undefined || to.meta.auth === true) {
      return { name: 'Login' }
    } else {
      return true
    }
  }
})

router.afterEach(to => {
  // console.log(to)
  // 设置页面标题
  const appTitle = import.meta.env.VITE_APP_TITLE
  const title = to.meta?.title ? `${to.meta.title}-${appTitle}` : appTitle
  document.title = title
})

export default router