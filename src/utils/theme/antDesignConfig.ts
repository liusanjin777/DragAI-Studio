/**
 * Ant Design Vue 修改组件默认样式: 修改组件内部 props 的默认值 default 的值
 */
import { Input } from 'ant-design-vue'

// 获取组件的props
const InputProps = Input.props

// 修改默认props

// 输入框显示清空按钮
InputProps.allowClear = { type: Boolean, default: true }
