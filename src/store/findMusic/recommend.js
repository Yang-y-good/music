import {
    getRequest,
    newSongs
} from '~/network'
export const recommend = {
    namespaced: true,
    state: {
        // 轮播图数据
        banners: [],
        // 推荐歌单数据
        personalized: '',
        // 推荐新音乐
        newsongs:[]
    },
    getters: {},
    mutations: {
        getball(state, payload) {
            state.banners = payload
        },
        changepersonalized(state, payload) {
            state.personalized = payload.result
        },
        changeNewSongs(state, payload) {
            state.newsongs = payload
        }
    },
    actions: {
        // 请求轮播图数据
        async getbanner({commit}) {
            const result = await getRequest("/banner")
            const {
                banners
            } = result
            commit('getball', banners)
        },

        // 请求歌单数据
        async getpersonalized({commit}, limit) {
            const result = await getRequest('/personalized', {
                params: {
                    limit
                }
            })
            commit('changepersonalized', result)
            return result
        },
        // 请求新音乐数据
        async getnewsong({commit}) {
            const {result} = await newSongs()
            commit('changeNewSongs', result)
        }
    },
}