import { useUserStore } from '@/store/modules/user'

export const cloneDeep = (obj: any, hash = new WeakMap()) => {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  const cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = cloneDeep(obj[key], hash)
    }
  }
  return cloneObj
}

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

export const flatRoutes = (routes: any[]) => {
  const newRoutes: any[] = []
  routes.forEach((item, i) => {
    newRoutes.push(cloneDeep(item))
    if (item.children && item.children.length) {
      newRoutes[i].children = []
      item.children.forEach((child: { children: any }) => {
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

export const hasPermission = (code: string) => {
  const userStore = useUserStore()
  const codes: string[] = userStore.permissionCodes || []
  return codes.includes(code)
}
