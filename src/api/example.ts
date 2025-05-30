import request, { otherRequest, Request } from '@/utils/request'
import type { Example, CatImage } from './model/exampleModel'

// 系统内接口调用
export const getJson = async (url: string) => {
  return await request.get<Example>(url)
}

// 第三方接口调用
export const getThirdParty = async (url: string, params?: any) => {
  return await otherRequest.get<CatImage[]>(url, { params })
}

// 第三方接口调用
// eslint-disable-next-line @typescript-eslint/naming-convention
export const getThirdParty_2 = async (url: string, params?: any) => {
  const _request = new Request({}) // 可自定义config
  return await _request.get<CatImage[]>(url, { params })
}
