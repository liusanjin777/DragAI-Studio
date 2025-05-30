<script setup lang="ts">
import { ref } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { Menu } from '@/utils/layout/menu'
const router = useRouter()
const selectedKeys = ref<string[]>(['/'])
const handleClick: MenuProps['onClick'] = (menuInfo) => {
  // console.log('click ', menuInfo)
  router.push(`${menuInfo.key}`)
}
</script>

<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="light"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
    @click="handleClick"
  >
    <a-menu-item v-for="item in Menu" :key="item.path">
      <span>{{ item.name }}</span>
    </a-menu-item>
  </a-menu>
</template>

<style scoped lang="less"></style>
