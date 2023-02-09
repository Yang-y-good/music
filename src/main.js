import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.less'
import 'normalize.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css';
import 'default-passive-events'
import '@/assets/fonts/iconfont.js'
import './assets/fonts/iconfont.css'
import vue3videoPlay from "vue3-video-play"; // 引入组件
import "vue3-video-play/dist/style.css"; // 引入css

import {
  mydirective
} from '@/mydirective'

const app = createApp(App)
app.use(mydirective)
app.use(vue3videoPlay);
const controller = new AbortController();

app.provide('controller', controller)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const errorHandler = (err, vm, info) => {
  console.warn('Vue全局异常捕获开始===========')
  console.log(`Error: ${err.toString()}\nInfo: ${info}`)
  if (err.isAxiosError) {
    console.log('axios请求错误!!')
  }
  console.warn('Vue全局异常捕获结束===========')

}

app.config.errorHandler = errorHandler;

// app.config.globalProperties.$httpUrl = 'https://www.baidu.com'

// app.config.globalProperties.resetSetItem = function (key, newVal) {

//   if (key === 'watchVidStorage') {
//     // 创建一个StorageEvent事件
//     var newStorageEvent = document.createEvent('StorageEvent');
//     const storage = {
//       setItem: function (k, val) {
//         sessionStorage.setItem(k, val);
//         // 初始化创建的事件
//         newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

//         // 派发对象
//         window.dispatchEvent(newStorageEvent)
//       }
//     }
//     return storage.setItem(key, newVal);
//   }

// }

app.use(router)
app.use(store)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)


export {
  controller
}