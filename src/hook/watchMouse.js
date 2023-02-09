import {ref} from 'vue';
/**
 * 
 * @param {*} dom dom元素
 * @returns boolean
 */

export function watchMouse(dom) {
    // 检测到鼠标移进
    const isShow = ref(true)
    dom.addEventListener('mouseover',(e) => {
        isShow.value = false
    })
    // 检测到鼠标移出
    dom.addEventListener('mouseleave',(e) => {
        isShow.value = true
    })

    return isShow
}