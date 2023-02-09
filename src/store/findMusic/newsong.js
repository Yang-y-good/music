import { newSongSpeed, songDetail, newAlbum, allAlbum} from "~/network"
export const newsong = {
    namespaced: true,
    state: {
        musicInfo: [],
        monthData: [],
        weekData: []
    },
    mutations: {
        changeMonthData(state, monthData){
            state.monthData = monthData
        },
        changeWeekData(state, weekData){
            state.weekData = weekData
        }

    },
    actions: {
        // 请求新歌速递
        async getNewMusicInfo({commit}, type){
            // console.log(type);
            const result = await newSongSpeed(type)
            
            return result.data
        },
        // 请求歌曲详情
        async getMusicDetail({commit}, id){
            const result = await songDetail(id)
            return result.songs
        },
        // 新碟上架
        async getnewAlbum({commit}, {area, type}){
            const {monthData, weekData} = await newAlbum(area, type)
            commit('changeMonthData', monthData)
            commit('changeWeekData', weekData)
            return monthData
        },
        async getAllAlbum({commit}, area) {
            const result = await allAlbum(area)
            commit('changeMonthData', result.albums)
            commit('changeWeekData', [])
            console.log(result);
        }
    }
}