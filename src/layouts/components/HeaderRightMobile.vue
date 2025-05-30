<script setup lang="ts">
import { isDark, toggleDark } from '@/utils/theme/dark'
import {
  WhatsAppOutlined,
  BellOutlined,
  UserOutlined,
  MenuOutlined
} from '@ant-design/icons-vue'
</script>

<template>
  <div class="style-2 flex items-center">
    <a-avatar
      :size="{ xs: 32, sm: 32, md: 32, lg: 32, xl: 40, xxl: 40 }"
      class="flex items-center justify-center mr-2"
    >
      <template #icon>
        <UserOutlined :style="{ fontSize: '20px' }" />
      </template>
    </a-avatar>
    <a-dropdown
      :trigger="['click']"
      overlayClassName="default-layout-header-dropdown"
      :getPopupContainer="(triggerNode: HTMLElement) => triggerNode.parentNode"
    >
      <a class="ant-dropdown-link" @click.prevent>
        <menu-outlined :style="{ fontSize: '14px', marginLeft: '5px' }" />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">
            <whats-app-outlined />
            <span class="ml-1">帮助与支持</span>
          </a-menu-item>
          <a-menu-item key="2">
            <bell-outlined />
            <span class="ml-1">消息</span>
          </a-menu-item>
          <a-menu-item key="3" @click="toggleDark()">
            <a-switch :checked="isDark" size="small" />
            <span class="ml-1">{{ isDark ? '深色' : '浅色' }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style scoped lang="less"></style>
