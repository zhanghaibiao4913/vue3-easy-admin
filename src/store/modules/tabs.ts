import { defineStore } from 'pinia'
import type { RouteLocationNormalized, RouteRecordRaw, RouteRecordName } from 'vue-router'
import { cloneDeep } from 'lodash-es'

interface TabsState {
  tabList: RouteLocationNormalized[]
  keepAliveList: string[]
}

export const useTabsStore = defineStore({
  id: 'tabs',

  state: (): TabsState => {
    return {
      tabList: [],
      keepAliveList: []
    }
  },

  // 持久化
  persist: {
    enabled: true
  },

  actions: {
    addTab(route: RouteLocationNormalized | RouteRecordRaw) {
      if (route.meta?.hideMenu) return
      const i = this.tabList.findIndex(v => v.name === route.name)
      // 不存在时进行新增操作
      if (i === -1) {
        const copyRoute = cloneDeep(route as RouteLocationNormalized)
        this.tabList.push({
          name: copyRoute.name,
          path: copyRoute.path,
          fullPath: copyRoute.fullPath,
          meta: copyRoute.meta
        } as RouteLocationNormalized)
        this.updateKeepAlive()
      }
    },

    removeTab(name: RouteRecordName) {
      const i = this.tabList.findIndex(e => e.name === name)
      if (i > -1) {
        this.tabList.splice(i, 1)
      }
      this.updateKeepAlive()
    },

    removeOtherTab(activeName: RouteRecordName) {
      this.tabList = this.tabList.filter(item => item.meta?.affix || item.name === activeName)
      this.updateKeepAlive()
    },

    removeAll() {
      this.tabList = this.tabList.filter(e => e.meta?.affix)
      this.updateKeepAlive()
    },

    removeLeftRight(direction: string, name: RouteRecordName) {
      const index = this.tabList.findIndex(e => e.name === name)
      if (index !== -1) {
        if (direction === 'left') {
          this.tabList = this.tabList.filter((item, i) => {
            return item.meta?.affix || i >= index
          })
        } else if (direction === 'right') {
          this.tabList = this.tabList.filter((item, i) => {
            return item.meta?.affix || i <= index
          })
        }
      }
      this.updateKeepAlive()
    },

    clearTab() {
      this.tabList = []
      this.keepAliveList = []
    },

    updateKeepAlive() {
      // eslint-disable-next-line consistent-return
      const arr = this.tabList.map(e => {
        if (e.meta?.keepAlive !== false) {
          return e.name
        }
      }) as string[]
      this.keepAliveList = arr || []
    },

    deleteKeepAlive(name: RouteRecordName) {
      const index = this.keepAliveList.findIndex(e => e === name)
      this.keepAliveList.splice(index, 1)
    }
  }
})
