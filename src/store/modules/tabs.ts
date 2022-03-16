import { defineStore } from 'pinia'
import type { RouteLocationNormalized, RouteRecordRaw, RouteRecordName } from 'vue-router'
import { cloneDeep } from '@/utils'

interface TabsState {
  tabList: RouteLocationNormalized[]
  keepAliveList: (string | undefined)[]
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
      const i = this.tabList.findIndex((e: RouteLocationNormalized) => e.name === route.name)
      // 不存在时才进行新增
      if (i === -1) {
        this.tabList.push(cloneDeep(route))
      }
      this.updateKeepAlive()
    },

    removeTab(name: RouteRecordName) {
      const i = this.tabList.findIndex((e: RouteLocationNormalized) => e.name === name)
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
      this.tabList = this.tabList.filter((e: RouteLocationNormalized) => e.meta?.affix)
      this.updateKeepAlive()
    },

    removeLeftRight(direction: string, name: RouteRecordName) {
      const index = this.tabList.findIndex((e: RouteLocationNormalized) => e.name === name)
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
      this.keepAliveList = this.tabList.map((e: RouteLocationNormalized) => {
        if (e.meta?.keepAlive !== false) {
          return e.name as string
        }
      })
    },

    deleteKeepAlive(name: RouteRecordName) {
      this.keepAliveList.splice(
        this.keepAliveList.findIndex(e => e === name),
        1
      )
    }
  }
})
