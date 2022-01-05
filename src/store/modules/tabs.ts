import { defineStore } from 'pinia'
import { cloneDeep } from '@/utils/clone'

export const useTabsStore = defineStore({
  id: 'tabs',

  state: () => {
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
    addTab(route) {
      if (route.meta.hideMenu) return
      const i = this.tabList.findIndex(e => e.name === route.name)
      // 不存在时才进行新增
      if (i === -1) {
        this.tabList.push(cloneDeep(route))
      }
      this.updateKeepAlive()
    },

    removeTab(name) {
      const i = this.tabList.findIndex(e => e.name === name)
      if (i > -1) {
        this.tabList.splice(i, 1)
      }
      this.updateKeepAlive()
    },

    removeOtherTab(name) {
      this.tabList.forEach((item, i) => {
        if (!item.meta.affix && item.name !== name) {
          this.tabList.splice(i, 1)
        }
        this.updateKeepAlive()
      })
    },

    removeAll() {
      this.tabList = this.tabList.filter(e => e.meta.affix)
      this.updateKeepAlive()
    },

    clearTab() {
      this.tabList = []
      this.updateKeepAlive()
    },

    updateKeepAlive() {
      // eslint-disable-next-line consistent-return
      this.keepAliveList = this.tabList.map(e => {
        if (e.meta.keepAlive !== false) {
          return e.name
        }
      })
    },

    deleteKeepAlive(name) {
      this.keepAliveList.splice(
        this.keepAliveList.findIndex(e => e === name),
        1
      )
    }
  }
})
