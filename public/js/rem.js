function remSize() {
    //获取设备的宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth > 1920) {
        deviceWidth = 1700
    }
    if (deviceWidth < 1680 && deviceWidth >= 1080) {
        deviceWidth = 1350
    }
    if (deviceWidth < 1080 && deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth < 750) {
        deviceWidth = 750
    }
    //750px-->1rem=100px,375px-->1rem=50px
    document.documentElement.style.fontSize = (deviceWidth / 10) + 'px'
    // 设置字体大小
    document.querySelector('body').style.fontSize = 0.15 + "rem"
}
remSize()
// 当窗口发生变化就调用
window.onresize = function () {
    remSize()
}