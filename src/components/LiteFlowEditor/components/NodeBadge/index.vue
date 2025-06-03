<template>
  <div v-if="badge" :class="styles.liteflowShapeBadgeWrapper">
    <img
      :class="styles.liteflowShapeBadgeSvg"
      :src="getIconByType(currentModel.type)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Node } from '@antv/x6'
import {
  NODE_TYPE_INTERMEDIATE_END,
  NodeTypeEnum,
  ConditionTypeEnum
} from '../../constant'
import { getIconByType } from '../../cells'
import styles from './index.module.less'

interface Props {
  node: Node
}

const props = defineProps<Props>()

const currentModel = computed(() => {
  const { model } = props.node.getData()
  return model ? model.proxy || model : null
})

const badge = computed(() => {
  if (!currentModel.value) return false

  return (
    currentModel.value.type !== props.node.shape &&
    currentModel.value.type !== NodeTypeEnum.COMMON &&
    currentModel.value.type !== NodeTypeEnum.BOOLEAN &&
    currentModel.value.type !== NodeTypeEnum.VIRTUAL &&
    currentModel.value.type !== ConditionTypeEnum.CHAIN &&
    NODE_TYPE_INTERMEDIATE_END !== props.node.shape
  )
})
</script>

<style module>
@import './index.module.less';
</style>
