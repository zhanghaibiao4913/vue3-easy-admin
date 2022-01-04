import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'

export const useAppStore = defineStore({
  id: 'app',

  state: () => {
    return {
      // Element 组件尺寸，支持：large、medium、small、mini
      uiSize: 'mini',
      // 是否显示标签页
      isShowTabs: true,
      // 菜单宽度
      menuWidth: 200,
      // 是否只保持一个子菜单的展开
      uniqueOpened: false,
      // 是否开启路由缓存
      enableKeepAlive: true
    }
  },

  // 持久化
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: [
          'isShowTabs',
          'menuWidth',
          'uiSize',
          'uniqueOpened',
          'enableKeepAlive',
          'enablePermission'
        ]
      }
    ]
  },

  actions: {
    toggleTabsShow() {
      this.isShowTabs = !this.isShowTabs
    },

    updateMenuWidth(width: number) {
      this.menuWidth = width
    },

    updateUiSize(size: string) {
      this.uiSize = size
    },

    toggleUniquiOpened() {
      this.uniqueOpened = !this.uniqueOpened
    },
    
    toggleKeepAlive() {
      this.enableKeepAlive = !this.enableKeepAlive
    },

    togglePermission() {
      this.enablePermission = !this.enablePermission
    }
  }
})
