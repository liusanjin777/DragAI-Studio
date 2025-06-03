<template>
  <div class="liteflow-shape-wrapper">
    <img class="liteflow-shape-svg" :src="icon" />
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Node } from '@antv/x6'

export default defineComponent({
  name: 'NodeView',
  props: {
    icon: {
      type: String,
      required: true
    },
    node: {
      type: Object as () => Node,
      required: true
    }
  }
})
</script>

<style lang="less" scoped>
@import './index.module.less';
</style>
