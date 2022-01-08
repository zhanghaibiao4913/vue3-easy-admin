<template>
  <div class="full flex justify-center items-center">
    <div class="align-center">
      <img :src="welcomImg" width="600" />
      <p class="bold fs30">Welcome!</p>
      <el-button>按钮</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import welcomImg from '@/assets/image/welcome.png'
</script>

<style lang="scss" scoped></style>
