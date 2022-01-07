<template>
  <div v-if="!data.meta?.hideMenu">
    <template v-if="lastItem && !lastItem.children">
      <el-menu-item :index="lastItem.path" @click="menuItemClick">
        <svg-icon v-if="icon" :name="icon" />
        <template #title>{{ lastItem.meta?.title }}</template>
      </el-menu-item>
    </template>
    <template v-else-if="childMenuList.length > 1">
      <el-sub-menu :index="data.path">
        <template #title>
          <svg-icon v-if="icon" :name="icon" />
          <span>{{ data.meta?.title }}</span>
        </template>
        <template v-if="data.children">
          <side-bar-item v-for="child in data.children" :key="child.name" :data="child">
            <template #title>{{ child.meta?.title }}</template>
          </side-bar-item>
        </template>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRouter } from 'vue-router'

// eslint-disable-next-line no-undef
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    },
    required: true
  },
  icon: {
    type: String
  }
})

const router = useRouter()

const childMenuList = computed(() => {
  let result = []
  if (props.data.children) {
    result = props.data.children.filter((e: RouteLocationNormalizedLoaded) => !e.meta.hideMenu)
  }
  return result
})

const lastItem = computed(() => {
  let result = null
  if (childMenuList.value.length === 1) {
    result = {
      ...childMenuList.value[0]
    }
  } else if (!props.data.children) {
    result = {
      ...props.data
    }
  }
  return result
})

const menuItemClick = (m: any) => {
  router.push(m.index)
}
</script>

<style lang="scss" scoped></style>
