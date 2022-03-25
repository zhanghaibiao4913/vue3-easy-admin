// 登录用户
export interface UserInfoModel {
  id: string
  username: string
  phone: string
  email: string
  accessToken: string
}

// 用户权限编码
export type PermissionCodesModel = string[]
