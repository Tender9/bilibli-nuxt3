<!-- @format -->

<script setup lang="ts">
useSeoMeta({
    title: "这是哔哩哔哩 (゜-゜)つロ 干杯~-网页",
    description: "来哔哩哔哩吧",
    keywords: "B站,bilibili,哔哩哔哩,哔哩哔哩动画,动漫,电影,在线动漫,高清电影",
    // 绕过 B 站防盗链
    referrer: "no-referrer",
});
</script>

<template>
    <div>
        <NuxtPage :keepalive="{ max: 3 }" />
    </div>
</template>

<style lang="scss">
// 基础样式
@import "./assets/styles/base.scss";
// 字体图标
@import "./assets/styles/iconfont.scss";
/* 修改 vant-ui 主题默认 */
:root {
    --van-primary-color: #fb7299 !important;
    --van-back-top-background: #fbfbfb !important;
    --van-back-top-text-color: #666 !important;
}
</style>
