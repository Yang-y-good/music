import {
    onActivated,
    ref
} from "vue";
/**
 * 
 * @param {ref} ele 滚动条元素
 */
export function useScrollPostion(ele) {
    // 保存滚动条位置
    const scrolltop = ref()
    onActivated(() => {
        if (ele.value) {
            // 重新设置滚动条距离顶部高度
            ele.value.setScrollTop(parseInt(scrolltop.value));
        }
    })
    // 监听滚动条的变化
    onscroll = ({
        scrollLeft,
        scrollTop
    }) => {
        scrolltop.value = scrollTop
    };
    return onscroll

}