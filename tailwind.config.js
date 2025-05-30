/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 颜色变量,与 style/color.less 文件中的变量一致
      colors: {
        'primary-text-color': '#303133',
        'regular-text-color': '#606266',
        'secondary-text-color': '#909399',
        'placeholder-text-color': '#a8abb2',
        'disabled-text-color': '#c0c4cc'
      }
    }
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      // 第二种方式设置基础样式
      addBase({
        // h1: { fontSize: theme('fontSize.2xl') },
        // h2: { fontSize: theme('fontSize.xl') },
        // h3: { fontSize: theme('fontSize.lg') }
      })
    })
  ]
}
