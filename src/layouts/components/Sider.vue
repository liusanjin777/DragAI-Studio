<script setup lang="ts">
import { ref } from 'vue'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const selectedKeys = ref<string[]>(['/'])
const handleClick: MenuProps['onClick'] = (menuInfo) => {
  // console.log('click ', menuInfo)
  router.push(`${menuInfo.key}`)
}
</script>

<template>
  <div class="logo" />
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="light"
    mode="inline"
    @click="handleClick"
  >
    <a-menu-item key="/">
      <template #icon>
        <user-outlined />
      </template>
      <span>视图</span>
    </a-menu-item>
    <a-menu-item key="/list">
      <template #icon>
        <video-camera-outlined />
      </template>
      <span>列表</span>
    </a-menu-item>
  </a-menu>
</template>

<style scoped lang="less">
.logo {
  height: 32px;
  background: rgba(0, 0, 0, 0.3);
  margin: 16px;
}
</style>
