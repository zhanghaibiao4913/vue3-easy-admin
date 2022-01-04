import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const tokeyKey = import.meta.env.VITE_TOKEN_KEY
const baseURL = import.meta.env.VITE_BASE_URL
const timeout = import.meta.env.VITE_TIMEOUT
const http = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

http.interceptors.request.use(
  config => {
    // if (token) {
    //   config.headers[tokeyKey] = token
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    // console.log('response=>', response)
    const token = response.headers[tokeyKey]
    if (token) {
      // 更新token
    }
    const { status, data } = response
    if (status === 200) {
      const { resultCode, resultMsg } = data
      if (resultCode === '0') {
        return data
      }
      ElMessage.error(resultMsg || '接口请求异常，请稍后重试')
      return Promise.reject(data)
    }
    ElMessage.error(`【${status}】服务器响应异常`)
    return Promise.reject(data)
  },
  error => {
    // console.log('error.response=>', error.response)
    const { response } = error
    if (!response) {
      ElMessage.error('连接失败，请检查网络')
    } else {
      const { code, message } = error
      const { _retry } = error.config
      const { status } = response
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1 && !_retry) {
        ElMessage.error('请求超时')
      } else if (status === 401) {
        ElMessage.error(`【${response.data.code}】${response.data.msg}`)
      } else {
        const msg = response.data.message
        ElMessage.error(`【${status}】${msg}`)
      }
    }
    return Promise.reject(error)
  }
)

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return http.request(config)
}

export default request
