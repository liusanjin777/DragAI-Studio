<script setup lang="ts">
import { computed } from 'vue'
import HeaderNav from '../components/HeaderNav.vue'
import HeaderNavMobile from '../components/HeaderNavMobile.vue'
import HeaderRight from '../components/HeaderRight.vue'
import HeaderRightMobile from '../components/HeaderRightMobile.vue'
import useMediaQuery from '@/hooks/useMediaQuery'
const screenSize = useMediaQuery()
const isMobile = computed(
  () => screenSize.value === 'sm' || screenSize.value === 'xs'
)
const isBig = computed(
  () =>
    screenSize.value === 'xxxl' ||
    screenSize.value === 'xxl' ||
    screenSize.value === 'xl'
)
</script>

<template>
  <a-layout class="default-page-layout">
    <a-layout-header class="layout-header">
      <div class="logo" :class="{ small: !isBig }" />
      <div class="flex items-center justify-between flex-grow">
        <template v-if="isBig">
          <HeaderNav />
          <HeaderRight />
        </template>
        <template v-else-if="isMobile">
          <HeaderNavMobile class="ml-6" />
          <HeaderRightMobile />
        </template>
        <template v-else>
          <HeaderNav />
          <HeaderRightMobile />
        </template>
      </div>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<style lang="less">
.default-page-layout {
  height: 100%;

  .layout-header {
    display: flex;
    align-items: center;
    padding: 0 24px;
    background-color: @base-bg-color;

    .logo {
      margin-right: 24px;
      width: 120px;
      height: 32px;
      background: rgb(0 0 0 / 30%);
      flex: none;
      &.small {
        width: 32px;
        margin-right: 0;
      }
    }
    .ant-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .divide-line {
      background-color: rgba(60, 60, 67, 0.1);
    }
  }

  .layout-content {
    overflow: auto;
    padding: 24px;
  }
}
.default-layout-header-dropdown {
  .ant-dropdown-menu-title-content {
    display: flex;
    align-items: center;
  }
}
.default-layout-head-nav-dropdown {
  .ant-dropdown-menu-item {
    width: 160px;
    text-align: center;
    padding: 12px;
  }
}
.default-layout-caret-icon {
  transition: transform 0.2s ease-in-out;
  &.caret-up {
    transform: rotate(-180deg);
    color: #007386;
  }
}
</style>
