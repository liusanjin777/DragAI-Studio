<template>
  <div :class="$style.liteflowNodeToolBar">
    <div
      v-if="toolbar.prepend"
      :class="$style.liteflowAddNodePrepend"
      @click="onPrepend"
    >
      <Tooltip title="前面插入节点">
        <div :class="$style.liteflowAddNodePrependIcon"></div>
      </Tooltip>
    </div>
    <div
      v-if="toolbar.append"
      :class="$style.liteflowAddNodeAppend"
      @click="onAppend"
    >
      <Tooltip title="后面插入节点">
        <div :class="$style.liteflowAddNodeAppendIcon"></div>
      </Tooltip>
    </div>
    <div
      v-if="toolbar.replace || toolbar.delete"
      :class="$style.liteflowTopToolBar"
    >
      <div :class="$style.liteflowToolBarBtn" @click="onReplace">
        <Tooltip title="替换当前节点">
          <edit-outlined />
        </Tooltip>
      </div>
      <div
        :class="[$style.liteflowToolBarBtn, $style.liteflowDeleteNode]"
        @click="onDelete"
      >
        <Tooltip title="删除节点">
          <delete-outlined />
        </Tooltip>
      </div>
    </div>
    <div
      v-if="toolbar.collapse"
      :class="[$style.liteflowBottomToolBar, $style.show]"
    >
      <div
        :class="[$style.liteflowToolBarBtn, $style.liteflowCollapseNode]"
        @click="onCollapse"
      >
        <Tooltip :title="collapsed ? '展开节点' : '折叠节点'">
          <plus-square-outlined v-if="collapsed" />
          <minus-square-outlined v-else />
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Node } from '@antv/x6'
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'
import { Modal, Tooltip } from 'ant-design-vue'
import {
  DeleteOutlined,
  EditOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined
} from '@ant-design/icons-vue'
import { INodeData } from '../../model/node'
import { history } from '../../hooks/useHistory'

const props = defineProps<{
  node: Node
}>()

const { node } = props
const {
  model,
  toolbar = {
    append: true,
    delete: true,
    prepend: true,
    replace: true,
    collapse: false
  }
} = node.getData<INodeData>() || {}

const collapsed = computed(() => model?.isCollapsed())

const showContextPad = debounce((info: any) => {
  node.model?.graph?.trigger('graph:showContextPad', info)
}, 100)

const onPrepend = (event: any) => {
  showContextPad({
    x: event.clientX,
    y: event.clientY,
    node,
    scene: 'prepend',
    title: '前面插入节点',
    edge: null
  })
}

const onAppend = (event: any) => {
  showContextPad({
    x: event.clientX,
    y: event.clientY,
    node,
    scene: 'append',
    title: '后面插入节点',
    edge: null
  })
}

const onReplace = (event: any) => {
  node.model?.graph?.select(model.getNodes())
  node.model?.graph?.trigger('model:select', model)
  showContextPad({
    x: event.clientX,
    y: event.clientY,
    node,
    scene: 'replace',
    title: '替换当前节点',
    edge: null
  })
}

const onDelete = debounce(() => {
  node.model?.graph?.select(model.selectNodes())
  node.model?.graph?.trigger('model:select', model)
  Modal.confirm({
    title: '确认要删除选中的节点？',
    content: '点击确认按钮进行删除，点击取消按钮返回',
    onOk() {
      if (model.remove()) {
        node.model?.graph?.cleanSelection()
        history.push()
      }
    }
  })
}, 100)

const onCollapse = debounce(() => {
  model.toggleCollapse()
  node.model?.graph?.trigger('model:change')
}, 100)
</script>

<style lang="less" module>
@import './index.module.less';
</style>
