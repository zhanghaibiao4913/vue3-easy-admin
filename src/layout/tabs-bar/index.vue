<template>
  <div class="tag-bar-container">
    <div class="tabs-container">
      <el-tabs v-model="currentTagName" type="card" @tab-remove="removeTab" @tab-click="tabClick">
        <el-tab-pane
          v-for="item in visitedViews"
          :key="item.fullPath || item.path"
          :label="item.meta?.title || 'New Tabs'"
          :name="item.name"
          :closable="!item.meta?.affix"
        />
      </el-tabs>
    </div>
    <el-dropdown
      trigger="click"
      placement="bottom-end"
      @command="handleCommand"
      style="flex: 0 0 80px"
      class="justify-center"
    >
      <span class="el-dropdown-link">
        操作
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CloseBold" command="closeOther">关闭其他</el-dropdown-item>
          <el-dropdown-item icon="Back" command="closeLeft">关闭左侧</el-dropdown-item>
          <el-dropdown-item icon="Right" command="closeRight">关闭右侧</el-dropdown-item>
          <el-dropdown-item icon="CircleCloseFilled" command="closeAll">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import type { RouteItem } from '/#/menu'
import { useTabsStore } from '@/store/tabs'
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()
const userStore = useUserStore()
const currentTagName = ref('')
const visitedViews = computed(() => tabsStore.tabList)
const appMenuList = computed(() => userStore.appMenuList)

const initTabs = (menu: RouteItem[]) => {
  menu.forEach(item => {
    if (item.children) {
      initTabs(item.children)
    } else if (item.meta?.affix) {
      tabsStore.addTab(item)
    }
  })
}

const toLastTab = () => {
  // 如果当前路由不在标签列表里，则重定向到标签里的最后一个
  const i = visitedViews.value.findIndex((e: any) => e.name === route.name)
  if (i === -1) {
    const item = visitedViews.value[visitedViews.value.length - 1]
    router.push(item.fullPath || item.path)
  }
}

// 关闭标签
const removeTab = (paneName: string | number) => {
  tabsStore.removeTab(paneName as string)
  toLastTab()
}

const tabClick = (tag: any) => {
  // console.log('tabClick', tag.paneName)
  const { paneName } = tag
  if (paneName === route.name) return
  const i = visitedViews.value.findIndex(e => e.name === paneName)
  if (i > -1) {
    const item = visitedViews.value[i]
    router.push(item.fullPath || item.path)
  }
}

// 关闭所有
const closeAll = () => {
  tabsStore.removeAll()
  toLastTab()
}

const handleCommand = (command: string) => {
  if (command === 'closeOther') {
    tabsStore.removeOtherTab(route.name as string)
  } else if (command === 'closeAll') {
    closeAll()
  } else if (command === 'closeLeft') {
    tabsStore.removeLeftRight('left', route.name as string)
  } else if (command === 'closeRight') {
    tabsStore.removeLeftRight('right', route.name as string)
  }
}

onMounted(() => {
  initTabs(appMenuList.value)
  watch(
    () => route.path,
    () => {
      currentTagName.value = route.name as string
      tabsStore.addTab(route as RouteItem)
    },
    { immediate: true, deep: true }
  )
})
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

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  border-bottom: none;
}
</style>
