import {singerList, getArtists, getAlbum, AlbumContent, albumDynamic, artisiMv} from '~/network'
export const singer = {
    namespaced: true,
    state: {
        more: true,
        // 歌手列表
        singerInfo: [],
        // 歌手id
        singerId: '',
        // 歌手信息
        artist: {},
        // 歌手热门歌曲
        hotSongs: [],
        // 歌手专辑
        artistAlbums: [],
        // 专辑歌曲
        albumSons: []

    },
    mutations: {
        changeSingerInfo(state, artist){
            state.singerInfo = artist
        },
        changemore(state, more){
            state.more = more
        },
        changeArtist(state, artist) {
            state.artist = artist
        },
        changeHotSongs(state, hotSongs){
            state.hotSongs = hotSongs
        },
        changeHotAlbums(state, hotAlbums){
            state.artistAlbums = hotAlbums
        },
        changeAlbumSons(state, album) {
            state.albumSons = album
        }
    },
    actions: {
        // 歌手列表
        async  getSingerInfo({commit}, {area, type, initial, offset, limit}){
            const {artists} = await singerList(area,type,initial,offset, limit)
            commit('changeSingerInfo',artists)
            
        },

        // 无限滚动
        async  getscrollInfo({commit}, {area, type, initial, offset, limit}){
            const {artists, more} = await singerList(area,type,initial,offset, limit)
            return artists
        },

        // 获取歌手单曲
        async getArtistsInfo({commit}, id) {
            const {artist, hotSongs, code} = await getArtists(id)
            commit('changeArtist',artist)
            commit('changeHotSongs', hotSongs)
            return code
        },
        // 获取歌手专辑
        async getAlbumList ({commit}, {id, limit, offset}) {
            console.log(id);
            const { hotAlbums, more } = await getAlbum(id, limit, offset) 
            commit('changeHotAlbums',hotAlbums)
            commit('changemore', more)
            return hotAlbums
        },
        // 获取专辑内容
        async getAlbumContents({commit}, id) {
            // const {album, songs} = await AlbumContent(id)
            // commit('changeAlbumContent',album)
            return Promise.resolve(AlbumContent(id))
        },
        async getAlbumContent({commit}, ids) {
            const {album, songs} = await AlbumContent(ids)
            commit('changeAlbumSons',songs)
            return album
        },

        // 专辑动态信息
        async getAlbumDynamic({commit}, id) {
            const result = await albumDynamic(id)
            return result
        },
        // 歌手MV
        async getArtisiMv ({commit}, {id, limit, offset}) {
            const result = await artisiMv(id, limit, offset)
            console.log(result);
            return result
        }
    }
}