import videos from "@/server/database/video.js";

export default defineEventHandler(() => {
    return videos;
});
