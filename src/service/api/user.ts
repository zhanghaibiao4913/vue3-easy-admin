import { request } from '../http'
import { ResponseType } from '../types'
import { UserInfoModel, PermissionCodesModel } from '@/model/user'

/**
 * @description: 模拟登录
 * @param {string} account
 * @param {string} password
 * @return {*}
 */
export const login = (account: string, passwaord: string) => {
  return request<ResponseType<UserInfoModel>>({
    url: '/user/login',
    method: 'post',
    data: {
      account,
      passwaord
    }
  })
}

/**
 * @description: 获取用户权限编码
 * @return {*}
 */
export const getPermissionCodes = () => {
  return request<ResponseType<PermissionCodesModel>>({
    url: '/user/permission',
    method: 'get'
  })
}
