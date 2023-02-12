import {
    loginStatus,
    userDetail,
    userPlaylist,
    likeList
} from "~/network";
export const login = {
    namespaced: true,
    state: {
        // 登录弹窗
        logindialog: false,
        // 登陆账户信息
        account: {},
        // 登陆账户信息
        profile: null,
        // 用户信息
        userInfo: {},
        // 用户创建的歌单
        createMenuList: [],
        // 用户收藏的歌单
        subMenu: [],
        // 用户喜欢歌曲列表
        likeList: []
    },
    mutations: {
        changelogindialog(state, logindialog) {
            state.logindialog = logindialog
        },
        changeAccount(state, account) {
            state.account = account
        },
        changeProfile(state, profile) {
            state.profile = profile
        },
        changeUser(state, user) {
            state.userInfo = user
        },
        changeCreateList(state, playlist) {
            state.createMenuList = playlist
        },
        changeSubMenu(state, subMenu) {
            state.subMenu = subMenu
        }
    },
    actions: {
        // 检查登陆状态
        async chechLoginStatus({
            commit
        }) {
                const result = await loginStatus() 
                // data: {account,profile }} = await loginStatus()

            const { data: {account,profile }} = result
            commit('changeAccount', account)
            commit('changeProfile', profile)
            return result
        },

        // 获取用户详情
        async getUserDetail({commit}, uid) {
            const user = await userDetail(uid)
            // console.log(user);
            commit('changeUser', user)
            return user
        },
        // 获取用户歌单
        async getUserPlaylist({commit, state}, {id, offset, limit}) {
            const result = await userPlaylist(id, limit, offset)
            // 用户收藏的歌单
            const {playlist} = result
            // 用户创建的歌单
            // 过滤用户创建的歌单和收藏的歌单
            
            const subMenu = playlist.filter((item) => item.subscribed)
            const createMenu = playlist.filter((item) => !item.subscribed)
            createMenu.forEach(item => {
                state.createMenuList.push(item)
            })
            // commit('changeCreateList', createMenu)
            commit('changeSubMenu', subMenu)
            return result

        },
        // 获取用户喜欢的歌曲
        async getLikeList({
            commit
        }, uid) {
            const result = await likeList(uid)
            return result.ids
        }
    }
}