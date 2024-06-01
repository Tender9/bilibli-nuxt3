<!-- @format -->

<template>
    <!-- Sticky 粘性布局 -->
    <van-sticky>
        <!-- 头部 -->
        <AppHeader />

        <!-- 弹幕 -->
        <van-barrage
            v-model="defaultList"
            :auto-play="false"
            ref="barrageRef"
        >
            <!-- 视频 -->
            <video
                controls
                class="video-play"
                ref="videoRef"
                @play="onPlay"
                @pause="onPause"
                :poster="data?.pic"
                src="https://video.pearvideo.com/mp4/third/20230706/cont-1784445-12033417-151259-hd.mp4"
            ></video>
        </van-barrage>
    </van-sticky>
    <!-- 标题作者信息 -->
    <div class="info">
        <h1 class="title-text">{{ data?.title }}</h1>
        <div class="body">
            <div class="author">
                <img
                    class="avatar"
                    :src="data?.author.face"
                />
                <span class="name">{{ data?.author.name }}</span>
            </div>
        </div>
    </div>

    <!-- 相关推荐 -->
    <div class="relate">
        <h3 class="relate-title">相关推荐</h3>
        <div class="relate-list">
            <AppVideoList :videoList="videoList" />
        </div>
    </div>
</template>

<script setup>
    import AppHeader from "~/components/AppHeader.vue";

    import AppVideoList from "~/components/AppVideoList.vue";

    const {
        data: { value: videoList },
    } = await useFetch("/api/video/recommend");

    // 请求接口获取视频
    const { id } = useRoute().params;

    const { data } = await useFetch(`/api/video/${id}`);

    // 弹幕结构
    const barrageRef = ref();

    // 视频结构
    const videoRef = ref();

    // 视频播放
    const onPlay = () => {
        barrageRef.value?.play();
    };

    // 视频暂停
    const onPause = () => {
        barrageRef.value?.pause();
    };

    // SEO优化
    useSeoMeta({
        title: `${data.value?.title}_哔哩哔哩bilibili_${data.value?.author.name}`,
    });

    // 弹幕列表
    const defaultList = ref([
        { id: 100, text: "轻量" },
        { id: 101, text: "可定制的" },
        { id: 102, text: "移动端" },
        { id: 103, text: "Vue" },
        { id: 104, text: "组件库" },
        { id: 105, text: "VantUI" },
        { id: 106, text: "666" },
    ]);

    onMounted(async () => {});
</script>

<style lang="scss" scoped>
    .video-play {
        width: 100%;
        height: 210px;
        object-fit: contain;
        background-color: #fff;
    }

    .info {
        padding: 10px;
        border-bottom: 1px solid #eee;
        .title-text {
            font-size: 16px;
            font-weight: normal;
        }

        .body {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            align-items: center;
        }

        .author {
            display: flex;
            align-items: center;
            .avatar {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: 1px solid #ccc;
            }
            .name {
                margin-left: 10px;
                font-size: 14px;
            }
        }
    }

    .relate {
        .relate-title {
            height: 32px;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: normal;
            padding: 0 10px;
            color: #333;
        }
        .relate-list {
            display: flex;
            flex-wrap: wrap;
            padding: 0 5px;
        }
    }
</style>
