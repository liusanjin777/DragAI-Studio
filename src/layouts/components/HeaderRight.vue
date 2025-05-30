<script setup lang="ts">
import { isDark, toggleDark } from '@/utils/theme/dark'
import {
  WhatsAppOutlined,
  BellOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
</script>

<template>
  <div class="style-1 flex items-center">
    <div class="flex items-center mr-6">
      <whats-app-outlined />
      <span class="ml-1">帮助与支持</span>
    </div>
    <div class="flex items-center mr-3">
      <bell-outlined />
      <span class="ml-1">消息</span>
    </div>
    <div class="divide-line w-0.5 h-5 mr-3"></div>
    <div
      @click="toggleDark()"
      class="mr-6"
      :title="isDark ? '深色模式' : '浅色模式'"
    >
      <a-switch :checked="isDark">
        <template #checkedChildren>深</template>
        <template #unCheckedChildren>浅</template>
      </a-switch>
    </div>
    <a-avatar
      :size="{ xs: 32, sm: 32, md: 32, lg: 32, xl: 40, xxl: 40 }"
      class="flex items-center justify-center"
    >
      <template #icon>
        <UserOutlined :style="{ fontSize: '20px' }" />
      </template>
    </a-avatar>
  </div>
</template>

<style scoped lang="less"></style>
