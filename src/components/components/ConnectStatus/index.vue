<template>
  <span class="connect-status-container">
    <a-tag :color="status">{{ tagText }}</a-tag>
  </span>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { Tag as ATag } from 'ant-design-vue'
import request from 'umi-request'
import { Status } from './types'
import './index.less'

const status = ref<Status>(Status.pending)
const tagText = ref('服务器连接失败')

const syncServer = async () => {
  try {
    const data = await request('/api/getChainList', { method: 'GET' })
    if (data && data.length) {
      status.value = Status.connected
    } else {
      status.value = Status.disconnected
    }
  } catch {
    status.value = Status.disconnected
  }
}

// 监听状态变化更新显示文本
watch(status, (newStatus) => {
  if (newStatus === Status.connected) {
    tagText.value = '服务器连接成功'
  } else if (newStatus === Status.pending) {
    tagText.value = '服务器连接中'
  } else {
    tagText.value = '服务器连接失败'
  }
})

onMounted(() => {
  syncServer()
})
</script>

<style scoped>
.connect-status-container {
  /* 保持原有样式 */
}
</style>
