<template>
  <!-- 图形上下文提供者，用于向子组件提供图形相关的上下文数据 -->
  <GraphContext.Provider
    :value="{
      graph: flowGraph,
      graphWrapper: wrapperRef,
      model: null,
      currentEditor
    }"
  >
    <!-- 布局组件，包含侧边栏、工具栏等 -->
    <Layout
      :flowGraph="flowGraph"
      :SideBar="SideBar"
      :ToolBar="ToolBar"
      :SettingBar="SettingBar"
      :widgets="widgets"
    >
      <!-- 编辑器主容器 -->
      <div
        :class="[styles.liteflowEditorContainer, className]"
        ref="wrapperRef"
      >
        <!-- 图形绘制区域 -->
        <div :class="styles.liteflowEditorGraph" ref="graphRef" />
        <!-- 小地图区域 -->
        <div :class="styles.liteflowEditorMiniMap" ref="miniMapRef" />
        <!-- 面包屑导航 -->
        <Breadcrumb v-if="flowGraph" :flowGraph="flowGraph" />
        <!-- 右键菜单组件 -->
        <FlowGraphContextMenu
          v-if="flowGraph"
          v-bind="contextMenuInfo"
          :flowGraph="flowGraph"
        />
        <!-- 节点操作面板 -->
        <FlowGraphContextPad
          v-if="flowGraph"
          v-bind="contextPadInfo"
          :flowGraph="flowGraph"
        />
        <slot />
      </div>
    </Layout>
  </GraphContext.Provider>
</template>

<script setup lang="ts">
// Vue 相关导入
import {
  ref,
  onMounted,
  onUnmounted,
  reactive,
  defineProps,
  defineExpose
} from 'vue'
// X6 图形库相关导入
import { Graph, Edge, Cell, Node } from '@antv/x6'
// 自定义组件和工具导入
import createFlowGraph from './panels/flowGraph/createFlowGraph'
import FlowGraphContextMenu from './panels/flowGraph/contextMenu'
import FlowGraphContextPad from './panels/flowGraph/contextPad'
import { GraphContext } from './context/GraphContext'
import Layout from './panels/layout'
import SideBar from './panels/sideBar'
import ToolBar from './panels/toolBar'
import SettingBar from './panels/settingBar'
import Breadcrumb from './panels/breadcrumb/index.vue'
import styles from './index.module.less'
import '@antv/x6/dist/x6.css'
import { forceLayout } from './common/layout'
import { useModel } from './hooks'
import { history } from './hooks/useHistory'
import ELBuilder from './model/builder'
import { setModel } from './hooks/useModel'
import { MIN_ZOOM } from './constant'

// 编辑器属性接口定义
interface ILiteFlowEditorProps {
  className?: string
  onReady?: (graph: Graph) => void
  widgets?: any[]
}

const props = defineProps<ILiteFlowEditorProps>()

// 右键菜单信息接口
interface IMenuInfo {
  x: number
  y: number
  scene: string
  visible: boolean
}

// 操作面板信息接口
interface IPadInfo {
  x: number
  y: number
  edge?: Edge
  node?: Node
  scene?: string
  visible: boolean
}

// 扩展Graph类型，添加滚动相关方法
interface FlowGraph extends Graph {
  lockScroller: () => void
  unlockScroller: () => void
  scroller: {
    disableAutoResize: () => void
    enableAutoResize: () => void
  }
}

// DOM引用
const wrapperRef = ref<HTMLDivElement | null>(null)
const graphRef = ref<HTMLDivElement | null>(null)
const miniMapRef = ref<HTMLDivElement | null>(null)
const flowGraph = ref<FlowGraph | undefined>()

// 右键菜单状态
const contextMenuInfo = reactive<IMenuInfo>({
  x: 0,
  y: 0,
  scene: 'blank',
  visible: false
})

// 操作面板状态
const contextPadInfo = reactive<IPadInfo>({
  x: 0,
  y: 0,
  scene: 'append',
  visible: false
})

// 编辑器实例方法
const currentEditor = {
  getGraphInstance() {
    return flowGraph.value
  },
  toJSON() {
    return useModel().toJSON()
  },
  fromJSON(data: Record<string, any>) {
    const model = ELBuilder.build(data || {})
    setModel(model)
    history.cleanHistory()
    flowGraph.value?.zoomToFit({ minScale: MIN_ZOOM, maxScale: 1 })
  }
}

// 暴露编辑器方法
defineExpose(currentEditor)

// resize flowGraph's size when window size changes
const resizeHandler = () => {
  requestAnimationFrame(() => {
    if (flowGraph.value && wrapperRef.value) {
      const width = wrapperRef.value.clientWidth
      const height = wrapperRef.value.clientHeight
      flowGraph.value.resize(width, height)
    }
  })
}
window.addEventListener('resize', resizeHandler)

// 右键菜单显示处理
const showHandler = (info: IMenuInfo) => {
  flowGraph.value?.lockScroller()
  Object.assign(contextMenuInfo, { ...info, visible: true })
}

// 右键菜单隐藏处理
const hideHandler = () => {
  flowGraph.value?.unlockScroller()
  contextMenuInfo.visible = false
}

// 操作面板显示处理
const showContextPad = (info: IPadInfo) => {
  flowGraph.value?.lockScroller()
  Object.assign(contextPadInfo, { ...info, visible: true })
}

// 操作面板隐藏处理
const hideContextPad = () => {
  flowGraph.value?.unlockScroller()
  contextPadInfo.visible = false
}

// 模型变更处理
const handleModelChange = () => {
  if (flowGraph.value) {
    const model = useModel()
    const modelJSON = model.toCells() as Cell[]
    flowGraph.value.scroller.disableAutoResize()
    flowGraph.value.startBatch('update')
    flowGraph.value.resetCells(modelJSON)
    forceLayout(flowGraph.value)
    flowGraph.value.stopBatch('update')
    flowGraph.value.scroller.enableAutoResize()
    flowGraph.value.trigger('model:changed')
  }
}

// 组件挂载时初始化图形和事件监听
onMounted(() => {
  if (graphRef.value && miniMapRef.value) {
    const graph = createFlowGraph(graphRef.value, miniMapRef.value)
    props.onReady?.(graph)
    flowGraph.value = graph as any
    history.init(graph)
  }

  if (flowGraph.value) {
    flowGraph.value.on('graph:showContextMenu', showHandler)
    flowGraph.value.on('graph:hideContextMenu', hideHandler)
    flowGraph.value.on('graph:showContextPad', showContextPad)
    flowGraph.value.on('graph:hideContextPad', hideContextPad)
    flowGraph.value.on('model:change', handleModelChange)
  }
})

// 组件卸载时清理事件监听
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
  if (flowGraph.value) {
    flowGraph.value.off('graph:showContextMenu', showHandler)
    flowGraph.value.off('graph:hideContextMenu', hideHandler)
    flowGraph.value.off('graph:showContextPad', showContextPad)
    flowGraph.value.off('graph:hideContextPad', hideContextPad)
    flowGraph.value.off('model:change', handleModelChange)
  }
})
</script>

<style module>
@import './index.module.less';
</style>
