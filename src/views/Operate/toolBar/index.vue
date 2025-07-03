<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// eslint-disable-next-line vue/no-dupe-keys
import { tools as widgets } from './index'
import { useGraph } from '@/hooks/useGraph'
import styles from './index.module.less'

interface IProps {
  widgets?: any[]
}

const props = defineProps<IProps>()

const flowGraph = useGraph()
const forceUpdateFlag = ref(0)

// 强制更新组件
const forceUpdate = () => {
  forceUpdateFlag.value++
}

onMounted(() => {
  flowGraph?.on('toolBar:forceUpdate', forceUpdate)
})

onUnmounted(() => {
  flowGraph?.off('toolBar:forceUpdate', forceUpdate)
})
</script>

<template>
  <div :class="styles.liteflowEditorToolBarContainer">
    <div
      v-for="(group, groupIndex) in widgets"
      :key="groupIndex"
      :class="styles.liteflowEditorToolBarGroup"
    >
      <component
        v-for="(ToolItem, itemIndex) in group"
        :key="itemIndex"
        :is="ToolItem"
      />
    </div>

    <div
      v-if="props.widgets && props.widgets.length"
      :class="styles.liteflowEditorToolBarGroup"
    >
      <component
        v-for="(WidgetItem, index) in props.widgets"
        :key="index"
        :is="WidgetItem"
      />
    </div>
  </div>
</template>
