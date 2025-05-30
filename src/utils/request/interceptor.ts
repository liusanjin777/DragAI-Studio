// 拦截器操作

import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

import { message } from 'ant-design-vue'

import { MessageCodeError } from '@/utils/message/error'

// 不需要经过处理的接口白名单
const whiteList = ['login', 'logout']

// 处理请求头，一般比如在header加token
export const handlerRequest = (config: AxiosRequestConfig) => {
  if (whiteList.includes(config.url as string))
    return config as InternalAxiosRequestConfig<any>
  const token = localStorage.getItem('token')
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    config.headers!.token = token
  }
  return config as InternalAxiosRequestConfig<any>
}

// 根据情况处理返回数据
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleResponse = (
  res: AxiosResponse,
  instance?: AxiosInstance
) => {
  // todo 在某些情况下instance可能会有用处
  const data = res.data
  // 根据不同的code判断接下来的操作
  switch (data.code) {
    case 200:
      break
    default:
      void message.error(MessageCodeError(data))
      break
  }
  // AxiosResponse data
  res.data = res.data.data
  return res
}

export const handleResponseErr = async (error: AxiosError) => {
  const { response, request } = error
  if (response != null) {
    // 当响应状态码为非2xx时，可以在这里进行错误处理
    // console.log(response.status);
    // console.log(response.data);
    // console.log(response.headers);
    void message.error(MessageCodeError({ code: response.status }))
  }
  // else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
  //   // 超时处理
  //   message.warning('请求超时，请检查网络连接并重新尝试！')
  // }
  else if (request != null) {
    // 当没有响应时，可以在这里进行错误处理：个人建议无需处理
    console.log(request)
  } else {
    // 其他错误，可以在这里进行错误处理
    console.log('Error', error.message)
  }
  // 超时判断
  return await Promise.reject(error)
}
