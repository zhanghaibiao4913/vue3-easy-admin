<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

onMounted(() => {
  console.log('redirect===')
  const redirectPath: string = route.query.redirectPath as string
  let query = route.query
  delete query.redirectPath
  router.replace({
    path: redirectPath,
    query
  })
})
</script>
