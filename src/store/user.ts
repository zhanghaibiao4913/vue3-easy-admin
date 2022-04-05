import { defineStore } from 'pinia'
import dynamicRoutes from '@/router/dynamic'
import constantRoutes from '@/router/constant'
import { cloneDeep } from 'lodash-es'
import { useTabsStore } from './tabs'
import { UserInfoModel } from '@/service/model/user'
import { filterDynamicRoutes } from '@/utils/permission'
// import { StorageUtils } from '@/utils/storage'

interface UserState {
  token: string
  userInfo: UserInfoModel | null
  permissionCodes: string[]
  permissionRoutes: any[]
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserState => {
    return {
      token: '',
      userInfo: null,
      // 权限编码
      permissionCodes: [],
      // 权限路由
      permissionRoutes: []
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['userInfo', 'token']
      }
    ]
  },

  getters: {
    appMenuList: state => {
      return [...constantRoutes, ...state.permissionRoutes]
    }
  },

  actions: {
    setToken(token: string) {
      this.token = token
      // StorageUtils.setToken(token)
    },

    setUserInfo(userInfo: UserInfoModel | null) {
      this.userInfo = userInfo
      // StorageUtils.setItem('userInfo', userInfo, localStorage)
    },

    setPermissionCodes(codes: string[]) {
      this.permissionCodes = codes || []
      // StorageUtils.setItem('permissionCodes', codes, localStorage)
    },

    setPermissionRoutes(routes: any[]) {
      this.permissionRoutes = routes || []
    },

    generatePermissionRoutes() {
      const data = cloneDeep(dynamicRoutes)
      const res = filterDynamicRoutes(data, this.permissionCodes)
      this.setPermissionRoutes(res)
      return res
    },

    // 退出登录
    logout() {
      this.setToken('')
      this.setUserInfo(null)
      this.setPermissionCodes([])
      this.setPermissionRoutes([])
      const tabStore = useTabsStore()
      tabStore.clearTab()
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }
})
