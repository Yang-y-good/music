const axios = require('axios')


const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 3000,
  withCredentials: true,
  //设置全局的请求次数，请求的间隙
  retry: 3,
  retryDelay: 3000,
});


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('正在请求数据');

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});



// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.data.code === 500) {
    ElMessage({
      message: `错误代码${response.data.code}`,
      type: 'error',
    })
  }
  if (response.status === 200) {
    return response.data
  }
  // 对响应数据做点什么    
  // return response.data
}, function (error) {
  // 对响应错误做点什么
  // if (error.message == 'Network Error') {
  //   ElMessage({
  //     message: '未能检测到网络',
  //     type: 'error',
  //     grouping: true
  //   })
  // }
  // 拿到错误的结果配置
  const config = error.config
  // 如果为空或者为设置请求间隔时间将直接拒绝
  if (!config || !config.retry) return Promise.reject(error)
  // 记录请求次数
  config.__retryCount = config.__retryCount || 0;
  // 判断请求次数是否大于设置的次数
  if (config.__retryCount >= config.retry) {
    ElMessage({
      message: '页面请求超时！请重新刷新',
      type: 'error',
      grouping: true
    })
    return Promise.reject(error);
  }
  // 增加请求次数
  config.__retryCount += 1;

  // 使用promise间隔请求时间
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      console.log("请求失败, 3秒后重新请求");
      resolve();
    }, config.retryDelay || 1);
  });

  // 重新执行请求
  return backoff.then(function () {
    return instance(config);
  });

});

export default instance