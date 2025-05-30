/**
 * 使用VueUse的useDark进行深色主题切换
 */

import { useDark, useToggle } from '@vueuse/core'

// 创建link元素,引入dark.less
const createDarkStyleElement = () => {
  const newDarkTheme = document.createElement('link')
  newDarkTheme.setAttribute('rel', 'stylesheet')
  newDarkTheme.setAttribute('href', '/src/style/dark.less')
  newDarkTheme.setAttribute('id', 'dark-theme-style')
  const docHead = document.querySelector('head')
  docHead?.append(newDarkTheme)
}
// 移除link元素
const removeDarkStyleElement = (element: HTMLElement) => {
  const parentNode = element.parentNode
  parentNode?.removeChild(element)
}
// 切换深色主题
const toggleTheme = (isDark = true) => {
  const darkStyleElement = document.querySelector('#dark-theme-style')
  if (isDark) {
    // 如果#dark-theme-style不存在,则创建
    if (darkStyleElement == null) {
      createDarkStyleElement()
    }
  } else {
    // 如果#dark-theme-style存在,则移除
    if (darkStyleElement != null) {
      removeDarkStyleElement(darkStyleElement as HTMLElement)
    }
  }
}

// VueUse
export const isDark = useDark({
  onChanged(isDark) {
    toggleTheme(isDark)
  }
})
export const toggleDark = useToggle(isDark)

/**
 * 处理深色模式下刷新页面后 dark.less 样式被覆盖问题
 * 切换为深色模式后,会创建link元素,引入dark.less
 * 但是刷新页面后,部分样式文件会被添加到该 link 元素后,导致深色样式失效,需要给换到最后
 */
export const handleDarkModeStyle = () => {
  const darkStyleElement = document.querySelector('#dark-theme-style')
  if (darkStyleElement != null) {
    // 如果存在深色样式的 css 文件,则先移除,再添加
    removeDarkStyleElement(darkStyleElement as HTMLElement)
    createDarkStyleElement()
  }
}
