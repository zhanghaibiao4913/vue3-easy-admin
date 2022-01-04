<template>
  <div>采购订单</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PurchaseOrderList'
})
</script>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('采购订单mounted===')
})
</script>

<style>
</style>
