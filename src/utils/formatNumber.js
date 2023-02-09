export function formatNumber(num) {
    const arr = Array.from(String(num))
    //十万
    if (arr.length === 6) {
        return arr.join('').slice(0, 2) + '万'
    }
    // 百万
    if (arr.length === 7) {
        return arr.join('').slice(0, 3) + '万'
    }
    // 千万
    if (arr.length === 8) {
        return arr.join('').slice(0, 4) + '万'
    }
    // 亿
    if (arr.length === 9) {
        return arr.join('').slice(0, 1) + '亿'
    }
    // 十亿
    if (arr.length === 10) {
        return arr.join('').slice(0, 2) + '亿'
    }
    // 百亿
    if (arr.length === 11) {
        return arr.join('').slice(0, 3) + '亿'
    }

    return num
}

// console.log(formatNumbet(183456))