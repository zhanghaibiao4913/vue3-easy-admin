import { cloneDeep } from 'lodash-es'
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
export const flatArray = (arr, newArr = []) => {
  arr.forEach(item => {
    if (item.children) {
      flatArray(item.children, newArr)
    } else {
      newArr.push(item)
    }
  })
  return newArr
}

export const flatRoutes = routes => {
  const newRoutes = []
  routes.forEach((item, i) => {
    newRoutes.push(cloneDeep(item))
    if (item.children && item.children.length) {
      newRoutes[i].children = []
      item.children.forEach(child => {
        if (child.children) {
          newRoutes[i].children.push(...flatArray(child.children || []))
        } else {
          newRoutes[i].children.push(child)
        }
      })
    }
  })
  return newRoutes
}

export const hasPermission = code => {
  const userStore = useUserStore()
  const codes = userStore.permissionCodes || []
  return codes.includes(code)
}
