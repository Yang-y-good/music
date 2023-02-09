import {
    useStore
} from "vuex";
import { computed, ref } from "vue";
import { songLike } from "~/network";

const store = useStore()
// 获取用户id
const useruid = computed(() => {
    const result = store.state.login.account;
    return result.id || null;
});

const likelist = ref([]);

// 获取用户喜欢列表
const funlicklist = () => {
    if (useruid)
        store.dispatch("login/getLikeList", useruid.value).then((res) => {
            likelist.value = res;
        });
};
funlicklist();

/**
 * 
 * @param {*} id 歌曲id 
 * @param {*} like ture喜欢 false不喜欢
 */
const uselike = async (id, like = true) => {
    const result = await songLike(id, like);
    funlicklist();
    if (result.code === 200 && like == true) {
        ElMessage({
            message: "已添加到我的喜欢",
            grouping: true,
            type: "success",
        });
    } else if (like == false) {
        ElMessage({
            message: "取消喜欢成功",
            grouping: true,
            type: "success",
        });
    }
};

export {
    likelist,
    uselike
}