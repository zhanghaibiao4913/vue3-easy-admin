import { defineStore } from 'pinia'
import type { RouteLocationNormalized, RouteRecordRaw, RouteRecordName } from 'vue-router'
import { cloneDeep } from '@/utils'

interface Tabs {
  tabList: RouteLocationNormalized[]
  keepAliveList: (RouteRecordName | undefined)[]
}

export const useTabsStore = defineStore({
  id: 'tabs',

  state: (): Tabs => {
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

    removeOtherTab(name: RouteRecordName) {
      this.tabList.forEach((item: RouteLocationNormalized, i: number) => {
        if (!item.meta?.affix && item.name !== name) {
          this.tabList.splice(i, 1)
        }
      })
      this.updateKeepAlive()
    },

    removeAll() {
      this.tabList = this.tabList.filter((e: RouteLocationNormalized) => e.meta?.affix)
      this.updateKeepAlive()
    },

    removeLeftRight(direction: string, name: RouteRecordName) {
      const index = this.tabList.findIndex((e: RouteLocationNormalized) => e.name === name)
      if (index !== -1) {
        this.tabList.forEach((item: RouteLocationNormalized, i: number) => {
          if (!item.meta?.affix) {
            if (direction === 'left') {
              if (i < index) {
                this.tabList.splice(i, 1)
              }
            } else if (direction === 'right') {
              if (i > index) {
                this.tabList.splice(i, 1)
              }
            }
          }
        })
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
