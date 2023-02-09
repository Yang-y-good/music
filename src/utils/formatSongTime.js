export function formatSongTime(millisecond) {
    var days = parseInt(millisecond / (1000 * 60 * 60 * 24));
    var hours = parseInt((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (millisecond % (1000 * 60)) / 1000;
    // 格式化时间
    // 1 : 1 => 01 : 01
    // 01 : 1 => 01 : 01
    // 1 : 01 => 01 : 01
    if(Array.from(minutes.toFixed(0)).length != 2 && Array.from(seconds.toFixed(0)).length != 2){
        return `0${minutes} : 0${seconds.toFixed(0)}`
    }else if(Array.from(minutes.toFixed()).length != 2){
        return `0${minutes} : ${seconds.toFixed(0)}`
    }else if(Array.from(seconds.toFixed()).length != 2){
        return `${minutes} : 0${seconds.toFixed(0)}`
    }
}