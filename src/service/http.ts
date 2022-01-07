/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

const tokeyKey = import.meta.env.VITE_TOKEN_KEY
const baseURL = import.meta.env.VITE_BASE_URL
const timeout = import.meta.env.VITE_TIMEOUT
// 创建实例
const instance = axios.create({
  baseURL,
  timeout: Number(timeout),
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截
instance.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token && config.headers) {
      // eslint-disable-next-line no-param-reassign
      config.headers[tokeyKey] = userStore.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  response => {
    // console.log('response=>', response)
    const token = response.headers[tokeyKey]
    if (token) {
      // 更新token
      const userStore = useUserStore()
      userStore.setToken(token)
    }
    const { status, data } = response
    if (status === 200) {
      const { code, message } = data
      if (code === 0) {
        return data
      }
      ElMessage.error(message || '接口请求异常')
      return Promise.reject(data)
    }
    ElMessage.error(`${status}服务器响应异常`)
    return Promise.reject(data)
  },
  error => {
    // console.log('error.response=>', error.response)
    const { response, code, message, config } = error
    if (!response) {
      ElMessage.error('连接失败，请检查网络')
    } else {
      const { _retry } = config
      const { status, data } = response
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1 && !_retry) {
        ElMessage.error('连接超时，请稍后重试')
      } else {
        ElMessage.error(`${status}${data.message || 'error'}`)
      }
    }
    return Promise.reject(error)
  }
)

export const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return instance.request(config)
}

export default instance
