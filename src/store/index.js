import {
  createStore,
} from 'vuex'

import {
  recommend
} from './findMusic/recommend'
import {
  songMenu
} from './songMenuDetail'
import {
  playMusic
} from './playMusic'
import {
  search
} from './search'
import {
  toplist
} from './findMusic/toplist'
import {songlist} from './findMusic/songlist'
import { singer } from './findMusic/singer'
import { newsong } from './findMusic/newsong'
import {login} from './login/login'
import { comment } from './comment'
import { video } from './video'
const store = new createStore({
  state: {
    // tab标签下标
    tabsIndex: 0,
    // 缓存的组件
    keepAliveViews: [],
    // 不需要缓存的组件
    notAliveViews: [],
    // 缓存组件滚动位置
    keepAliveViewsScrollPostion: [],
    // 取消请求
    cancel: {},
    // 是否打开歌词界面
    islyric: false,
    // 是否显示歌曲栏
    isPlayMusic: true,
    // 歌单列表滚动位置
    savePosition: 0
  },
  getters: {},
  mutations: {
    setIslyric(state, value) {
      state.islyric = value
    },
    // 首页标签下标值
    setTabsIndex(state, index) {
      state.tabsIndex = index
    },

    setisPlayMusic(state, item) {
      state.isPlayMusic = item
    },

    /*
     * 记录需要缓存的路由视图
     */
    saveKeepAliveViews(state, {
      keepAliveViews
    }) {
      state.keepAliveViews = keepAliveViews;
    },

    /**
     * 清除页面缓存
     */
    clearCacheView(state, {
      notAliveViews
    }) {
      state.notAliveViews = notAliveViews;
    },

    // 设置缓存页面滚动元素的位置
    setkeepAliveViewsScrollPostion(state, { routeName,list }) {
      const item = state.keepAliveViewsScrollPostion.find((t) => t.routeName === routeName);
      if (!item) {
        state.keepAliveViewsScrollPostion.push({ routeName, list });
      } else {
        // console.log(item);
        item.list = list;
      }
    },

  },
  actions: {

  },
  modules: {
    recommend,
    songMenu,
    playMusic,
    search,
    login,
    comment,
    video
  }
})
store.registerModule(['recommend', 'toplist'], toplist)
store.registerModule(['recommend', 'songlist'], songlist)
store.registerModule(['recommend', 'singer'], singer)
store.registerModule(['recommend', 'newsong'], newsong)

export default store