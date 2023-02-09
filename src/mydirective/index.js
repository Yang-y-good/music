const imageIsExist = function (url) {
    return new Promise((resolve, reject) => {
        // 创建图片实例
        const image = new Image()
        // 将图片地址添加上
        image.src = url
        // 当纯 HTML 被完全加载以及解析时 load事件触发

        image.onload = function () { 
            // 表示图片是否完全加载完成。
            if (this.complete === true) {
                resolve(image)
            }
        }
        image.onerror = function () { // 图片加载失败
            reject('could not load image')
        }
    })
}

export const mydirective = {
    install(app) {
        app.directive('image', (el, binding) => {
            let placeholderImage = require('@/assets/logo.png') // 默认占位图
            let defaultImage = el.getAttribute('default-img') // 外部传入的默认占位图
            let errorImage = el.getAttribute('error-img') // 外部传入的错误占位图

            // 300毫秒未请求到图片数据显示占位图
            const times = setTimeout(() => {
                el.setAttribute('src', defaultImage || placeholderImage)
            }, 300);
            // el.setAttribute('class', 'img-objectfix-contain') 

            let realImageUrl = binding.value // 获取图片地址（ v-image="cover" 的 cover）

            if (realImageUrl) {
                imageIsExist(realImageUrl)
                    .then((res) => {
                        clearTimeout(times)
                        el.setAttribute('src', realImageUrl)
                    })
                    .catch(() => {
                        el.setAttribute('src', errorImage || placeholderImage)
                    })
            }
        })
    }
}