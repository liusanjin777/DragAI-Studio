<template>
  <make-btn-widget
    :flowGraph="flowGraph"
    :options="{
      tooltip: '适配窗口',
      getIcon: () => {
        return LayoutOutlined
      },
      handler: handleFitWindow
    }"
  />
</template>

<script lang="ts" setup>
import { Graph } from '@antv/x6'
import { LayoutOutlined } from '@ant-design/icons-vue'
import MakeBtnWidget from './common/makeBtnWidget.vue'
import { MIN_ZOOM } from '../../../constant'

defineProps<{
  flowGraph: Graph
}>()

const handleFitWindow = (flowGraph: Graph) => {
  flowGraph.zoomToFit({ minScale: MIN_ZOOM, maxScale: 1 })
}
</script>
