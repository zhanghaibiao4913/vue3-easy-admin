import { hasPermission } from '@/utils'

export default function directive(app) {
  app.directive('auth', {
    mounted: (el, binding) => {
      if (!hasPermission(binding.value)) {
        el.remove()
      }
    }
  })
}