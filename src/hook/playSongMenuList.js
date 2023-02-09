/**
 * 根据歌单id播放歌单第一首歌曲
 * @param {*} id 歌单id
 */
 import { mapMusicInfo } from "@/hook/mapMusicInfo";
import store from "@/store";

export function playSongMenuList(id) {
    //拿到歌单数据
    const result = store.dispatch("songMenu/getSongMenuDetail", id);
    // 播放歌曲
    result.then((res) => {
        const songlist = mapMusicInfo(res);
        // 播放歌单第一首歌曲
        store.dispatch("playMusic/dispatchMusicInfo", songlist[0]);
        // 将歌单里面的歌曲加入播放列表
        store.dispatch("songMenu/dispatchSongsList", id);
    })
}