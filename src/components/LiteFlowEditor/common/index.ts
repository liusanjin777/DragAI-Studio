import { Graph } from '@antv/x6'
import { LITEFLOW_ANCHOR, LITEFLOW_EDGE, LITEFLOW_ROUTER } from '../constant'
import liteflowEdge from './edge'
import liteflowRouter from './router'
import liteflowAnchor from './anchor'

export { default as registerEvents } from './events'
export { default as registerShortcuts } from './shortcuts'

Graph.registerEdge(LITEFLOW_EDGE, liteflowEdge)
Graph.registerRouter(LITEFLOW_ROUTER, liteflowRouter)
Graph.registerAnchor(LITEFLOW_ANCHOR, liteflowAnchor)

export { LITEFLOW_EDGE, LITEFLOW_ROUTER, LITEFLOW_ANCHOR }
