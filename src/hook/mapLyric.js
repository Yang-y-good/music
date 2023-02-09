/**
 * 对歌词进行转化
 * @param {*} lyric 
 * @return 转化后的歌词
 */
export function mapLyric(lyric) {
    // console.log(lyric);
    const ric = lyric.split(/[\n]/).map((item) => {
        // 截取分钟
        const min = item.slice(1, 3);
        // 截取秒数
        const sec = item.slice(4, 6);
        // if (mill.indexOf("]") != -1) {
        //   mill = item.slice(7, 9);
        // }
        // 截取毫秒
        let mill = item.slice(7, item.indexOf("]"));
        // 截取歌词
        let lyric = item.slice(item.indexOf("]") + 1, item.length);
        // 格式化当前歌词时间
        const currentTime =
            parseInt(min) * 60 + parseInt(sec) + parseInt(mill) / 1000;
        return {
            min,
            sec,
            mill,
            lyric,
            currentTime
        };
    });
    //数据多出了一个数组，删掉最后一个数组
    ric.pop();

    // 获取下一句歌词的时间
    ric.forEach((item, index) => {
        if (index === ric.length - 1) {
            item.nextTime = 0;
        } else {
            item.nextTime = ric[index + 1].currentTime;
        }
    });

    // 将映射的歌词信息返回出去
    return ric;
}