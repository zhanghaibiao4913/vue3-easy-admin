<template>
  <div>品牌运营</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BrandOperation'
})
</script>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('mounted===')
})
</script>

<style lang="scss" scoped>
</style>
