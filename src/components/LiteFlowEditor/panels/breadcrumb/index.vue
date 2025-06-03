<template>
  <div :class="styles.liteflowEditorBreadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <home-outlined />
      </a-breadcrumb-item>
      <a-breadcrumb-item
        v-for="(elNodeModel, index) in parents"
        :key="index"
        @click="handleClick(elNodeModel)"
      >
        <img
          :class="styles.liteflowEditorBreadcrumbIcon"
          :src="getIconByType(elNodeModel.type)"
        />
        <span>{{ elNodeModel.type }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Graph } from '@antv/x6'
import {
  Breadcrumb as ABreadcrumb,
  BreadcrumbItem as ABreadcrumbItem
} from 'ant-design-vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import type ELNode from '../../model/node'
import { getIconByType } from '../../cells'
import styles from './index.module.less'

interface Props {
  flowGraph: Graph
}

const props = defineProps<Props>()

const selectedModel = ref<ELNode | null>(null)
const parents = ref<ELNode[]>([])

// 更新面包屑导航
const updateBreadcrumb = () => {
  const nodes = props.flowGraph.getSelectedCells().filter((v) => !v.isEdge())
  parents.value = []

  if (selectedModel.value || nodes.length === 1) {
    const currentModel = selectedModel.value || nodes[0].getData().model
    let nextModel = currentModel.proxy || currentModel
    while (nextModel) {
      if (nextModel.parent) {
        parents.value.unshift(nextModel)
      }
      nextModel = nextModel.parent
    }
  }
}

// 处理节点选择
const handleSelect = (component: ELNode) => {
  selectedModel.value = component
  updateBreadcrumb()
}

// 处理强制更新
const handler = () => {
  selectedModel.value = null
  updateBreadcrumb()
}

// 处理点击面包屑项
const handleClick = (elNodeModel: ELNode) => {
  props.flowGraph.cleanSelection()
  props.flowGraph.select(elNodeModel.getNodes())
  selectedModel.value = elNodeModel
  props.flowGraph.trigger('model:select', elNodeModel)
}

// 组件挂载时绑定事件
onMounted(() => {
  props.flowGraph.on('settingBar:forceUpdate', handler)
  props.flowGraph.on('model:select', handleSelect)
})

// 组件卸载时解绑事件
onUnmounted(() => {
  props.flowGraph.off('settingBar:forceUpdate', handler)
  props.flowGraph.off('model:select', handleSelect)
})
</script>
