<template>
  <div class="page-container">
    <div class="align-center">
      <img :src="noFoundImg" />
      <p class="mb20">抱歉，您访问的页面不存在!</p>
      <el-button type="primary" @click="goBack">返回上一页</el-button>
      <el-button type="success" @click="goHome">回到首页</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import noFoundImg from '@/assets/image/404.png'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push({
    name: 'Home'
  })
}
</script>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
}
</style>
