import {
    getRequest,
    getMenuComment,
    subscriBers,
    SongMenuDetail,
    songMenuList
} from '~/network'

export const songMenu = {
    namespaced: true,
    state: {
        //歌单详情信息
        playlist: {},
        // 歌单歌曲列表
        songlist: [],
        // 保存歌曲列表id
        songlistId: [],
        // 当前播放歌单列表
        currentMenuList: [],
        // 保存播放列表id
        currentMenuId: '',
        // 精彩评论
        hotComments: [],
        // 歌单评论
        comment: [],
        // 评论数量
        commentTotal: 0,
        // 歌单收藏者
        subscribers: 0
    },
    getters: {

    },
    mutations: {
        changePlaylist(state, payload) {
            state.playlist = payload
        },
        changePrivileges(state, payload) {
            state.songlist = payload
        },
        songListId(state, payload) {
            state.songlistId = payload
        },
        CurrentMenuList(state, payload) {
            state.currentMenuList = payload
        },
        currentMenuId(state, payload) {
            state.currentMenuId = payload
        },
        changeHotComments(state, payload) {
            state.hotComments = payload
        },
        changeComments(state, payload) {
            state.comment = payload
        },
        changeTotal(state, payload) {
            state.commentTotal = payload
        },
        changeSubscribers(state, {
            subscribers
        }) {
            state.subscribers = subscribers
        }
    },
    actions: {

        // 获取歌单所有音乐
        async getSongMenuList({
            commit
        }, id) {
            const songlist = await songMenuList(id)
            // console.log(songlist);
            const {
                songs
            } = songlist || {
                songs: []
            }
            commit('changePrivileges', songs)
            return songs
        },

        // 获取歌单详情
        async getSongMenuDetail({
            commit
        }, id) {
            const result = await SongMenuDetail(id)
            // console.log(result);
            const {
                playlist,
                playlist: {
                    tracks
                }
            } = result
            console.log(result);
            commit('changePlaylist', playlist)
            commit('songListId', parseInt(id))
            return tracks
        },

        // 获取歌单所有音乐加入播放歌曲列表
        async dispatchSongsList({
            commit
        }, id) {
            const result = await songMenuList(id)

            try {
                const {
                    songs
                } = result
                commit('CurrentMenuList', songs)

                commit('currentMenuId', parseInt(id))
            } catch (error) {
                ElMessage({
                    message: '播放失败，可能网络不给力',
                    grouping: true,
                    type: 'error'
                })
            }
        },

        // 获取歌单评论
        async getComment({
            commit
        }, payload) {
            const {
                id,
                limit,
                offset
            } = payload
            const result = await getMenuComment(id, limit, offset)
            const {
                hotComments,
                comments,
                total
            } = result
            if (hotComments) commit('changeHotComments', hotComments)
            commit('changeComments', comments)
            commit('changeTotal', total)
            return comments
        },

        // 获取收藏者
        async getsubscriBers({
            commit
        }, id) {
            const result = await subscriBers(id)
            commit('changeSubscribers', result)
            return result
        }
    }
}