/** @format */

import videos from "@/server/database/video.js";

export default defineEventHandler((event) => {
    const { id } = event.context.params || {};
    const data = videos.find((v) => v.bvid === id);
    return data;
});
