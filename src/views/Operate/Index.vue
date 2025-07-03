<template>
  <div class="operate-container">
    <div class="flex w-full h-10">
      <ToolBar />
      <Header />
    </div>
    <div class="content-area">
      <div class="placeholder-content">
        <a-empty description="暂无数据" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import ToolBar from './toolBar/index.vue'
</script>

<style scoped lang="less">
.operate-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
}

.content-area {
  overflow: auto;
  padding: 16px;
  flex: 1;
}

.placeholder-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
}
</style>
