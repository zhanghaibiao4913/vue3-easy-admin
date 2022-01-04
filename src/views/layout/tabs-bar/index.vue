<template>
  <div class="tag-bar-container">
    <div class="tabs-container">
      <el-tabs
        v-model="currentTagName"
        type="card"
        @tab-remove="removeTab"
        @tab-click="tabClick"
      >
        <el-tab-pane
          v-for="item in visitedViews"
          :key="item.path"
          :label="item.meta?.title || 'New Tabs'"
          :name="item.name"
          :closable="!item.meta.affix"
        />
      </el-tabs>
    </div>
    <el-dropdown
      trigger="click"
      placement="bottom-end"
      @command="handleCommand"
      style="flex: 0 0 80px;"
      class="align-center pr10"
    >
      <span class="el-dropdown-link">
        操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="CloseBold" command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item :icon="CircleCloseFilled" command="closeAll">关闭所有</el-dropdown-item>
          <el-dropdown-item :icon="Refresh" command="refresh">刷新当前</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()
const userStore = useUserStore()
const currentTagName = ref('')
const visitedViews = computed(() => tabsStore.tabList)
const appMenuList = computed(() => userStore.appMenuList)

watch(() => route.path, () => {
  tabsStore.addTab(route)
  currentTagName.value = route.name as string
}, { immediate: true, deep: true })

onMounted(() => {
  initTabs(appMenuList.value)
})

const initTabs = (menu: RouteRecordRaw[]) => {
  menu.forEach((item: RouteRecordRaw) => {
    if (item.children) {
      initTabs(item.children)
    } else {
      if (item.meta?.affix) {
        tabsStore.addTab(item)
      }
    }
  })
}

// 关闭标签
const removeTab = (name: string) => {
  tabsStore.removeTab(name)
  // 如果当前路由不在标签列表里，则重定向到标签里的最后一个
  const i = visitedViews.value.findIndex((e: any) => e.name === route.name)
  if (i === -1) {
    const item: RouteLocationNormalized = visitedViews.value[visitedViews.value.length - 1]
    router.push(item.fullPath)
  }
}

const tabClick = (tag: any) => {
  // console.log('tabClick', tag.paneName)
  const paneName: string = tag.paneName
  if (paneName === route.name) return
  const i = visitedViews.value.findIndex((e: any) => e.name === paneName)
  if (i > -1) {
    const item: RouteLocationNormalized = visitedViews.value[i]
    router.push(item.fullPath)
  }
}

// 关闭其他
const closeOther = () => {
  tabsStore.removeOtherTab(route.name)
}

// 关闭所有
const closeAll = () => {
  tabsStore.removeAll()
  const i = visitedViews.value.findIndex((e: any) => e.name === route.name)
  if (i === -1) {
    const item: RouteLocationNormalized = visitedViews.value[visitedViews.value.length - 1]
    router.push(item.fullPath)
  }
}

// 刷新
const refresh = () => {
  tabsStore.deleteKeepAlive(route.name)
  router.replace({
    path: '/redirect',
    query: {
      ...route.query,
      redirectPath: route.path
    }
  })
}

const handleCommand = (command: string) => {
  if (command === 'closeOther') {
    closeOther()
  } else if (command === 'closeAll') {
    closeAll()
  } else if (command === 'refresh') {
    refresh()
  }
}
</script>

<style lang="scss" scoped>
.tag-bar-container {
  display: flex;
  align-items: center;
  .tabs-container {
    flex: 1;
    overflow: hidden;
  }
  :deep(.el-tabs__item) {
    height: 32px;
    line-height: 32px;
  }
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
}

.el-icon--right {
  position: relative;
  top: 2px;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
  border-bottom: none;
}
</style>
