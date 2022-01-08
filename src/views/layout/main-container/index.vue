<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="keepAliveList" :max="10">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import { useTabsStore } from '@/store/modules/tabs'
import { useAppStore } from '@/store/modules/app'

const tabsStore = useTabsStore()
const appStore = useAppStore()
const enableKeepAlive = computed<boolean>(() => appStore.enableKeepAlive)
const keepAliveList = computed<string[]>(() => {
  return enableKeepAlive.value ? (tabsStore.keepAliveList as string[]) : []
})
</script>

<style lang="scss" scoped></style>
