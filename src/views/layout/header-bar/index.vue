<template>
  <div class="header-bar">
    <div>
      <img :src="logo" width="115" height="40" />
    </div>
    <div class="flex items-center">
      <el-icon class="fs22 mr10 pointer" @click="handleRefresh">
        <refresh color="#707070" />
      </el-icon>
      <svg-icon
        :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
        class-name="fs22 pointer"
        @click="toggleFullscreen()"
      />
      <div @click="openDrawer" class="pointer ml10">
        <svg-icon name="avatar" class-name="fs26" />
        <span>{{ userInfo?.username }}</span>
        <el-icon class="el-icon--right"><caret-bottom /></el-icon>
      </div>
    </div>
  </div>
  <!--  -->
  <el-drawer v-model="drawer" :with-header="false" :size="300">
    <div class="h-full flex-col">
      <div class="drawer-header flex-col justify-center">
        <div class="mb10">ID：{{ userInfo?.id }}</div>
        <div class="flex items-center">
          <svg-icon name="avatar" class-name="fs48" color="#fff" />
          <div>
            <p class="mb8">{{ userInfo?.username }}</p>
            <p>{{ userInfo?.phone }}</p>
          </div>
        </div>
      </div>
      <div class="flex-1 y-scroll plr10 ptb20" style="background: #e5f0ff">
        <div class="flex items-center justify-between mb20">
          <span>显示标签页</span>
          <el-switch v-model="isShowTabs" inline-prompt active-text="开" inactive-text="关" />
        </div>
        <div class="flex items-center justify-between mb20">
          <span>组件尺寸</span>
          <el-select v-model="uiSize" style="width: 110px">
            <el-option
              v-for="item in uiOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="flex items-center justify-between mb20">
          <span>菜单宽度</span>
          <el-input-number
            v-model="menuWidth"
            controls-position="right"
            :step="10"
            style="width: 110px"
          />
        </div>
        <div class="flex items-center justify-between mb20">
          <span>只保持一个子菜单的展开</span>
          <el-switch v-model="uniqueOpened" inline-prompt active-text="开" inactive-text="关" />
        </div>
        <div class="flex items-center justify-between">
          <span>路由页面缓存</span>
          <el-switch v-model="enableKeepAlive" inline-prompt active-text="开" inactive-text="关" />
        </div>
      </div>
      <el-button @click="onLogout">退出</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, inject, ref, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { useFullscreen } from '@vueuse/core'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import { useTabsStore } from '@/store/modules/tabs'
import logo from '@/assets/image/logo.png'

const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()
const tabsStore = useTabsStore()
const userInfo = computed(() => userStore.userInfo)
const drawer = ref(false)
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
const isShowTabs = computed({
  get: () => {
    return appStore.isShowTabs
  },
  set: () => {
    appStore.toggleTabsShow()
  }
})
const menuWidth = computed({
  get: () => {
    return appStore.menuWidth
  },
  set: newValue => {
    appStore.updateMenuWidth(newValue)
  }
})
const reloadApp = inject<Function>('reload')
const uiSize = computed({
  get: () => {
    return appStore.uiSize
  },
  set: newValue => {
    proxy.$ELEMENT.size = newValue
    appStore.updateUiSize(newValue)
    setTimeout(() => {
      if (reloadApp) {
        reloadApp()
      }
    }, 100)
  }
})
const uiOptions = ref([
  { label: '大（large）', value: 'large' },
  { label: '中（medium）', value: 'medium' },
  { label: '小（small）', value: 'small' },
  { label: '极小（mini）', value: 'mini' }
])
const uniqueOpened = computed({
  get: () => {
    return appStore.uniqueOpened
  },
  set: () => {
    appStore.toggleUniquiOpened()
  }
})
const enableKeepAlive = computed({
  get: () => {
    return appStore.enableKeepAlive
  },
  set: () => {
    appStore.toggleKeepAlive()
  }
})

const openDrawer = () => {
  drawer.value = true
}
const onLogout = () => {
  ElMessageBox.confirm('确定退出当前登录账号吗？', '提示', {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确定'
  }).then(() => {
    userStore.logout()
  })
}
// 刷新当前路由页面
const handleRefresh = () => {
  tabsStore.deleteKeepAlive(route.name as string)
  router.replace({
    path: '/redirect',
    query: {
      ...route.query,
      redirectPath: route.path
    }
  })
}
</script>

<style lang="scss" scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  border-bottom: 1px solid #f4f4f4;
}

.el-icon--right {
  position: relative;
  top: 2px;
}

.drawer-header {
  height: 140px;
  background-color: var(--el-color-primary);
  color: var(--el-color-white);
  padding: 0 20px;
}
</style>

<style lang="scss">
.el-drawer__body {
  padding: 0;
}
</style>
