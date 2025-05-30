<script setup lang="ts">
import type { PropType } from 'vue'

type NavItem = {
  label: string
  value: string
}
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  nav: {
    type: Array as PropType<NavItem[]>,
    default: () => []
  },
  active: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['checkNav'])
function checkNav(item: NavItem) {
  emit('checkNav', item)
}
</script>

<template>
  <div class="layout-content-header">
    <div class="left-content">
      <div class="content-title">{{ title }}</div>
      <div class="divide-line"></div>
      <ul class="nav-list">
        <li
          v-for="(item, index) in nav"
          :key="index"
          :class="{ active: item.value === active }"
          @click="checkNav(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="right-content">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-content-header {
  display: flex;
  align-items: center;

  .left-content {
    display: flex;
    align-items: center;

    .content-title {
      font-size: 24px;
      font-weight: 600;
      color: #202f3c;
    }

    .divide-line {
      margin-left: 20px;
      width: 2px;
      height: 16px;
      background-color: #9a9a9a;
    }

    ul.nav-list {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;

      li {
        margin-left: 32px;
        font-size: 18px;
        list-style: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;

        &.active {
          color: #007386;
          border-color: #007386;
        }
      }
    }
  }
}
</style>
