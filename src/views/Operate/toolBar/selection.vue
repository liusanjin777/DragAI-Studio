<script setup lang="ts">
import { h } from 'vue'
import { GatewayOutlined } from '@ant-design/icons-vue'
import makeBtnWidget from './common/makeBtnWidget.vue'
import type { Graph } from '@antv/x6'

// 定义组件选项
const options = {
  tooltip: '框选节点',
  getIcon: () => h(GatewayOutlined),
  handler: (flowGraph: Graph) => {
    const needEnableRubberBand = !flowGraph?.isRubberbandEnabled()
    if (needEnableRubberBand) {
      flowGraph?.disablePanning()
      flowGraph?.enableRubberband()
    } else {
      flowGraph?.enablePanning()
      flowGraph?.disableRubberband()
    }
  },
  selected: (flowGraph: Graph) => {
    return flowGraph?.isRubberbandEnabled()
  }
}
</script>

<template>
  <makeBtnWidget :options="options" />
</template>
