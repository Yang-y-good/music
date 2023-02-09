import {
    playListCategory,
    playLisrMenu,
    playListCatlist
} from '~/network'
export const songlist = {
    namespaced: true,
    state: {
        // 热门歌单分类
        hotTags: [],
        // 歌单分类
        Tags: [],
        // 歌单 ( 网友精选碟 )
        hotSongMenu: []
    },

    mutations: {
        changePlaylisthot(state, payload){
            state.hotTags = payload
        },
        changeSongMenu(state, payload) {
            state.hotSongMenu = payload
        },
        changeTags(state, payload) {
            state.Tags = payload
        }
    },
    actions: {
        async getPlayListHot({commit}) {
            const {tags} = await playListCategory()
            commit('changePlaylisthot',tags)
        },
        async getHotSongMenu({commit}, {order, cat, limit, offset}) {
            const result = await playLisrMenu(order,cat, limit, offset-1)
            commit('changeSongMenu',result)
            return result
        },
        async getPlayListCatlist({commit}) {
            const {all, categories, sub} = await playListCatlist()
            // console.log([all,categories,sub]);
            commit('changeTags', [all,categories,sub] )
        }
    },
}