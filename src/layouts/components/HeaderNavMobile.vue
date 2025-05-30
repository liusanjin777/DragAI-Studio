<script setup lang="ts">
import { ref, computed } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { Menu } from '@/utils/layout/menu'
const router = useRouter()
const visible = ref<boolean>(false)
const selectedKeys = ref<string[]>(['/'])
const handleMenuClick: MenuProps['onClick'] = (menuInfo) => {
  // console.log('click ', menuInfo)
  visible.value = false
  selectedKeys.value = [`${menuInfo.key}`]
  router.push(`${menuInfo.key}`)
}
const selectNavText = computed(() => {
  const findItem = Menu.find((v) => v.path === selectedKeys.value[0])
  return findItem?.name
})
</script>

<template>
  <a-dropdown
    v-model:visible="visible"
    overlayClassName="default-layout-head-nav-dropdown"
    placement="bottom"
    :trigger="['click']"
  >
    <a class="ant-dropdown-link flex items-center" @click.prevent>
      <span class="inline-block text-base mr-1" style="color: #007386">
        {{ selectNavText }}
      </span>
      <caret-down-outlined
        :class="{ 'caret-up': visible }"
        class="default-layout-caret-icon"
      />
    </a>
    <template #overlay>
      <a-menu v-model:selectedKeys="selectedKeys" @click="handleMenuClick">
        <a-menu-item v-for="item in Menu" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped lang="less"></style>
