## 类脑前端 vue3 + TypeScript + vite 模板

### UI 库引入 (element-plus, ant-design-vue)

- 1. element-plus 引入（按需引入）

```js
// vite.config.ts

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
```

- 2. ant-design-vue 引入（按需引入）

```js
// vite.config.ts

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ]
})
```

### 项目内安装 stylelint；

依赖之间版本会冲突，在 package.json 中先写入以下依赖版本后直接安装

```json
"postcss": "^8.4.21",
"postcss-html": "^1.3.0",
"postcss-less": "^6.0.0",
"stylelint": "^14.6.0",
"stylelint-config-html": "^1.0.0",
"stylelint-config-prettier": "^9.0.3",
"stylelint-config-recommended": "^7.0.0",
"stylelint-config-recommended-less": "^1.0.4",
"stylelint-config-recommended-vue": "^1.4.0",
"stylelint-config-standard": "^25.0.0",
"stylelint-config-standard-vue": "^1.0.0",
"stylelint-less": "^1.0.5",
"stylelint-order": "^5.0.0",
```

### 在 vscode 中使用 stylelint；保存时自动修复

（1）打开 VScode 的设置，修改 settings.json

```json
//开启自动修复
"editor.codeActionsOnSave": {
  "source.fixAll.stylelint": true, // 开启 stylelint 自动修复
},
// 配置 stylelint 检查的文件类型范围
"stylelint.validate": [
  "css",
  "less",
  "postcss",
  "scss",
  "sass",
  "vue"
],
"stylelint.enable": true,
"css.validate": false,
"less.validate": false,
"scss.validate": false,
```

### 主题定制 & 深色模式

主题定制和深色模式适配了:

1. ELement Plus
2. Ant Design Vue
3. 自定义颜色

请先查看各个文件内的样式,不需要的样式请自行删除,以免产生样式冲突。选择一个组件库后,请将另一个组件库的样式代码删掉

#### 主题定制

- 在`/style/color.less`内配置项目主题色和其他颜色变量(文件内的两个:root 选择器样式是 vue 脚手架自动生成的,项目初始化时,建议删除这两部分,自行添加项目的颜色变量)
- 在`/style/antd.less`内配置 Ant Design Vue 颜色
- 在`/style/element.less`内配置 Element Plus 颜色
- 在`/utils/theme/`内配置组件公共默认样式
- 在`/style/mixin.less`内编写 LESS 混合函数,类似 Tailwind 原子化 CSS 的理念

样式文件位置:

- main.ts
- utils/theme/
- style/
  - color.less
  - antd.less
  - element.less

#### 深色模式

- 兼容 ELement Plus、Ant Design Vue、自定义颜色
- 适配电脑系统浅色/深色模式

深色模式采用[VueUse-useDark](https://vueuse.org/core/useDark/#usedark)的方案,调用 toggleDark()即可,直接适配了 Element Plus,再引入 AntD Vue 的深色样式文件。
如果不需要深色模式,删除对应样式文件和 `dark.ts` 文件

样式文件位置:

- main.ts
- /utils/theme/dark.ts
- /style/
  - dark.less

#### 注意点<font color=Red>!!!</font>

- 按需引入会覆盖主题色定制,所以需要配置`importStyle: false`,全局引入样式文件
- tailwind 会覆盖按钮的背景等样式,需要先引入 tailwind,再引入 antd 和 element 的样式文件
- 切换深色模式时,如果过渡效果不统一,需要为该组件单独设置 transition 属性

#### 代码提交规范

- git 三步骤提交，使用 git cz 代替第二步 git commit -m ‘’
- git cz 命令报错，请全局安装 commitizen 后在尝试执行 npm install commitizen -g

### 统一错误处理

```text
统一错误处理主要是针对服务端返回的code、http状态码的解析翻译为准确的提示语反馈给用户

条件：1、http状态码必须为200
     2、code必须为200
     3、status必须为200
    不满足以上任何一个条件均会在字典中匹配对应的错误信息 如无 则提示"系统异常，请联系管理员！"

```

文件位置：

`/src/utils/message/err.ts` 错误提示语集合 抛出提示语方法

```typescript
/**
 *
 * @param data 服务端返回数据结构 {code: 0, message: 'message'}
 * @returns error message
 */
export const MessageCodeError = (
  data: MsgCodeResponse,
  defaultMsg: string = '系统异常，请联系管理员！'
): string => {
  return typeof data.code === 'number'
    ? codeDic[data.code]
    : typeof data.message === 'string'
    ? data.message
    : defaultMsg
}
```

`/src/utils/request/interceptor.ts` 拦截器中对网络请求的返回数据统一处理

### 单元测试

模版使用 Vitest 单元测试框架，使用到的依赖有：

```json
"vitest": "^0.25.6",
"jsdom": "^20.0.3",
"@vue/test-utils": "^2.2.6",
```

文件位置：

示例组件：`/src/components/demos/ContentHeaderDemo.vue`

示例测试用例：`/src/components/__tests__/ContentHeaderDemo.spec.ts`

相关文档地址：

Vitest 官网地址：https://cn.vitest.dev/

Vue Test Utils 官网地址：https://test-utils.vuejs.org/

### 自适应布局

模版目前开发了两种基本布局：竖向导航和横向导航两种

1. 竖向导航：

```text
页面位置：`/src/layouts/page/index.vue`

针对当前屏幕宽度实现三种样式, 触发的断点如下：
min-width：1200px
(max-width: 1200px) and (min-width：768px)
max-width: 768px
```

2. 横向导航：

```text
页面位置：`/src/layouts/page/default.vue`

用到的js文件：`/src/hooks/useMediaQuery`
屏幕断点：xs sm md lg xl xxl xxxl
针对这几个断点实现三种样式：
1、xl xxl xxxl
2、md lg
3、xs sm
```
