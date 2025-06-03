<template>
  <div>
    <Tooltip title="新增" placement="bottom">
      <Button
        type="primary"
        @click="showModal"
        class="chain-manager-add-btn"
        :disabled="disabled"
      >
        <PlusOutlined /> 新增
      </Button>
    </Tooltip>

    <Modal
      title="新增Chain"
      :class="['chain-manager-settings-modal']"
      :width="900"
      v-model:open="isModalOpen"
      @cancel="handleCancel"
    >
      <div>
        <Form
          layout="horizontal"
          ref="formRef"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
          :model="formState"
        >
          <Form.Item
            name="chainId"
            label="chainId"
            :rules="[{ required: true, message: '请输入Chain ID' }]"
          >
            <Input
              v-model:value="formState.chainId"
              placeholder="请输入Chain ID"
              allow-clear
            />
          </Form.Item>

          <Form.Item
            name="elTemplateId"
            label="chainTemplate"
            :rules="[{ required: true, message: '请选择Chain模板' }]"
          >
            <Select
              v-model:value="formState.elTemplateId"
              placeholder="请选择Chain模板"
              style="width: 100%"
            >
              <Select.Option
                v-for="chain in chains"
                :key="chain.chainId"
                :value="chain.chainId"
              >
                {{ chain.chainId }}
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
      <template #footer>
        <Button key="emptyCanvas" @click="handleEmptyCanvas"
          >创建空白画布</Button
        >,
        <Button type="primary" key="save" @click="handleOk">保存</Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Button, Form, Input, Modal, Select, Tooltip } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import request from 'umi-request'

interface Chain {
  chainId: string
  elJson: any
}

interface Props {
  chains: Chain[]
  disabled?: boolean
}

defineProps<Props>()
const emit = defineEmits(['change'])

const isModalOpen = ref(false)
const formRef = ref()
const formState = reactive({
  chainId: '',
  elTemplateId: ''
})

const showModal = () => {
  isModalOpen.value = true
  formState.chainId = ''
  formState.elTemplateId = ''
}

const handleOk = async () => {
  try {
    await formRef.value.validate()
    const { chainId, elTemplateId } = formState
    const data = await request(`/api/getChainById?chainId=${elTemplateId}`, {
      method: 'GET'
    })
    const elJson = data?.elJson || {}
    emit('change', { chainId, elJson })
    isModalOpen.value = false
  } catch (errorInfo) {
    console.log('Failed:', errorInfo)
  }
}

const handleCancel = () => {
  isModalOpen.value = false
}

const handleEmptyCanvas = () => {
  isModalOpen.value = false
  emit('change', undefined)
}
</script>
