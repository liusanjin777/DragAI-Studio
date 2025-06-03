<script setup lang="ts">
import { Graph } from '@antv/x6'
import { computed } from 'vue'
import styles from '../index.module.less'

interface Options {
  tooltip: string
  getIcon: (flowGraph: Graph) => any
  getOverlay: (flowGraph: Graph, onChange: (data: any) => void) => any
  handler: (flowGraph: Graph, data: any) => void
  disabled?: (flowGraph: Graph) => boolean
}

const props = defineProps<{
  flowGraph: Graph
  options: Options
}>()
const options = props.options
const { tooltip, getIcon, getOverlay, handler } = props.options

const isDisabled = computed(() => {
  const { disabled = false } = options
  if (typeof disabled === 'function') {
    return disabled(props.flowGraph)
  }
  return disabled
})

const iconWrapperClass = computed(() => {
  const classes = [styles.btnWidget]
  if (isDisabled.value) {
    classes.push(styles.disabled)
  }
  return classes.join(' ')
})

const onChange = (data: any): void => {
  if (isDisabled.value) return
  handler(props.flowGraph, data)
  props.flowGraph.trigger('toolBar:forceUpdate')
}
</script>

<template>
  <a-tooltip :title="tooltip">
    <a-dropdown
      @change="onChange"
      :disabled="isDisabled"
      :overlay="getOverlay"
      trigger="click"
    >
      <div :class="iconWrapperClass">
        <component :is="getIcon(props.flowGraph)" />
        <CaretDownOutlined class="caret" />
      </div>
    </a-dropdown>
  </a-tooltip>
</template>

<style scoped>
.caret {
  margin-left: 2px;
}
</style>
