<template>
  <router-view v-if="isRouterAlive" />
</template>

<script lang="ts" setup>
import { nextTick, provide, ref } from 'vue'

const isRouterAlive = ref(true)
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
