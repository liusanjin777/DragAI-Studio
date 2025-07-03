/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type InjectionKey, type Ref, inject, provide } from 'vue'
import type { Graph } from '@antv/x6'

interface IGraphContext {
  model: any
  graph: Graph
  graphWrapper: Ref<HTMLDivElement | null>
}

const GraphContextKey: InjectionKey<IGraphContext> = Symbol('GraphContext')

export const provideGraphContext = (context: IGraphContext) => {
  provide(GraphContextKey, context)
}

export const useGraphContext = () => {
  const context = inject(GraphContextKey)
  if (!context) {
    return null
    // throw new Error('useGraphContext must be used within a GraphProvider')
  }
  return context
}

export const useGraph = () => {
  const { graph = null } = useGraphContext() ?? { graph: null }
  return graph
}
