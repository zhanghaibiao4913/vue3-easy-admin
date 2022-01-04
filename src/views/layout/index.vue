<template>
  <div class="layout-wrapper">
    <side-bar style="flex: 0 0 auto;" />
    <div class="right-wrapper">
      <header-bar />
      <tabs-bar v-if="isShowTabs" />
      <div class="main-container">
        <main-container />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainContainer from './main-container/index.vue'
import HeaderBar from './header-bar/index.vue'
import SideBar from './side-bar/index.vue'
import TabsBar from './tabs-bar/index.vue'
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

const appStore = useAppStore()
const isShowTabs = computed(() => appStore.isShowTabs)
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  height: 100vh;
  .right-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .main-container {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
