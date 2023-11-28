<!-- @format -->

<template>
    <div class="app_main">
        <AppHeader />

        <!-- 频道模块 -->
        <van-tabs>
            <van-tab
                v-for="item in channelList"
                :key="item.id"
                :title="item.name"
            />
        </van-tabs>
    </div>

    <!-- 视频列表 -->
    <AppVideoList :videoList="videoList" />
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";

import AppVideoList from "@/components/AppVideoList.vue";

// 获取频道列表
const { data: channelList } = await useFetch("/api/channel/");
// 获取视频列表数据
const { data: videoList } = await useFetch("/api/video");
</script>

<style lang="scss">
.app_main {
    position: sticky;
    top: 0;
    z-index: 999;
}
</style>
