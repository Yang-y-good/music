import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

import store from '../store/index'
import useCache from '../utils/useCache.js'
import {
  nextTick,
  ref
} from 'vue'

const routes = [
  // 一级路由
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // 重定向
    redirect: {
      name: 'findmusic'
    },
    meta: {
      title: '首页',
      scrollTop: 0,
    },


    // 二级路由
    children: [{
        path: '/findmusic',
        name: 'findmusic',
        component: () => import( /* webpackChunkName: "findmusic" */ '../views/findMusic/findmusic.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
          scrollEls: [".recommend"]
        },
        beforeEnter: () => {
          console.log('清除缓存');
          clearCacheView(["songMenuDetailPage", "singerDetailPage"]);
        },
      },
      {
        path: "/:pathMatch(.*)",
        component: () => import('../views/findMusic/findmusic.vue')
      },
      //视频
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/videos/video.vue'),
        meta: {
          title: '视频',
          keepAlive: true
        },
        // redirect: 'video/listVideo',
        children: [
          // 视频列表页
          {
            path: 'listVideo',
            name: 'listVideo',
            component: () => import('@/views/videos/children/listVideo.vue'),
            meta: {
              title: '视频列表',
              keepAlive: true
            },
            beforeEnter: () => {
              console.log('清除缓存');
              clearCacheView(["mainVideo"]);
            },
          },


        ]
      },
      // 歌单详情页
      {
        path: '/songMenuDetailPage',
        name: 'songMenuDetailPage',
        component: () => import( /* webpackChunkName: "songmenudetail" */ '../views/songMenuDetailPage/songMenuDetailPage.vue'),
        meta: {
          title: '歌单',
          scrollEls: ['recommend'],
          // keepAlive: true,
          
        },
      },
      // 歌曲搜索页
      {
        path: '/search',
        name: 'search',
        component: () => import( /* webpackChunkName: "search" */ '@/views/search/searchPage/search-page.vue'),
        meta: {
          title: '搜索',
          keepAlive: true
        },
      },
      // 播客页
      {
        path: '/podcast',
        name: 'podcast',
        component: () => import( /* webpackChunkName: "recommend" */ '@/views/podcast/podcast.vue'),
        meta: {
          title: '播客',
          keepAlive: true
        },
        children: [{
            path: 'test',
            name: 'test',
            component: () => import('@/views/podcast/test.vue')
          },
          {
            path: 'news',
            name: 'news',
            component: () => import('@/views/podcast/news.vue')
          },
        ]
      },
      // 歌手详情页
      {
        path: '/singerDetailPage',
        name: 'singerDetailPage',
        component: () => import('@/views/findMusic/singer/children/singerDetailPage'),
        meta: {
          title: '歌手',
          keepAlive: true
        }
      },
      // 专辑详情页
      {
        path: '/albumDetailPage',
        name: 'albumDetailPage',
        component: () => import('@/views/albumDetailPage/albumDetailPage.vue'),
        meta: {
          title: '专辑'
        }
      },
      // 个人信息页
      {
        path: '/profilePage',
        name: 'profilePage',
        component: () => import('@/views/profilePage/profilePage.vue'),
        meta: {
          title: '个人信息'
        },
        beforeEnter: (from, to) => {
          // clearCacheView(["songMenuDetailPage"]);
        },
      },
      // 视频播放页
      {
        path: 'mainVideo',
        name: 'mainVideo',
        component: () => import('@/views/videos/children/mainVideo.vue'),
        meta: {
          title: '视频',
          keepAlive: true
        }
      }
    ]
  },
]



const router = createRouter({
  // hash模式
  history: createWebHashHistory(process.env.BASE_URL),
  // HTML5 模式
  // history: createWebHistory(),
  routes,
})


// 缓存组件
const {
  CacheView,
  clearCacheView
} = useCache()

CacheView(router)
/**
 * 全局前置守卫
 */
router.beforeEach((to, from) => {
  // 修改网页标题
  window.document.title = to.meta.title;
  // console.log(to, from);
  // 缓存页面:记录滚动位置
  // if (from.meta.scrollEls) {
  //   const scrollObj = { routeName: from.name, list: [] };
  //   const elRef = ref()
  //   console.log(elRef.value);
  //   from.meta.scrollEls.forEach((element) => {
  //     const el = document.querySelector(element);
  //     // console.log(el);
  //   //   if (el) {
  //   //     scrollObj.list.push({
  //   //       el,
  //   //       top: 100,
  //   //     });
  //   //   }
  //   });
  //   // store.commit("setkeepAliveViewsScrollPostion", scrollObj);

  //   }
})


/**
 * 全局后置钩子
 */
router.afterEach((to, from) => {
  // console.log(to.name);
  // 缓存页面:滚动到指定位置
  // nextTick(() => {
  //   if (to.meta.scrollEls) {
  //     // 拿到滚动的元素和滚动的距离
  //     const item = store.state.keepAliveViewsScrollPostion.find((t) => t.routeName === to.name);
  //     if (!item) return;
  //     item.list.forEach((item2) => {
  //       console.log(item2.el);
  //       console.log(item2.top);
  //       if (item2.el) {
  //         console.log('dsaaaaaaaaaaaa');
  //         // 设置滚动值
  //         item2.el.setScrollTop(item2.top)
  //       }
  //     });
  //     // 使用后重置滚动位置为0
  //     // store.commit("setkeepAliveViewsScrollPostion", item);
  //   }
  // });
});


export default router