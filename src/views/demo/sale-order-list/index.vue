<template>
  <div>销售订单</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SaleOrderList'
})
</script>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('销售订单mounted===')
})
</script>

<style>
</style>
