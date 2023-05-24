const {
  defineConfig
} = require('@vue/cli-service')
// 自动引入element-plus
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  // 解决打包后路径问题
  publicPath: './',
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    // proxy: {
    //   '/api': {       //'/api'是自行设置的请求前缀
    //     target: 'https://www.engin.top/',
    //     pathRewrite:{'^/api':''},  //路径重写，（正则）匹配以api开头的路径为空（将请求前缀删除）
    //     ws: true,//用于支持websocket
    //     changeOrigin: true //用于控制请求头中的host值
    //   },

    // }
    // host: 'localhost',
    // https:false,
    // port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // }
  },
  configureWebpack: {
    // 自动引入element-plus
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~': path.resolve(__dirname, './')
      }
    }
  }
})