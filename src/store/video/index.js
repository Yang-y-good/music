import {
    groupList,
    categoryList,
    getVideo,
    videoAll,
    videoDetail,
    videoUrl,
    mvUrl,
    mvDetail,
    relatedVideo,
    relatedMv,
    mvComment,
    voideComment
} from '~/network'

export const video = {
    namespaced: true,
    state: {
        grouplist: [],
        // 点击的视频标签
        tags: {
            id: 58100,
            name: '现场'
        },
    },
    getters: {
        getTags(state) {
            return state.tags
        }
    },
    mutations: {
        // 设置点击的标签值
        setTags(state, tags) {
            state.tags = tags
        },
    },
    actions: {
        // 获取视频标签列表
        async getCategoryList() {
            const result = await categoryList()
            return result.data
        },

        // 获取视频分类列表
        async getGroupList() {
            const result = await groupList()
            return result.data
        },
        // 获取视频标签/分类下的视频
        async getVideoGroups({
            commit
        }, {
            id,
            offset
        }) {
            const result = await getVideo(id, offset)
            return result.datas
        },
        // 获取全部视频
        async getVideoAll({
            commit
        }, {
            offset
        }) {
            const result = await videoAll(offset)
            return result
        },
        // 获取视频详情
        async getVideoDetail({
            commit
        }, vid) {
            const result = await videoDetail(vid)
            return result
        },
        // 获取视频地址
        async getVideoUrl({
            commit
        }, vid) {
            const result = await videoUrl(vid)
            return result
        },
        // 获取MV地址
        async getMvUrl({
            commit
        }, id) {
            const result = await mvUrl(id)
            return result
        },
        // 获取mv数据
        async getMvData({
            commit
        }, id) {
            const result = await mvDetail(id)
            return result
        },
        // 获取相似视频
        async getRelatedVideo({
            commit
        }, id) {
            const result = await relatedVideo(id)
            return result
        },
        // 获取相似MV
        async getRelatedMv({
            commit
        }, id) {
            const result = await relatedMv(id)
            return result
        },
        // 获取MV评论
        async getMvComment({
            commit
        }, {
            id,
            limit,
            offset
        }) {
            const result = await mvComment(id, limit, offset)
            console.log(result);
            return result
        },
        // 获取视频评论
        async getVoideComment({
            commit
        }, {
            id,
            limit,
            offset
        }) {
            const result = await voideComment(id, limit, offset)
            console.log(result)
            return result
        }
    }
}