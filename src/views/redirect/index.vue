<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  // console.log('redirect===')
  const { query } = route
  const redirectPath: string = query.redirectPath as string
  delete query.redirectPath
  router.replace({
    path: redirectPath,
    query: {
      ...query
    }
  })
})
</script>
