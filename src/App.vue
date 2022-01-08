<template>
  <el-config-provider :locale="locale">
    <router-view v-if="isRouterAlive" />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const isRouterAlive = ref(true)
const locale = zhCn
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  /* min-height: 500px; */
}
.main-container {
  background-color: #f0f2f5;
  padding: 10px;
}
</style>
