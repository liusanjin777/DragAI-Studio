import { Graph } from '@antv/x6'
import '@antv/x6-vue3-shape'
import { h } from 'vue'
import {
  ConditionTypeEnum,
  NODE_HEIGHT,
  NODE_TYPE_INTERMEDIATE_END,
  NODE_WIDTH,
  NodeTypeEnum
} from '../constant'

/** AntV X6自定义节点 */
// 开始 & 结束
import Start from './start'
import End from './end'
// 顺序：串行、并行
import Then from './then'
import When from './when'
import Common from './common'
import IntermediateEnd from './intermediate-end'
// 分支：选择、条件
import Switch from './switch'
import If from './if'
// 循环：For、While
import For from './for'
import While from './while'
import Iterator from './iterator'
// 捕获异常：Catch
import Catch from './catch'
// 运算符：与或非
import And from './and'
import Or from './or'
import Not from './not'
// 子流程：Chain
import Chain from './chain'
// 其他辅助节点：虚节点
import Virtual from './virtual'

// AntV X6自定义节点的视图：使用Vue组件
import { NodeBadge, NodeToolBar, NodeView } from '../components'

/** 注册自定义节点到AntV X6 */
;[
  Start,
  End,
  Then,
  When,
  Common,
  IntermediateEnd,
  If,
  Switch,
  For,
  While,
  Iterator,
  Catch,
  And,
  Or,
  Not,
  Virtual,
  Chain
].forEach((cell: LiteFlowNode) => {
  // 注册AntV X6节点
  const { type, label, icon, node = {} } = cell
  Graph.registerNode(type, {
    inherit: 'vue3-shape',
    component: {
      render() {
        return h(
          NodeView,
          { node, icon },
          {
            default: () => [h(NodeBadge, { node }), h(NodeToolBar, { node })]
          }
        )
      }
    },
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    attrs: {
      label: {
        refX: 0.5,
        refY: '100%',
        refY2: 20,
        text: label,
        fill: '#333',
        fontSize: 13,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        textWrap: {
          width: 80,
          height: 60,
          ellipsis: true,
          breakWord: true
        }
      }
    },
    ...node
  })
})

export {
  Start,
  End,
  Common,
  Then,
  When,
  IntermediateEnd,
  Switch,
  If,
  For,
  While,
  Iterator,
  Catch,
  And,
  Or,
  Not,
  Virtual,
  Chain
}

export interface IGroupItem {
  key: string
  name: string
  cellTypes: LiteFlowNode[]
}

export const NODE_GROUP: IGroupItem = {
  key: 'node',
  name: '节点类',
  cellTypes: [{ ...Common, type: NodeTypeEnum.COMMON, shape: Common.type }]
}

export const SEQUENCE_GROUP: IGroupItem = {
  key: 'sequence',
  name: '顺序类',
  cellTypes: [
    { ...Then, type: ConditionTypeEnum.THEN, shape: Then.type },
    { ...When, type: ConditionTypeEnum.WHEN, shape: When.type }
  ]
}

export const BRANCH_GROUP: IGroupItem = {
  key: 'branch',
  name: '分支类',
  cellTypes: [
    { ...Switch, type: ConditionTypeEnum.SWITCH, shape: Switch.type },
    { ...If, type: ConditionTypeEnum.IF, shape: If.type }
  ]
}

export const CONTROL_GROUP: IGroupItem = {
  key: 'control',
  name: '循环类',
  cellTypes: [
    { ...For, type: ConditionTypeEnum.FOR, shape: For.type },
    { ...While, type: ConditionTypeEnum.WHILE, shape: While.type },
    { ...Iterator, type: ConditionTypeEnum.ITERATOR, shape: Iterator.type }
  ]
}

export const OTHER_GROUP: IGroupItem = {
  key: 'other',
  name: '其他类',
  cellTypes: [
    { ...Catch, type: ConditionTypeEnum.CATCH, shape: Catch.type },
    { ...And, type: ConditionTypeEnum.AND, shape: And.type },
    { ...Or, type: ConditionTypeEnum.OR, shape: Or.type },
    { ...Not, type: ConditionTypeEnum.NOT, shape: Not.type },
    { ...Chain, type: ConditionTypeEnum.CHAIN, shape: Chain.type }
  ]
}

export const getIconByType = (nodeType: ConditionTypeEnum | NodeTypeEnum) => {
  switch (nodeType) {
    case ConditionTypeEnum.THEN:
      return Then.icon
    case ConditionTypeEnum.WHEN:
      return When.icon
    case ConditionTypeEnum.SWITCH:
    case NodeTypeEnum.SWITCH:
      return Switch.icon
    case ConditionTypeEnum.IF:
    case NodeTypeEnum.IF:
      return If.icon
    case ConditionTypeEnum.FOR:
    case NodeTypeEnum.FOR:
      return For.icon
    case ConditionTypeEnum.WHILE:
    case NodeTypeEnum.WHILE:
      return While.icon
    case ConditionTypeEnum.ITERATOR:
    case NodeTypeEnum.ITERATOR:
      return Iterator.icon
    case ConditionTypeEnum.CHAIN:
      return Chain.icon
    case ConditionTypeEnum.CATCH:
      return Catch.icon
    case ConditionTypeEnum.AND:
      return And.icon
    case ConditionTypeEnum.OR:
      return Or.icon
    case ConditionTypeEnum.NOT:
      return Not.icon
    case NodeTypeEnum.COMMON:
    default:
      return Common.icon
  }
}

export function getNodeShapeByType(nodeType: NodeTypeEnum): string {
  switch (nodeType) {
    case NodeTypeEnum.BOOLEAN:
    case NodeTypeEnum.BOOLEAN_SCRIPT:
    case NodeTypeEnum.IF:
    case NodeTypeEnum.IF_SCRIPT:
      return NodeTypeEnum.IF
    case NodeTypeEnum.SWITCH:
    case NodeTypeEnum.SWITCH_SCRIPT:
      return NodeTypeEnum.SWITCH
    case NodeTypeEnum.FOR:
    case NodeTypeEnum.FOR_SCRIPT:
      return NodeTypeEnum.FOR
    case NodeTypeEnum.WHILE:
    case NodeTypeEnum.WHILE_SCRIPT:
      return NodeTypeEnum.WHILE
    case NodeTypeEnum.ITERATOR:
      return NodeTypeEnum.ITERATOR
    case NodeTypeEnum.BREAK:
    case NodeTypeEnum.BREAK_SCRIPT:
      return NODE_TYPE_INTERMEDIATE_END
    case NodeTypeEnum.VIRTUAL:
      return NodeTypeEnum.VIRTUAL
    case NodeTypeEnum.COMMON:
    case NodeTypeEnum.FALLBACK:
    case NodeTypeEnum.SCRIPT:
    default:
      return NodeTypeEnum.COMMON
  }
}
