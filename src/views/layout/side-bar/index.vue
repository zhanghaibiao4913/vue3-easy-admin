<template>
  <el-scrollbar :view-style="{ height: '100%', width: menuWidth + 'px' }">
    <el-menu
      :unique-opened="uniqueOpened"
      :default-active="currentPath"
      background-color="#021524"
      text-color="#ffffff"
      active-text-color="#409EFF"
      style="height: 100%"
    >
      <side-bar-item
        v-for="item in appMenuList"
        :key="item.name"
        :data="item"
        :icon="item.meta?.icon"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import SideBarItem from './side-bar-item.vue'

const route = useRoute()
const userStore = useUserStore()
const appStore = useAppStore()
const appMenuList = computed(() => userStore.appMenuList)
const currentPath = computed(() => route.path)
const menuWidth = computed(() => appStore.menuWidth)
const uniqueOpened = computed(() => appStore.uniqueOpened)
</script>

<style lang="scss" scoped></style>
