import { defineStore } from 'pinia'
import type { RouteMeta } from 'vue-router'

interface TabItem {
  name: string
  path: string
  fullPath: string
  meta: RouteMeta
}
interface TabsState {
  tabList: TabItem[]
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

  persist: {
    enabled: true
  },

  actions: {
    addTab(route: TabItem) {
      if (route.meta?.hideMenu) return
      const i = this.tabList.findIndex(v => v.name === route.name)
      if (i === -1) {
        this.tabList.push({
          name: route.name,
          path: route.path,
          fullPath: route.fullPath,
          meta: route.meta
        })
        this.updateKeepAlive()
      }
    },

    removeTab(name: string) {
      const i = this.tabList.findIndex(e => e.name === name)
      if (i > -1) {
        this.tabList.splice(i, 1)
        this.updateKeepAlive()
      }
    },

    removeOtherTab(activeName: string) {
      this.tabList = this.tabList.filter(item => item.meta?.affix || item.name === activeName)
      this.updateKeepAlive()
    },

    removeAll() {
      this.tabList = this.tabList.filter(e => e.meta?.affix)
      this.updateKeepAlive()
    },

    removeLeftRight(direction: string, name: string) {
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
        this.updateKeepAlive()
      }
    },

    clearTab() {
      this.tabList = []
      this.keepAliveList = []
    },

    updateKeepAlive() {
      const arr = this.tabList.filter(e => {
        return e.meta?.keepAlive !== false
      })
      this.keepAliveList = arr.map(e => e.name)
    },

    removeKeepAlive(name: string) {
      const index = this.keepAliveList.findIndex(e => e === name)
      if (index >= 0) {
        this.keepAliveList.splice(index, 1)
      }
    }
  }
})
