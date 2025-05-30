import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'dayjs/locale/zh-cn'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { handleDarkModeStyle } from './utils/theme/dark'
import dayjs from 'dayjs'

import './style/main.less'
import './utils/theme/antDesignConfig'
import './style/index.css'

// 处理深色模式下刷新页面后 dark.less 样式被覆盖问题
handleDarkModeStyle()

dayjs.locale('zh-cn')

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(pinia)
app.mount('#app')
