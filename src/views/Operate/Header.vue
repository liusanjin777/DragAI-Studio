<template>
  <div class="header-container">
    <div class="left-section">
      <div class="select-container">
        <span class="label">测试数据：</span>
        <a-select v-model:value="selectedChain" style="width: 200px">
          <a-select-option value="chain">子流程(CHAIN)</a-select-option>
        </a-select>
      </div>

      <div class="status-tag">
        <a-tag :color="serverConnected ? 'success' : 'error'">
          {{ serverConnected ? '服务器连接成功' : '服务器连接失败' }}
        </a-tag>
      </div>
    </div>

    <div class="right-section">
      <div class="select-container">
        <a-select
          v-model:value="selectedData"
          style="width: 200px"
          placeholder="请选择接口数据"
        >
          <a-select-option value="data1">接口数据1</a-select-option>
          <a-select-option value="data2">接口数据2</a-select-option>
        </a-select>
      </div>

      <div class="button-group">
        <a-button type="default">
          <template #icon>
            <SaveOutlined />
          </template>
          保存
        </a-button>
        <a-button type="default">
          <template #icon>
            <DeleteOutlined />
          </template>
          删除
        </a-button>
        <a-button type="primary">
          <template #icon>
            <PlusOutlined />
          </template>
          新增
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  SaveOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'

// 选中的链
const selectedChain = ref('chain')

// 服务器连接状态
const serverConnected = ref(false)

// 选中的接口数据
const selectedData = ref('')

// 这里可以添加检查服务器连接状态的逻辑

// onMounted(() => {
//   checkServerConnection()
// })
//
// async function checkServerConnection() {
//   try {
//     const response = await fetch('/api/checkConnection')
//     serverConnected.value = response.ok
//   } catch (error) {
//     serverConnected.value = false
//   }
// }
</script>

<style scoped lang="less">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
}

.select-container {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.label {
  margin-right: 8px;
  white-space: nowrap;
}

.status-tag {
  margin-right: 16px;
}

.button-group {
  display: flex;
  gap: 8px;
}
</style>
