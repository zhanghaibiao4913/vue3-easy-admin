import { defineStore } from 'pinia'
import { getPermissionCodes } from '@/api/user'
import dynamicRoutes from '@/router/dynamic'
import constantRoutes from '@/router/constant'
import { cloneDeep } from '@/utils'
import { useTabsStore } from './tabs'

function filterDynamicRoutes(list: any[], codes: string[]) {
  for (let i = list.length - 1; i >= 0; i -= 1) {
    const item = list[i]
    if (item.children) {
      filterDynamicRoutes(item.children, codes)
    } else if (item.meta && !codes.includes(item.meta.code)) {
      list.splice(i, 1)
    }
  }
}

interface UserInfo {
  id: string
  name: string
}

interface UserState {
  token: string
  userInfo: UserInfo | null
  permissionCodes: string[]
  permissionRoutes: any[]
}

export const useUserStore = defineStore({
  id: 'user',

  state: (): UserState => {
    return {
      token: '',
      userInfo: {
        id: '',
        name: ''
      },
      // 权限编码
      permissionCodes: [],
      // 根据权限编码过滤出来的权限路由
      permissionRoutes: []
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['userInfo']
      },
      {
        storage: sessionStorage,
        paths: ['token']
      }
    ]
  },

  getters: {
    appMenuList: state => {
      return [...constantRoutes, ...state.permissionRoutes]
    }
  },

  actions: {
    // 保存token
    setToken(token: string) {
      this.token = token
    },

    // 保存用户信息
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo
    },

    // 请求权限
    async generatePermissionRoutes() {
      // eslint-disable-next-line prefer-const
      let result = cloneDeep(dynamicRoutes)
      const codes = await getPermissionCodes()
      this.permissionCodes = codes || []
      filterDynamicRoutes(result, this.permissionCodes)
      this.permissionRoutes = result
      return result
    },

    // 退出登录
    logout() {
      this.setToken('')
      this.setUserInfo(null)
      const tabStore = useTabsStore()
      tabStore.clearTab()
      // router.push('/login')
      window.location.reload()
    }
  }
})
