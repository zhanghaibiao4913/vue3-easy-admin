/**
 * 判断是否json字符串
 * @param str
 * @returns
 */
export function isJsonStr(str: string): boolean {
  let result = false
  try {
    const data = JSON.parse(str)
    if (typeof data === 'object' || typeof data === 'boolean') {
      result = true
    }
  } catch {
    result = false
  }
  return result
}

export function isObject(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

export function isBoolean(data: unknown) {
  return Object.prototype.toString.call(data) === '[object Boolean]'
}

/**
 * 扁平化数组
 */
export function flatArray(arr: any[], newArr: any[] = []) {
  arr.forEach(item => {
    if (item.children) {
      flatArray(item.children, newArr)
    } else {
      newArr.push(item)
    }
  })
  return newArr
}
