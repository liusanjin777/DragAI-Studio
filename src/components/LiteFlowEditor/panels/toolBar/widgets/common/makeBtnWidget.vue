<script lang="ts" setup>
import { computed } from 'vue'
import { Tooltip as ATooltip } from 'ant-design-vue'
import { Graph } from '@antv/x6'
import styles from '../index.module.less'
import { useGraph } from '../../../../hooks'

interface IOptions {
  tooltip: string
  getIcon: (flowGraph: Graph) => any
  handler: (flowGraph: Graph, props?: any) => void
  disabled?: (flowGraph: Graph) => boolean
  selected?: (flowGraph: Graph) => boolean
}

defineOptions({
  name: 'BtnWidget'
})

const props = defineProps<{
  options: IOptions
  flowGraph: Graph
}>()

const useflowGraph = useGraph() as Graph
const { tooltip, getIcon, handler } = props.options

const iconWrapperCls = computed(() => {
  const classes = [styles.btnWidget]
  let { disabled = false, selected = false } = props.options

  if (typeof disabled === 'function') {
    disabled = disabled(useflowGraph)
    disabled && classes.push(styles.disabled)
  }

  if (typeof selected === 'function') {
    selected = selected(useflowGraph)
    selected && classes.push(styles.selected)
  }

  return classes.join(' ')
})

const isDisabled = computed(() => {
  const { disabled = false } = props.options
  return typeof disabled === 'function' ? disabled(useflowGraph) : disabled
})

const onClick = (): void => {
  if (isDisabled.value) return
  handler(useflowGraph)
  useflowGraph.trigger('toolBar:forceUpdate')
}
</script>

<template>
  <ATooltip :content="tooltip">
    <div :class="iconWrapperCls" @click="onClick">
      <component :is="getIcon(useflowGraph)" />
    </div>
  </ATooltip>
</template>

<style lang="less" scoped>
.btnWidget {
  cursor: pointer;
  padding: 8px;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.selected {
    color: var(--el-color-primary);
  }
}
</style>
