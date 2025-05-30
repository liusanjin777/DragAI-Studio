/** 设置根字体大小 */
export const setRootFontSize = () => {
  const screenWidth = window.innerWidth
  const rootFontSize = (16 * screenWidth) / 1920
  document.documentElement.style.fontSize = rootFontSize.toString() + 'px'
}
