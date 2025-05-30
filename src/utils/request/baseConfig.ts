/**
 * axios 基础配置
 */
import type { AxiosRequestConfig } from 'axios'

export const baseConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_API, // baseUrl
  timeout: 5000 // 超时时间
}
