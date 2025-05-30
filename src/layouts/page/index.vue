<script setup lang="ts">
import { ref } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import Sider from '../components/Sider.vue'
import HeaderRight from '../components/HeaderRight.vue'
import HeaderRightMobile from '../components/HeaderRightMobile.vue'
const collapsed = ref<boolean>(false)
const isMobile = ref<boolean>(false)
const visible = ref<boolean>(false)
// 监听媒体查询尺寸
const mql = window.matchMedia('(min-width: 768px)')
function mqHandler(e: any) {
  isMobile.value = !e.matches
}
// 初始化执行一次
mqHandler(mql)
mql.addEventListener('change', mqHandler)
// 切换展示
function toggle() {
  if (isMobile.value) {
    visible.value = !visible.value
  } else {
    collapsed.value = !collapsed.value
  }
}
</script>

<template>
  <a-layout class="page-layout">
    <a-drawer
      v-if="isMobile"
      class="page-layout-drawer"
      placement="left"
      :closable="false"
      width="200"
      v-model:visible="visible"
    >
      <Sider />
    </a-drawer>
    <a-layout-sider
      v-else
      v-model:collapsed="collapsed"
      :trigger="null"
      breakpoint="xl"
      collapsible
    >
      <Sider />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="page-layout-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="toggle"
        />
        <menu-fold-outlined v-else class="trigger" @click="toggle" />
        <HeaderRightMobile v-if="isMobile" />
        <HeaderRight v-else />
      </a-layout-header>
      <a-layout-content
        :style="{
          padding: '24px',
          minHeight: '280px',
          overflowY: 'auto'
        }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less">
.page-layout {
  height: 100%;

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    transition: color 0.3s;
    line-height: 64px;
    cursor: pointer;

    &:hover {
      color: #1890ff;
    }
  }

  .ant-layout-sider {
    background: @base-bg-color;
    border-right: 1px solid #f0f0f0;
    border-right: 1px solid @base-border-color;
    .ant-menu {
      height: calc(100% - 64px);
    }
  }

  .page-layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px 0 0;
    background: @base-bg-color;
    .ant-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .divide-line {
      background-color: rgba(60, 60, 67, 0.1);
    }
  }
}

.page-layout-drawer {
  .ant-drawer-body {
    padding: 0;
  }
}
</style>
