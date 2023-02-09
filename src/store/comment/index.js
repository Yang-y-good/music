import {
    albumComment
} from '~/network'

export const comment = {
    namespaced: true,
    state: {
        // 精彩评论
        hotComments: [],
        // 最新评论
        comments: [],
        // 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
        cursor: 0,
        total: 0
    },
    getters: {

    },
    mutations: {
        saveHotComments(state, hotComments) {
            state.hotComments = hotComments
        },
        saveComments(state, comments) {
            state.comments = comments
        },
        saveTotal(state, total){
            state.total = total
        }

    },
    actions: {
        async getComment({commit}, {id, limit, offset}) {
            const result = await albumComment(id, limit, offset)
            console.log(result);
            commit('saveHotComments', result.hotComments)
            commit('saveComments', result.comments)
            commit('saveTotal', result.total)
            return result.comments
        }
    }
}