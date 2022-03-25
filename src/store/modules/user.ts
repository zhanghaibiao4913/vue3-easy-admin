import { defineStore } from 'pinia'
import dynamicRoutes from '@/router/dynamic'
import constantRoutes from '@/router/constant'
import { cloneDeep } from 'lodash-es'
import { useTabsStore } from './tabs'
import { UserInfoModel } from '@/service/model/user'

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
      // 根据权限编码过滤出来的权限路由
      permissionRoutes: []
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['userInfo', 'permissionCodes']
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
    setUserInfo(userInfo: UserInfoModel | null) {
      this.userInfo = userInfo
    },

    setPermissionCode(codes: string[]) {
      this.permissionCodes = codes || []
    },

    // 请求权限
    generatePermissionRoutes() {
      // eslint-disable-next-line prefer-const
      let result = cloneDeep(dynamicRoutes)
      filterDynamicRoutes(result, this.permissionCodes)
      this.permissionRoutes = result || []
      // console.log('权限路由', this.permissionRoutes)
      return this.permissionRoutes
    },

    // 退出登录
    logout() {
      this.setToken('')
      this.setUserInfo(null)
      const tabStore = useTabsStore()
      tabStore.clearTab()
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }
})
