## 创建 Nuxt3 项目

[Nuxt 官网](https://nuxt.com/) https://nuxt.com/

### 初始化命令

```sh
npx nuxi@latest init <project-name>
```

安装依赖 `npm install`。

✨启动项目，`npm run dev`。

**下载失败问题**

直接上 `git` 下载 https://github.com/nuxt/starter/tree/v3



### 服务端渲染

**SPA 和 SSR 是什么**

- SPA（Single Page Application）单页面应用，在**客户端**通过 JS 动态地构建页面
- SSR（Server-Side Rendering）服务器端渲染，在**服务器端**生成 HTML 页面并发送给客户端

**有什么不同？**

- SPA 的特点是页面切换流畅，动态渲染变化的部分，**用户体验好**，但是对搜索引擎的支持不够友好
- SSR 的特点是对搜索引擎友好，可以提高页面**首次加载速度** 和 **SEO**，但是页面切换可能不够流畅，因为每次都是请求一个完整的 HTML 页面

**Nuxt 框架优势**

- Nuxt 采用了**混合的架构模式**，同时支持 SSR 和 SPA。
- SSR 服务端渲染： 首次访问页面 ，Nuxt.js 在服务器端执行 Vue 组件的渲染过程，并生成初始 HTML。
- SPA 客户端激活：一旦初始 HTML 被发送到浏览器，Vue.js 会接管页面，后续的页面切换则使用 SPA 的方式进行。
- Nuxt 框架优势：**兼顾了 SSR 和 SPA 的优点**。

**适用场景**

企业网站、商品展示 等 C 端网站，对 SEO 搜索更友好，且页面切换流畅，用户体验更好。

**开启或关闭服务端渲染**

Nuxt 默认开启 SSR 服务端渲染，推荐开启，从而兼顾了 SSR 和 SPA 的优点，也利于 SEO 搜索引擎优化。

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // 是否开启 ssr 服务端渲染
  ssr: true,
})
```

## 路由案例

### 目录结构

```sh
├─.nuxt              非工程代码，存放运行或发行的编译结果
├─node_modules       项目依赖
├─public             网站资源目录
├─server             接口服务器目录
├─.gitignore         git 忽略文件
├─.npmrc             npm 配置文件
├─app.vue            根组件
├─nuxt.config.ts     nuxt 配置文件
├─package.json       项目配置文件
├─README.md          项目说明文件
└─tsconfig.json      ts 配置文件
```

### 案例练习

nuxt 有一些**约定的目录**，有特殊功能，如 **pages** 目录的 vue 文件会自动注册路由。

```sh
├─ pages             页面目录，自动注册路由
```

Nuxt.js 自带基于文件的路由系统，无需安装 **vue-router**，无需额外配置。

**参考目录**

```sh
├─ pages                   页面目录，自动注册路由
│  └─index/index.vue      主页
│  └─video/index.vue      视频页
├─app.vue                  根组件
```

**参考代码**

```vue {3-4,6}
<template>
  <!-- 路由链接 -->
  <NuxtLink to="/">首页</NuxtLink>
  <NuxtLink to="/video">视频页</NuxtLink>
  <!-- 页面路由 -->
  <NuxtPage />
