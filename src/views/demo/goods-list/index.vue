<template>
  <div>商品列表</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'GoodsList'
})
</script>

<script lang="ts" setup>
onMounted(() => {
  console.log('mounted===')
})
</script>

<style></style>
