import {
    getRequest,
    topList
} from '~/network'
export const toplist = {
    namespaced: true,
    state: {
        officialtop: [],
    },

    mutations: {
        setOfficialTop(state, payload) {
            state.officialtop = payload
        }
    },
    actions: {
        // 请求歌单排行榜
        async getOfficialTop ({commit}) {
            const {list} =  await topList()
            commit('setOfficialTop', list)
        },
        // 请求歌单全部歌曲
         getSongMenuDetail({commit}, id) {
            return Promise.resolve(getRequest(`/playlist/track/all?id=${id}`))
        }
    },
}