</template>
```

- 页面路由 `<NuxtPage>` 相当于 `<RouterView>`
- 页面跳转 `<NuxtLink>` 相当于 `<RouterLink>`

## SEO 优化

通过设置网页 title 和 description 等 SEO 优化信息，由服务端渲染，提高网页在搜索引擎结果页面中的排名和可见性 。

```vue
<script setup lang="ts">
// SEO 优化信息
useSeoMeta({
  // 网站标题
  title: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili',
  // 网站描述
  description:
    'bilibili是国内知名的在线视频弹幕网站，拥有最棒的ACG氛围，哔哩哔哩内容丰富多元，涵盖动漫、电影、二次元舞蹈视频、在线音乐、娱乐时尚、科技生活、鬼畜视频等。下载客户端还可离线下载电影、动漫。',
  // 搜索关键词
  keywords: 'B站,bilibili,哔哩哔哩,哔哩哔哩动画,动漫,电影,在线动漫,高清电影',
})
</script>
```

参考链接：

- [SEO 和 Meta](https://nuxt.com/docs/getting-started/seo-meta#seo-and-meta)

## @vant/nuxt 组件库

- 安装 nuxt 版 vant-ui

```sh
npm i @vant/nuxt
```

- 添加配置

```ts {4}
// nuxt.config.ts
export default defineNuxtConfig({
  // 调试工具
  devtools: { enabled: true },
  // 应用模块
  modules: ['@vant/nuxt'],
})
```

- 使用

```vue
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
```

PS： 在 Nuxt 项目中，vant 组件会自动按需导入（需重启服务）。

### 修改主题色

在 app.vue 的样式全局生效。

```vue
<style lang="scss">
/* vant-ui 主题定制 */
:root {
  --van-primary-color: #fb7299 !important;
  --van-back-top-background: #fbfbfb !important;
  --van-back-top-text-color: #666 !important;
}
</style>
```

**参考链接**

- [vant-nuxt](https://github.com/vant-ui/vant-nuxt)
- [vant 样式变量](https://vant-ui.github.io/vant/#/zh-CN/config-provider#bian-liang-lie-biao)

## 项目中的 vw 适配

**安装依赖**

```sh
npm i postcss-px-to-viewport -D
```

**添加配置**

```ts {6-12}
// nuxt.config.ts
export default defineNuxtConfig({
  // ...省略
  // 移动端适配
  postcss: {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,
      },
    },
  },
})
```

参考文档：

- [nuxt 配置 - postcss](https://nuxt.com/docs/api/configuration/nuxt-config#postcss)
- [vant 进阶用法 - postcss](https://vant-ui.github.io/vant/#/zh-CN/advanced-usage#liu-lan-qi-gua-pei)

### 素材和样式准备

 `assets` 目录包含项目所需的图片、基础样式、字体图标。

下载安装 sass

```sh
npm i sass -D
```

项目中导入基础样式和字体图标。

```vue
<style lang="scss">
// 基础样式
@import './assets/styles/base.scss';
// 字体图标
@import './assets/styles/iconfont.scss';
</style>
```



### 组件封装

- **头部组件** `components/AppHeader.vue`

- **视频组件** `components/AppVideo.vue`

抽离到 `components` 目录的组件可自动导入，在首页、视频详情页中直接使用即可

```vue
<template>
  <!-- 公共头部 -->
  <AppHeader />
  <!-- 频道模块 -->
  <van-tabs>
    <van-tab v-for="item in 10" :key="item" title="频道" />
  </van-tabs>
  <!-- 视频列表 -->
  <div class="video-list">
    <AppVideo v-for="item in 20" :key="item" />
  </div>
</template>
```

**参考链接**

- [components 目录](https://nuxt.com/docs/guide/directory-structure/components)

## 接口服务器

Nuxt 支持在 `server` 目录写服务器接口，用于数据请求

### 频道接口

**静态数据**

`database/chnnel.ts`

```ts
// 频道列表
export default [
  { id: 1, name: '首页' },
  { id: 2, name: '动画' },
  { id: 3, name: '番剧' },
  { id: 4, name: '国创' },
  { id: 5, name: '音乐' },
  { id: 6, name: '舞蹈' },
  { id: 7, name: '游戏' },
  { id: 8, name: '知识' },
  { id: 9, name: '科技' },
  { id: 10, name: '运动' },
  { id: 11, name: '汽车' },
  { id: 12, name: '生活' },
  { id: 13, name: '美食' },
  { id: 14, name: '动物圈' },
  { id: 15, name: '鬼畜' },
  { id: 16, name: '时尚' },
  { id: 17, name: '娱乐' },
  { id: 18, name: '影视' },
  { id: 19, name: '纪录片' },
  { id: 20, name: '电影' },
  { id: 21, name: '电视剧' },
  { id: 22, name: '直播' },
  { id: 23, name: '相簿' },
  { id: 24, name: '课堂' },
]
```



**Nuxt 基于文件生成接口**，在 `server` 目录下的 `/api/channel.get.ts`，会自动生成接口 `/api/channel`，请求方式为 `get`。

```ts
import chnnel from '@/database/chnnel'

export default defineEventHandler(() => {
  return chnnel
})
```

可通过 http://localhost:3000/api/channel 访问以上频道接口， 文件名的后缀可以是 `.get`, `.post`, `.put`, `.delete` 等，以匹配请求的 HTTP 方法 。

参考资料：

- [server 目录](https://nuxt.com/docs/guide/directory-structure/server)

### 渲染频道列表

- 通过 useFetch 发送请求

获取频道列表数据

`index/index.vue`

```jsx
// 获取频道列表
const { data: channelList } = await useFetch('/api/channel')
```

页面中渲染数据

### 视频列表接口

**静态数据**

`database/video.ts`

```ts
// 视频列表
export default [
  {
    aid: 701297313,
    type_id: 182,
    tname: '影视杂谈',
    pic: 'http://i0.hdslb.com/bfs/archive/4e0981141ac047f06118a30f4af322d45f4ce63c.jpg',
    title: '一口气看完美剧大片《星期三》完整版',
    pubdate: 1690181679,
    ctime: 1690181679,
    tags: [],
    duration: 2208,
    author: {
      mid: 1446209135,
      name: '番茄君来了',
      face: 'https://i2.hdslb.com/bfs/face/0db953a00ded43b1eec3539b99cd63294ead1283.jpg',
    },
    stat: {
      aid: 701297313,
      view: 362915,
      danmaku: 392,
      reply: 171,
      favorite: 3905,
      coin: 643,
      share: 182,
      now_rank: 0,
      his_rank: 0,
      like: 12383,
      dislike: 0,
      vt: 0,
      vv: 362915,
    },
    hot_desc: '',
    corner_mark: 0,
    bvid: 'BV1Hm4y1L74g',
    enable_vt: 0,
  }
  // ... 省略
]
```

**视频列表接口**

`server/api/video/index.get.ts`

```ts
// get  /api/video
import video from '@/database/video'

