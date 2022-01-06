import { hasPermission } from '@/utils'
import { App } from 'vue'

export default function directive(app: App) {
  app.directive('auth', {
    mounted: (el, binding) => {
      if (!hasPermission(binding.value)) {
        el.remove()
      }
    }
  })
}
