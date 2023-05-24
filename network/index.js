import request from './request'
import store from '@/store';
const axios = require('axios')
const CancelToken = axios.CancelToken;
// const controller = new AbortController();
// store.state.cancel = controller;
// get请求
export function getRequest(url, config) {
  return request.get(url, config)
}
// post请求
export function postRequest(url, config) {
  return request.post(url, config)
}

// 二维码 key 生成
export function getKey() {
  return request({
    url: '/login/qr/key',
    params: {
      time: Date.now()
    }
  })
}
// 二维码生成
export function getLoginImg(key) {
  return request({
    url: `/login/qr/create?key=${key}&qrimg=''`,
    params: {
      time: Date.now()
    }
  })
}
// 二维码检测扫码状态接口
export function checkimg(key) {
  return request({
    url: `/login/qr/check?key=${key}`,
    params: {
      time: Date.now()
    }
  })
}
// 登录状态
export function loginStatus() {
  return request({
    url: `/login/status?timerstamp=${Date.now()}`,
    method: 'get',
  })
}

// 游客登录
export function anonimous() {
  return request({
    url: `/register/anonimous?timerstamp=${Date.now()}`
  })
}

// 退出登录
export function logout() {
  return request({
    url: `/logout?timestamp=${Date.now()}`
  })
}

// 获取用户详情
export function userDetail(uid) {
  return request({
    url: `/user/detail?uid=${uid}`,
    params: {
      timestamp: Date.now()
    }
  })
}

// 获取用户歌单
export function userPlaylist(uid, limit, offset) {
  return request({
    url: `/user/playlist?uid=${uid}`,
    params: {
      limit,
      offset
    }
  })
}


// 获取歌曲的歌词
export function getMusicLyric(id) {
  return request({
    method: 'get',
    url: `/lyric?id=${id}`
  })
}

// 获取歌单评论
// limit 获取的数量， 
// offset偏移量   
// offset=0 limit=30   --> 0-30
// offset=1 limit=30   --> 1-30
// 
export function getMenuComment(id, limit = 30, offset = 0) {
  return request({
    method: 'get',
    url: `/comment/playlist?id=${id}`,
    params: {
      limit,
      offset,
      timestamp: Date.now()
    }
  })
}

// 请求关键词歌曲
export function keyWordsSearch(keywords, limit = 30, offset = 0) {
  return request({
    method: 'get',
    url: `/cloudsearch?keywords=${keywords}`,
    params: {
      limit,
      offset
    }
  })
}

// 请求默认关键词
export function defaultSearch() {
  return request({
    method: 'get',
    url: '/search/default'
  })
}

// 请求热搜列表(详细)
export function hotSearch() {
  return request({
    method: 'get',
    url: '/search/hot/detail'
  })
}
// 搜索多重匹配
export function multimatch(keywords) {
  return request({
    url: `/search/multimatch?keywords=${keywords}`
  })
}


// 推荐新音乐
export function newSongs() {
  return request({
    method: 'get',
    url: '/personalized/newsong',
    params: {
      limit: 12
    }
  })
}
// 获取歌曲详情
export function songDetail(id) {
  return request({
    method: 'get',
    url: `song/detail?ids=${id}`
  })
}

// 所有榜单
export function topList() {
  return request({
    method: 'get',
    url: '/toplist'
  })
}

// 歌单收藏者
export function subscriBers(id) {
  return request({
    method: 'get',
    url: `/playlist/subscribers?id=${id}`,
    params: {
      limit: 30
    }
  })
}

// 歌曲评论
export function getSongComment(id, limit = 30, offset = 0) {
  return request({
    method: 'get',
    url: `/comment/music?id=${id}`,
    params: {
      limit,
      offset,
      timestamp: Date.now()
    }
  })
}

// 歌单详情
export function SongMenuDetail(id) {
  return request({
    url: `/playlist/detail?id=${id}`,
  })
}

// 获取歌单所有音乐
export function songMenuList(id) {
  return request({
    url: `/playlist/track/all?id=${id}`,
    params: {
      // timestamp: Date.now()
    },
    // 取消请求
    cancelToken: new CancelToken(function executor(c) {
      // executor 函数接收一个 cancel 函数作为参数
      store.state.cancel = c;
    })
  }).catch(reason => {
    // ElMessage({
    //   message: '歌曲详情请求失败，请刷新页面重新请求！！！',
    //   type: 'error',
    //   grouping: true,
    //   //
    // })
  })
}
// 歌单分类
export function playListCatlist() {
  return request({
    url: '/playlist/catlist'
  })
}

// 热门歌单分类
export function playListCategory() {
  return request({
    url: '/playlist/hot'
  })
}

// 歌单 ( 网友精选碟 )
export function playLisrMenu(order = 'hot', cat = '全部', limit = 30, offset = 0) {
  return request({
    url: `/top/playlist?limit=${limit}`,
    params: {
      order,
      cat,
      offset
    }
  })
}