export default defineEventHandler(() => {
  return video
})
```

### 动态渲染视频

获取视频列表数据

`index/index.vue`

```ts
// 获取视频列表数据
const { data: videoList } = await useFetch('/api/video')
```

页面中渲染数据

参考链接：

- [utils 目录](https://nuxt.com/docs/guide/directory-structure/utils)

## 分页加载

### 分页组件

通过 [vant-list 列表](https://vant-contrib.gitee.io/vant/#/zh-CN/list) 实现滚动触底，加载分页数据。

```diff
  <!-- 视频列表 -->
+  <van-list
+    v-model:loading="loading"
+    :finished="finished"
+    finished-text="去 bilibili App 看更多"
+    @load="onLoad"
+  >
    <div class="video-list">
      ...省略
    </div>
+  </van-list>
```

滚动触底，触发 onLoad 事件，加载完成，处理 finished 结束。



### 类型处理

指定正确的 TypeScript 类型可以让项目更安全，在 VS Code 中可通过 `json2ts` 插件，快速基于 JSON 生成 TS 类型声明文件

**类型声明文件**

`types/video.d.ts`

```ts
export interface Author {
  mid: number
  name: string
  face: string
}

export interface Stat {
  aid: number
  view: number
  danmaku: number
  reply: number
  favorite: number
  coin: number
  share: number
  now_rank: number
  his_rank: number
  like: number
  dislike: number
  vt: number
  vv: number
}

export interface VideoItem {
  aid: number
  type_id: number
  tname: string
  pic: string
  title: string
  pubdate: number
  ctime: number
  tags: any[]
  duration: number
  author: Author
  stat: Stat
  hot_desc: string
  corner_mark: number
  bvid: string
  enable_vt: number
}
```

**类型升级**

```diff
// 导入类型
+  import type { VideoItem } from '@/types/video'

// 显示的列表 - 指定类型
+  const list = ref<VideoItem[]>([])

// 滚动触底触发
const onLoad = () => {
  // 根据当前页码提取数据
+  const data = videoList.value?.slice((page - 1) * pageSize,page * pageSize) as VideoItem[]
}
```

## 视频详情-动态路由传参

### 跳转路由传参

修改面经详情的目录结构

```jsx
pages/video/index.vue  =>   pages/video/[id].vue

其中 [id].vue  表示动态路由
```

点击跳转 `video/index.vue`

```diff
  <NuxtLink
    class="v-card"
    v-for="item in list"
    :key="item.aid"
+    :to="`/video/${item.bvid}`"
  >
    ...
  </NuxtLink>
```

页面中获取参数

```vue
<script setup lang="ts">
const { params } = useRoute()
console.log('动态路由id', params.id)
</script>
```

### 视频详情接口

`server/api/video/[id].get.ts`

```ts
// get /api/video/id
import video from '@/database/video'

export default defineEventHandler((event) => {
  // 获取路由参数
  const { id } = event.context.params || {}
  // 根据 id 查找视频
  return video.find((v) => v.bvid === id)
})
```

### 代码实现

`pages/video/[id].vue`

## 页面缓存

没有做页面缓存的话，切换页面时会重新发送请求，用户体验不友好，开启 keepalive 优化体验。

```vue
<template>
  <!-- keepalive 设置页面缓存 -->
  <NuxtPage :keepalive="{ max: 10 }" />
</template>
```

- [NuxtPage 开启 keepalive](https://nuxt.com/docs/guide/directory-structure/pages#keepalive)
- [keepalive issues](https://github.com/nuxt/nuxt/issues/15214)

## 打包发布

### 打包命令

直接使用 nuxt 提供的打包命令，

```bash
# 生成用于服务器端运行的优化代码
yarn build

# 生成静态网站，将应用程序预渲染成静态 HTML 文件，无需服务器端渲染
yarn generate
```

### 部署上线

- 部署公司的服务器
- 部署到第三方平台，如：[vercel (免费)](https://vercel.com)
