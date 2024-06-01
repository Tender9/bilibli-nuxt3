<template>
    <div class="app_main">
        <AppHeader />
        <!-- 频道模块 -->
        <van-tabs>
            <van-tab
                v-for="item in channelList"
                :title="item.name"
                :key="item.id"
            />
        </van-tabs>
        <!-- <div class="tabs">
            <div
                v-for="(item, index) in channelList"
                :key="item.id"
                class="tab-item"
                :class="{ active: activeTabIndex === index }"
                @click="handlerChange(index)"
            >
                {{ item.name }}
            </div>
        </div> -->
    </div>

    <!-- 视频列表 -->
    <AppVideoList :videoList="videoList" />
</template>

<script setup lang="ts">
    import AppHeader from "@/components/AppHeader.vue";

    const AppVideoList = defineAsyncComponent(() => import("@/components/AppVideoList.vue"));

    const activeTabIndex = ref(0);

    // 获取频道列表
    const { data: channelList } = await useFetch("/api/channel");

    // 获取视频列表数据
    const { data: videoList } = await useFetch("/api/video");

    const handlerChange = (index: number) => {
        activeTabIndex.value = index;
    };
</script>

<style lang="scss">
    .app_main {
        position: sticky;
        top: 0;
        z-index: 999;
    }
    .tabs {
        display: flex;
        overflow-x: auto; /* 横向滚动 */
        white-space: nowrap; /* 防止文字换行 */
        scrollbar-width: none; /* Firefox 19+ */
        -ms-overflow-style: none; /* IE 11 */
        background-color: var(--van-back-top-background);
        margin: 0 10px;
        color: var(--van-tab-text-color);
        font-size: var(--van-tab-font-size);

        &::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
        }
        .tab-item {
            padding: 8px 0px; /* 设置标签的左右内边距 */
            margin: 0 10px 8px; /* 设置标签之间的间距 */
        }
        .active {
            border-bottom: var(--van-primary-color) solid 3px;

            font-weight: var(--van-font-bold);
            color: var(--van-tab-active-text-color);
        }
    }
</style>
