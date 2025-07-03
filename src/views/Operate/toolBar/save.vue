<script setup lang="ts">
import { h } from 'vue'
import { SaveOutlined } from '@ant-design/icons-vue'
import { shortcuts } from '@/utils/common/shortcuts'
import makeBtnWidget from './common/makeBtnWidget.vue'

// 定义组件选项
const options = {
  tooltip: '保存',
  handler: shortcuts.save.handler,
  getIcon: () => h(SaveOutlined)
}
</script>

<template>
  <makeBtnWidget :options="options" />
</template>
