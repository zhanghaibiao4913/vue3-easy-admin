<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="keepAliveList" :max="10">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import { useTabsStore } from '@/store/tabs'
import { useAppStore } from '@/store/app'

const tabsStore = useTabsStore()
const appStore = useAppStore()
const enableKeepAlive = computed<boolean>(() => appStore.enableKeepAlive)
const keepAliveList = computed<string[]>(() => {
  return enableKeepAlive.value ? tabsStore.keepAliveList : []
})
</script>

<style lang="scss" scoped></style>
