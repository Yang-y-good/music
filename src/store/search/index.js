import {
    defaultSearch,
    hotSearch,
    keyWordsSearch,
    multimatch
} from '~/network'
export const search = {
    namespaced: true,
    state: {
        // keywords: '',
        defaultSearch: '',
        hotSearch: [],
        songsList: [],
        songCount: 0
    },
    getters: {

    },
    mutations: {
        changedefaultSearch(state, payload){
            state.defaultSearch = payload
        },

        changehotSearch(state, payload){
            state.hotSearch = payload
        },
        songCountAndSongsList(state, payload) {
            const [songCount, ...songsList] = payload
            state.songCount = songCount
            state.songsList = songsList
        }
    },
    actions: {
        // 请求默认搜索
        async getDefaultSearch({commit}){
            const result = await defaultSearch()
            const { data } = result
            commit('changedefaultSearch', data.realkeyword)
        },

    // 请求热门搜索
        async getHotSearch({commit}) {
            const {data} = await hotSearch()
            commit('changehotSearch', data)
        },

        // 请求关键词搜索
        async getSearchList({commit}, keywords) {
            const {keyword,limit,offset} = keywords
            // console.log(keywords);
            const {result : {songCount, songs}} = await keyWordsSearch(keyword,limit,offset)
            commit('songCountAndSongsList',[songCount,...songs])
        },
        // 搜索多重匹配
        async getMultimatch({commit}, keywords) {
            const result = await multimatch(keywords)
            console.log(result);
            return result
        }
    }
}