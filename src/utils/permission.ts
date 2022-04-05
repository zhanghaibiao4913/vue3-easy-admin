import { useUserStore } from '@/store/user'
import { flatArray } from './index'
/**
 * 根据权限编码过滤路由菜单
 * @param data 路由菜单
 * @param permissionCodes 权限编码数组
 * @returns
 */
export const filterDynamicRoutes = (data: any[], permissionCodes: string[]) => {
  const fn = (list: any[], codes: string[]) => {
    for (let i = list.length - 1; i >= 0; i--) {
      const item = list[i]
      if (item.children && item.children.length) {
        filterDynamicRoutes(item.children, codes)
      } else if (item.meta?.code && !codes.includes(item.meta.code)) {
        list.splice(i, 1)
      }
    }
  }
  fn(data, permissionCodes)
  return data
}

/**
 * 判断是否有权限
 * @param code 权限编码
 * @returns
 */
export const hasPermission = (code: string) => {
  const userStore = useUserStore()
  const codes: string[] = userStore.permissionCodes || []
  return codes.includes(code)
}

// 将多久路由扁平化成一级路由
export const flatRoutes = (routes: any[], newArr: any[] = []) => {
  routes.forEach(item => {
    if (item.children && item.children.length) {
      flatArray(item.children, newArr)
    } else {
      newArr.push(item)
    }
  })
  return newArr
}
