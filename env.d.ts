/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare interface LiteFlowNode {
  type: string
  label: string
  icon: string
  shape?: string
  node?: any
  disabled?: boolean
}

declare interface IMenuInfo {
  x: number
  y: number
  scene: string
  visible: boolean
}

declare type IContextPadScene = 'append' | 'prepend' | 'replace'
