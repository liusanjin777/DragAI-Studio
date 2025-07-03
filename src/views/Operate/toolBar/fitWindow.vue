<script setup lang="ts">
import { h } from 'vue'
import { LayoutOutlined } from '@ant-design/icons-vue'
import { MIN_ZOOM } from '@/utils/const'
import makeBtnWidget from './common/makeBtnWidget.vue'
import type { Graph } from '@antv/x6'

// 定义组件选项
const options = {
  tooltip: '适配窗口',
  getIcon: () => h(LayoutOutlined),
  handler: (flowGraph: Graph) => {
    flowGraph.zoomToFit({ minScale: MIN_ZOOM, maxScale: 1 })
  }
}
</script>

<template>
  <makeBtnWidget :options="options" />
</template>
