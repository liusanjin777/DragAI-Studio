<script setup lang="ts">
import { h, ref, onMounted, onUnmounted } from 'vue'
import { ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons-vue'
import { MAX_ZOOM, MIN_ZOOM } from '@/utils/const'
import { shortcuts } from '@/utils/common/shortcuts'
import makeBtnWidget from './common/makeBtnWidget.vue'
import { useGraph } from '@/hooks/useGraph'
import styles from './index.module.less'

const flowGraph = useGraph()
const scale = ref(flowGraph?.zoom())

// 缩小按钮选项
const zoomOutOptions = {
  tooltip: '缩小',
  handler: shortcuts.zoomOut.handler,
  getIcon: () => h(ZoomOutOutlined),
  disabled: (flowGraph: any) => {
    return flowGraph?.zoom() <= MIN_ZOOM
  }
}

// 放大按钮选项
const zoomInOptions = {
  tooltip: '放大',
  handler: shortcuts.zoomIn.handler,
  getIcon: () => h(ZoomInOutlined),
  disabled: (flowGraph: any) => {
    return flowGraph?.zoom() >= MAX_ZOOM
  }
}

// 格式化比例
const scaleFormatter = (scaleValue: number | never): string => {
  if (!scaleValue) {
    return '100%'
  }
  return (scaleValue * 100).toFixed(0) + '%'
}

// 监听缩放事件
const handleScale = () => {
  scale.value = flowGraph?.zoom()
}

onMounted(() => {
  flowGraph?.on('scale', handleScale)
})

onUnmounted(() => {
  flowGraph?.off('scale', handleScale)
})
</script>

<template>
  <div :class="styles.zoomContainer">
    <makeBtnWidget :options="zoomOutOptions" />
    <span :class="styles.zoomText">{{ scaleFormatter(scale as number) }}</span>
    <makeBtnWidget :options="zoomInOptions" />
  </div>
</template>
