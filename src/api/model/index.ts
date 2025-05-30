// 接口返回对象定义
export interface Result<T> {
  code: number
  message: string
  data: T
}
