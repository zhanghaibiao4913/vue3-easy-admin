import { isJsonStr, isObject, isBoolean } from './index'
import Cookie from 'js-cookie'

export const StorageUtils = {
  setItem(key: string, value: any, storage = sessionStorage) {
    if (Array.isArray(value) || isObject(value) || isBoolean(value)) {
      storage.setItem(key, JSON.stringify(value))
    } else {
      storage.setItem(key, value)
    }
  },

  getItem(key: string, storage = sessionStorage) {
    const value = storage.getItem(key) as string
    if (isJsonStr(value)) {
      return JSON.parse(value)
    }
    return value
  },

  setToken(token: string) {
    Cookie.set('token', token, { expires: 1 })
  },

  getToken() {
    return Cookie.get('token') || ''
  }
}