// 歌手分类列表
export function singerList(area = -1, type = -1, initial = -1, offset = 0, limit = 30, ) {
  return request({
    url: `/artist/list?limit=${limit}`,
    params: {
      area,
      type,
      initial,
      offset,
    }
  })
}
// 获取歌手mv
export function artisiMv(id, limit, offset) {
  return request({
    url: `/artist/mv?id=${id}`,
    params: {
      limit,
      offset
    }
  })
}


// 新歌速递
export function newSongSpeed(type) {
  return request({
    url: `/top/song?type=${type}`
  })
}

// 新碟上架
export function newAlbum(area = "ALL", type = "new") {
  return request({
    url: `/top/album?offset=0&limit=30`,
    params: {
      area,
      type,
      timestamp: Date.now()
    }
  })
}

// 全部新碟
export function allAlbum(area, limit = 30, offset = 0) {
  return request({
    url: `/album/new?area=${area}`,
    params: {
      limit,
      offset
    }
  })
}

// 给评论点赞
export function commentStar(id, cid, t, type) {
  return request({
    method: 'post',
    url: `/comment/like?timerstamp=${Date.now()}`,
    data: {
      id,
      cid,
      t,
      type,
    }
  })
}

// 获取歌手单曲
export function getArtists(id) {
  return request({
    url: `/artists?id=${id}`
  })
}

// 获取歌手专辑
export function getAlbum(id, limit = 5, offset = 0) {
  return request({
    url: `/artist/album?id=${id}`,
    params: {
      limit,
      offset
    }
  })
}
// 获取专辑内容
export function AlbumContent(id) {
  return request({
    url: `/album?id=${id}`,
    params: {
      timestamp: Date.now()
    }
  })
}

// 获取歌手描述
export function artistDetail(id) {
  return request({
    url: `/artist/desc?id=${id}`
  })
}

// 获取相似歌手
export function simiArtist(id) {
  return request({
    url: `/simi/artist?id=${id}`
  })
}

// 专辑动态信息
export function albumDynamic(id) {
  return request({
    url: `/album/detail/dynamic?id=${id}`
  })
}

// 新版评论接口 获取不到最新评论的回复评论
// export function newComment(id, type, pageNo=1, pageSize=30, sortType=3, cursor=0) {
//   return request({
//     url: `/comment/new?id=${id}`,
//     params: {
//       type,
//       pageNo,
//       pageSize,
//       sortType,
//       cursor
//     }
//   })
// }

// 专辑评论
export function albumComment(id, limit = 30, offset = 0) {
  return request({
    url: `/comment/album?id=${id}`,
    params: {
      limit,
      offset,
      timestamp: Date.now()
    }
  })
}

// 喜欢音乐列表
export function likeList(uid) {
  return request({
    url: `/likelist?uid=${uid}`,
    params: {
      timestamp: Date.now()
    }
  })
}

// 喜欢音乐
export function songLike(id, like = true) {
  return request({
    url: `/like?id=${id}`,
    params: {
      like
    }
  })
}

// 获取视频标签列表
export function groupList() {
  return request({
    url: `/video/group/list`
  })
}

// 获取视频分类列表
export function categoryList() {
  return request({
    url: `/video/category/list`
  })
}

// 获取全部视频列表
export function videoAll(offset = 0) {
  return request({
    url: `/video/timeline/all?offset=${offset}`,
  })
}


// 获取视频标签/分类下的视频
export function getVideo(id, offset = 0) {
  return request({
    url: `/video/group?id=${id}`,
    params: {
      offset,
      timestamp: Date.now()
    }
  })
}

// 获取推荐视频
export function recommendVideo(offset = 0) {
  return request({
    url: `video/timeline/recommend?offset=${offset}`,
  })
}

// 相关视频
export function relatedVideo(id) {
  return request({
    url: `related/allvideo?id=${id}`
  })
}

// 视频详情
export function videoDetail(id) {
  return request({
    url: `video/detail?id=${id}`
  })
}

// 获取视频播放地址
export function videoUrl(id) {
  return request({
    url: `video/url?id=${id}`
  })
}

//获取mv地址
export function mvUrl(id) {
  return request({
    url: `/mv/url?id=${id}`
  })
}

// 获取 mv 数据
export function mvDetail(id) {
  return request({
    url: `/mv/detail?mvid=${id}`
  })
}

// 相似Mv
export function relatedMv(id) {
  return request({
    url: `/simi/mv?mvid=${id}`
  })
}

// mv 评论
export function mvComment(id, limit, offset) {
  return request({
    url: `comment/mv?id=${id}`,
    params: {
      limit,
      offset
    }
  })
}
// 视频评论
export function voideComment(id, limit, offset) {
  return request({
    url: `/comment/video?id=${id}`,
    params: {
      limit,
      offset
    }
  })
}