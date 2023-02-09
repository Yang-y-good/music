import {
    throttle
} from '@/utils/throttle'
import {
    commentStar
} from "~/network";

// 给评论点赞
/**
 * 
 * @param {Number} delay 间隔时间
 * @returns {Function} 节流函数
 */
export function useHandleStar(delay) {
    function foo(id, cid, t, type, callback) {
        commentStar(id, cid, t, type).then((res) => {
            callback(res)
        })
    }
return throttle(foo, delay)
}

