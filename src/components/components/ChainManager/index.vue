<template>
  <div class="chain-manager-wrapper">
    <Select
      v-model:value="currentChain.chainId"
      style="width: 200px"
      placeholder="请选择Chain"
      @change="handleOnChange as any"
    >
      <Select.Option
        v-for="chain in chains"
        :key="chain.chainId"
        :value="chain.chainId"
      >
        {{ chain.chainId }}
      </Select.Option>
    </Select>

    <AddChain
      :chains="chains"
      :disabled="!currentEditor"
      @change="handleAddChain"
    />

    <Tooltip title="保存" placement="bottom">
      <Button
        type="primary"
        :disabled="!currentChain"
        class="chain-manager-save-btn"
        @click="handleSave"
      >
        <SaveOutlined />
        保存
      </Button>
    </Tooltip>

    <Tooltip title="删除" placement="bottom">
      <Button
        type="primary"
        danger
        :disabled="!currentChain"
        class="chain-manager-delete-btn"
        @click="handleDelete"
      >
        <DeleteOutlined />
        删除
      </Button>
    </Tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, type Ref } from 'vue'
import { Select, Button, Tooltip, Modal } from 'ant-design-vue'
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons-vue'
import request from 'umi-request'
import AddChain from './AddChain.vue'

interface Chain {
  chainId: string
  elJson: any
}

const chains = ref<Chain[]>([])
const currentChain = ref<any>()
const currentEditor = inject('currentEditor') as Ref<any>

const getChainList = async () => {
  const data = await request('/api/getChainList', { method: 'GET' })
  if (data && data.length) {
    chains.value = data
  }
}

onMounted(() => {
  getChainList()
})

const handleOnChange = async (chainId: string) => {
  currentChain.value = chains.value.find((chain) => chain.chainId === chainId)
  const data = await request(`/api/getChainById?chainId=${chainId}`, {
    method: 'GET'
  })
  if (data?.elJson) {
    currentEditor.value.fromJSON(data.elJson)
  }
}

const handleSave = async () => {
  const data = { ...currentChain.value, elJson: currentEditor.value.toJSON() }
  const result = await request('/api/updateChain', {
    method: 'POST',
    data
  })

  if (result.code === 'S') {
    Modal.success({ title: '操作成功', content: result.message })
  } else {
    Modal.error({ title: '操作失败', content: result.message })
  }
}

const handleDelete = () => {
  Modal.confirm({
    title: '操作确认',
    content: '请确认是否删除当前记录？',
    async onOk() {
      const result = await request('/api/deleteChain', {
        method: 'POST',
        data: { ...currentChain.value }
      })

      if (result.code === 'S') {
        Modal.success({ title: '操作成功', content: result.message })
        currentChain.value = undefined
        chains.value = chains.value.filter(
          (chain) => chain !== currentChain.value
        )
      } else {
        Modal.error({ title: '操作失败', content: result.message })
      }
    }
  })
}

const handleAddChain = async (newChain: Chain | undefined) => {
  if (!newChain) {
    currentEditor.value.fromJSON({})
    return
  }

  currentEditor.value.fromJSON(newChain.elJson)
  const result = await request('/api/createChain', {
    method: 'POST',
    data: { ...newChain }
  })

  if (result.code === 'S') {
    Modal.success({ title: '操作成功', content: result.message })
    chains.value = [...chains.value, newChain]
    currentChain.value = newChain
  } else {
    Modal.error({ title: '操作失败', content: result.message })
  }
}
</script>
