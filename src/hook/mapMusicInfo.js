import { formatSongTime } from "@/utils/formatSongTime";

/**
 * 根据歌曲详情映射歌曲信息
 * @param {Array} currentMenuList 
 * @returns 
 */

export function mapMusicInfo(currentMenuList) {
    return currentMenuList.map((item, index) => {
        return {
          index: index+1,
          // 歌曲信息
          songsInfo: item.al,
          // 歌曲id
          id: item.id,
          // 歌曲名字
          name: item.name,
          // 别名
          alia: item.alia[0] || '',
          // 作者
          author: item.ar,
          // 专辑名字
          album: item.al.name,
          // 歌曲时间
          time: formatSongTime(item.dt),
          fee: item.fee,
          sq: item.sq,
          mv: item.mv,
          noCopyrightRcmd: item.noCopyrightRcmd
        };
      });
}