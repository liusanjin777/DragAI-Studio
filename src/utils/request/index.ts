import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'
import { baseConfig } from './baseConfig'
import {
  handleResponse,
  handleResponseErr,
  handlerRequest
} from './interceptor'

/**
 * axios 封装
 * 20230217
 */

export class Request {
  instance: AxiosInstance
  flag: boolean
  /**
   *
   * @param config 默认配置
   * @param flag 是否是第三方接口 默认为第三方接口 true
   */
  constructor(config: AxiosRequestConfig, flag: boolean = true) {
    this.flag = flag
    this.instance = axios.create(config)
    this.initRequestInterceptor(this.instance, flag)
    this.initResponseInterceptor(this.instance, flag)
  }

  // 请求拦截器
  initRequestInterceptor(instance: AxiosInstance, flag: boolean) {
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token，用于后端的验证
        if (!flag) {
          return handlerRequest(config)
        }
        return config as InternalAxiosRequestConfig<any>
      },
      async (err: AxiosError) => await Promise.reject(err)
    )
  }

  // response拦截器
  initResponseInterceptor(instance: AxiosInstance, flag: boolean) {
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 系统如果有自定义code也可以在这里处理
        if (!flag) {
          return handleResponse(res)
        }
        return res
      },
      async (err: AxiosError) => await handleResponseErr(err) // 状态码返回内容
    )
  }

  // 请求方法
  private async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return await this.instance
      .request(config)
      .then((res: AxiosResponse<T>) => res.data)
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig) {
    return await this.request<T>({ method: 'get', url, ...config })
  }

  public async post<T = any>(url: string, config?: AxiosRequestConfig) {
    return await this.request<T>({ method: 'post', url, ...config })
  }

  public async put<T = any>(url: string, config?: AxiosRequestConfig) {
    return await this.request<T>({ method: 'put', url, ...config })
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return await this.request<T>({ method: 'delete', url, ...config })
  }
}

// 默认导出Request实例
export default new Request(baseConfig, false)

// 第三方接口导出Request实例; 也可以直接引入Request类，然后传入不同的config
export const otherRequest = new Request({})
