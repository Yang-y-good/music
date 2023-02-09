import store from '../store/index'
/**
 * 缓存/清除组件
 */
export default () => {
    /**
     * // 记录需缓存的路由/组件
     * @param {*} router 全局路由 
     */
    function CacheView(router) {
        const keepAliveViews = [];
        router.getRoutes().forEach((routeItem) => {
         
            if (routeItem.meta.keepAlive) {
                // 组件name和路由name保持一致, 所以可以直接使用routeItem.name
                // 也可以在 meta 中添加属性 compName 来用,或其他方案
                keepAliveViews.push(routeItem.name);
                
            }
        });
        // 将需要缓存的组件保存至vuex
        store.commit("saveKeepAliveViews", {
            keepAliveViews
        });
    }
    /**
     * 清除路由组件缓存
     * @param {*} cleanCompName 组件名称
     */
    function clearCacheView(cleanCompName) {
        store.commit("clearCacheView", {
            notAliveViews: cleanCompName
        });
        // 清除缓存后,要重置数组为空,下次才能再次缓存
        // 实际上不知道什么时候会完成缓存的清除,这里取500ms,一般满足需求
        setTimeout(() => {
            store.commit("clearCacheView", {
                notAliveViews: []
            });
        }, 500);
    }

    return {
        CacheView,
        clearCacheView
    }
};