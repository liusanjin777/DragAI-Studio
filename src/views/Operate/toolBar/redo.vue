<script setup lang="ts">
import { h } from 'vue'
import { RedoOutlined } from '@ant-design/icons-vue'
import { shortcuts } from '@/utils/common/shortcuts'
import { history } from '@/hooks/useHistory'
import makeBtnWidget from './common/makeBtnWidget.vue'

// 定义组件选项
const options = {
  tooltip: '重做',
  handler: shortcuts.redo.handler,
  getIcon: () => h(RedoOutlined),
  disabled: () => !history.canRedo()
}
</script>

<template>
  <makeBtnWidget :options="options" />
</template>
