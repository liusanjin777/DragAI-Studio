<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { px2remTransformer, theme } from 'ant-design-vue'
import { setRootFontSize } from '@/utils/common'
import { isDark } from '@/utils/theme/dark'

const px2rem = px2remTransformer({
  rootValue: 16 // @default 16
})

// 监听窗口大小变化事件，重新设置根节点字体大小
setRootFontSize()
window.addEventListener('resize', setRootFontSize)

// 下拉菜单跟着父节点或者body
function getPopupContainer(triggerNode: HTMLElement) {
  if (triggerNode && triggerNode.className.indexOf('ant-select') > -1) {
    if (triggerNode.className.indexOf('select-body') > -1) return document.body
    return triggerNode.parentNode
  }
  return document.body
}

// CI/CD rebuild后切换路由的问题修复
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason
  if (
    error instanceof Error &&
    error.message.includes('Failed to fetch dynamically imported module')
  ) {
    // 这里可以执行你的错误处理逻辑
    console.error(
      '发生了 "Failed to fetch dynamically imported module" 错误:',
      error
    )
    window.location.reload()
  }
})
</script>

<template>
  <a-style-provider :transformers="[px2rem]">
    <a-config-provider
      :locale="zhCN"
      :getPopupContainer="getPopupContainer"
      :theme="{
        token: {
          colorPrimary: '#00b96b'
        },
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }"
    >
      <router-view />
    </a-config-provider>
  </a-style-provider>
</template>

<style lang="less">
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
