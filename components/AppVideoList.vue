<!-- @format -->

<template>
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <div class="video-list">
            <NuxtLink
                class="v-card"
                v-for="item in list"
                :key="item.aid"
                :to="`/video/${item.bvid}`"
            >
                <div class="card">
                    <div class="card-img">
                        <img
                            class="pic"
                            :src="item.pic"
                            :alt="item.title"
                        />
                    </div>
                    <div class="count">
                        <span>
                            <i class="iconfont icon_shipin_bofangshu"></i>
                            {{ item.stat.view }}
                        </span>
                        <span>
                            <i class="iconfont icon_shipin_danmushu"></i>
                            {{ item.stat.danmaku }}
                        </span>
                    </div>
                </div>
                <p class="title">{{ item.title }}</p>
            </NuxtLink>
        </div>
    </van-list>
</template>

<script setup lang="ts">
import type { VideoItem } from "@/types/videos";

// 使用 defineProps 获取传递的 prop 数据
const { videoList } = defineProps(["videoList"]);

// 列表数据
const list = ref<VideoItem[]>([]);

// 是否显示加载中
const loading = ref(false);

// 是否加载完成
const finished = ref(false);

let page = 1;
let pageSize = 10;
let fistLoad = 0;

// 触底加载
const onLoad = () => {
    // 表示正在加载

    if (fistLoad) loading.value = true;

    fistLoad++;

    // 左闭右开区间 [0,10)
    const listData = videoList?.slice((page - 1) * pageSize, page * pageSize) as VideoItem[];

    setTimeout(() => {
        list.value.push(...listData);
    }, 1000);

    page++;

    // 加载结束
    if (videoList?.length === list.value.length) finished.value = true;
};
onLoad();
</script>

<style lang="scss" scoped>
// 视频列表
.video-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 5px;
}
// 视频卡片
.v-card {
    width: 50%;
    padding: 0 5px 10px;
    .card {
        position: relative;
        background: #f3f3f3 url(@/assets/images/default.png) center no-repeat;
        background-size: 36%;
        border-radius: 2px;
        overflow: hidden;
        .card-img {
            width: 100%;
            height: 100px;
            .pic {
                height: 100%;
                width: 100%;
                object-fit: cover;
                font-size: 12px;
            }
        }
        .count {
            background-image: linear-gradient(0deg, #000000d9, #0000);
            color: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 6px;
            span {
                .iconfont {
                    font-size: 12px;
                }
            }
        }
    }
    .title {
        margin-top: 5px;
        font-size: 12px;
        color: #212121;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>
