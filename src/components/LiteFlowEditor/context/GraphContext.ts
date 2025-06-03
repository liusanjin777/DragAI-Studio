import { Graph } from '@antv/x6'
import { ref, Ref } from 'vue'

/**
 * graph: Graph实例
 * graphWrapper: Graph的容器
 */
interface IGraphContext {
  model: any
  graph: Graph
  graphWrapper: Ref<HTMLDivElement | null>
}

// 创建默认值
const defaultValue: IGraphContext = {
  model: null,
  graph: null as any,
  graphWrapper: ref(null)
}

// 使用Vue的provide/inject替代React的Context
export const GraphKey = Symbol('GraphContext')

export { defaultValue }
