import { useUserStore } from '@/store/modules/user'

/**
 * @description: 数组转树形结构
 * @param {any} data 原数组
 * @param {string} idKey
 * @param {string} pIdKey 父级关联key
 * @param {any} parentId 判断父级
 * @return {*}
 */
export const array2Tree = (data: any[], idKey: string, pIdKey: string, parentId: any) => {
  const treeList: any[] = []
  // eslint-disable-next-line no-restricted-syntax
  for (const item of data) {
    if (item[pIdKey] === parentId) {
      const children = array2Tree(data, idKey, pIdKey, item[idKey])
      if (children.length > 0) {
        item.children = children
      }
      treeList.push(item)
    }
  }
  return treeList
}

/**
 * @description: json字符串转json
 * @param {string} jsonStr
 * @return {*}
 */
export const getJson = (jsonStr: string) => {
  let value = null
  try {
    value = JSON.parse(jsonStr)
  } catch {
    value = jsonStr
  }
  return value
}

/**
 * 扁平化数组
 */
export const flatArray = (arr: any[], newArr: any[] = []) => {
  arr.forEach(item => {
    if (item.children) {
      flatArray(item.children, newArr)
    } else {
      newArr.push(item)
    }
  })
  return newArr
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

export const hasPermission = (code: string) => {
  const userStore = useUserStore()
  const codes: string[] = userStore.permissionCodes || []
  return codes.includes(code)
}
