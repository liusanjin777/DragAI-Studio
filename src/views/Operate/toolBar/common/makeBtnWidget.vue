<script lang="ts" setup>
import { computed, type VNode } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { Graph } from '@antv/x6'
import styles from '../index.module.less'
import { useGraph } from '@/hooks/useGraph'

interface IOptions {
  tooltip: string
  getIcon: (flowGraph: Graph) => VNode
  handler: (flowGraph: Graph, props?: any) => void
  disabled?: (flowGraph: Graph) => boolean
  selected?: (flowGraph: Graph) => boolean
}

const props = defineProps({
  options: {
    type: Object as () => IOptions,
    required: true
  }
})

const options = props.options

const flowGraph = useGraph()
const { tooltip, getIcon, handler } = options

const wrapperClass = computed(() => {
  const cls = [styles.btnWidget]
  let { disabled = false, selected = false } = options

  if (typeof disabled === 'function') {
    disabled = disabled(flowGraph)
    disabled && cls.push(styles.disabled)
  }

  if (typeof selected === 'function') {
    selected = selected(flowGraph)
    selected && cls.push(styles.selected)
  }

  return cls.join(' ')
})

const onClick = (): void => {
  const disabled =
    typeof options.disabled === 'function' ? options.disabled(flowGraph) : false
  if (disabled) return
  handler(flowGraph, props)
  flowGraph.trigger('toolBar:forceUpdate')
}
</script>

<template>
  <Tooltip :title="tooltip">
    <div :class="wrapperClass" @click="onClick">
      <component :is="getIcon(flowGraph)" />
    </div>
  </Tooltip>
</template>

<style lang="less" module>
.btnWidget {
  // 样式保持不变
}
</style>
