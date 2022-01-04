<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="enableKeepAlive ? keepAliveList : []" :max="10">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTabsStore } from '@/store/modules/tabs'
import { useAppStore } from '@/store/modules/app'

const tabsStore = useTabsStore()
const appStore = useAppStore()
const enableKeepAlive = computed(() => appStore.enableKeepAlive)
const keepAliveList = computed(() => tabsStore.keepAliveList || [])
</script>

<style lang="scss" scoped></style>
