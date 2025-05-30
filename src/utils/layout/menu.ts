export interface MenuItem {
  path: string
  name: string
  icon?: string
}

export const Menu: MenuItem[] = [
  {
    path: '/',
    name: '训练任务'
  },
  {
    path: '/list',
    name: '推理服务'
  },
  {
    path: '/store',
    name: '存储管理'
  },
  {
    path: '/image',
    name: '镜像管理'
  },
  {
    path: '/expense',
    name: '费用中心'
  }
]
