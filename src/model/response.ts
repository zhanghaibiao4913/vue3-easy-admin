export interface ResponseData<T = any> {
  resultCode: string
  resultMsg: string | null
  result: T
}
