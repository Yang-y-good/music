import store from "@/store";
import {
    mapMusicInfo
} from '@/hook/mapMusicInfo';
/**
 * 根据歌曲id播放歌曲
 * @param {*} id  歌曲id
 */
export function usePlayMusic(id) {
    store.dispatch("playMusic/getMusicInfo", id).then((res) => {
        const { songs} = res;
        const song = mapMusicInfo(songs);
        // 播放歌曲
        store.dispatch("playMusic/dispatchMusicInfo", song[0]);
        // 将歌曲加入播放列表
        store.commit("songMenu/CurrentMenuList", songs);
    });
}