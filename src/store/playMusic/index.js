import {
    getRequest,
    getMusicLyric,
    songDetail,
    getSongComment
} from '~/network'

export const playMusic = {
    namespaced: true,
    state: {
        // 歌曲url
        musicUrl: '',
        // 歌曲信息
        musicInfo: {},
        // 歌曲下标
        index: 0,
        // 音量大小
        volumeSize: 0,
        // 是否播放状态
        isPlay: false,
        // 歌词
        lyric: '',
        // 当前时间
        currentTime: 0,
        // 歌区精彩评论
        hotComments: [],
        // 歌区评论
        comment: [],
        // 评论总数
        totalComment: 0
    },
    getters: {},
    mutations: {
        changeUrl(state, payload) {
            state.musicUrl = payload
        },
        changeInfo(state, payload) {
            state.musicInfo = payload
        },
        actionIndex(state, payload) {
            state.index = payload
        },
        changeLyric(state, payload) {
            state.lyric = payload
        },
        changeCurrent(state, payload) {
            state.currentTime = payload
        },
        changeHotComments(state, payload) {
            state.hotComments = payload
        },
        changeComments(state, payload) {
            state.comment = payload
        },
        changeTotal(state, payload) {
            state.totalComment = payload
        }
    },
    actions: {

        // 获取歌单映射出的歌曲id
        async dispatchMusicInfo({
            commit
        }, info) {
            const result = await getRequest('/song/url', {
                params: {
                    id: info.id,
                    times: Date.now()
                }
            })
            const {
                data
            } = result
            try {
                commit('changeUrl', data[0].url)
            } catch (e) {
                ElMessage({
                    message: '播放失败，可能网络不给力',
                    grouping: true,
                    type: 'error'
                })
            }
            commit('changeInfo', info)
            commit('actionIndex', info.index)
        },

        // 获取歌曲详情
        async getMusicInfo({
            commit
        }, id) {

            const result = await songDetail(id)

            return result
        },


        // 音乐是否可用
        async isMusicPlay({
            commit
        }, id) {
            return await getRequest('/check/music', {
                params: {
                    id,
                    timestamp: Date.now()
                }
            })
        },

        // 获取音乐歌词
        async getMusicLyric({
            commit
        }, id) {

            const result = await getMusicLyric(id)

            commit('changeLyric', result.lrc)
        },

        // 获取歌曲评论
        async reqSongComment({
            commit
        }, params) {
            const {
                id,
                limit,
                offset
            } = params
            const result = await getSongComment(id, limit, offset)
            const {
                hotComments,
                comments,
                total
            } = result
            if (hotComments) commit('changeHotComments', hotComments)
            commit('changeComments', comments)
            commit('changeTotal', total)
        }
    },
}