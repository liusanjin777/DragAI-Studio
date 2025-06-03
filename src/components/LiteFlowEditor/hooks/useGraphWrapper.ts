/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { inject } from 'vue'

// 图形包装器的注入键名
const GRAPH_WRAPPER_KEY = 'graphWrapper'

export const useGraphWrapper = () => {
  const graphWrapper = inject(GRAPH_WRAPPER_KEY)

  if (!graphWrapper) {
    throw new Error('useGraphWrapper 必须在 GraphProvider 内部使用')
  }

  return graphWrapper
}
