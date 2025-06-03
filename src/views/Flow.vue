<script setup lang="ts">
import LiteFlowEditor from '@/components/LiteFlowEditor/index.vue'
import { ConnectStatus, ChainManager } from '@/components/components'

const widgets = [ConnectStatus, ChainManager]
</script>

<template>
  <div class="liteflow-editor-app-wrapper">
    <LiteFlowEditor :widgets="widgets" />
  </div>
</template>
