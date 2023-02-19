const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//关闭eslint检验
  //代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://39.98.123.211',//数据来源于哪台服务器
        //pathRewrite:{'^/api':''}
        changeOrigin: true
      }
    }
  }
})
