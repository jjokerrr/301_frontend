const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host:'0.0.0.0', //可以忽略不写
    host:'localhost', //可以忽略不写
    port: 8001,//它是用来修改你打开后的端口号的
    open: true,//值为 true的话，项目启动时自动打开到浏览器里边， false不会打开
    proxy:{
        '/api/W':{
          target:'http://localhost:8000',//跨域请求的公共地址
          changeOrigin:true, //是否开启跨域，值为 true 就是开启， false 不开启
          logLevel:'debug',
          pathRewrite:{
              '^/api/W': ''//注册全局路径， 但是在你请求的时候前面需要加上 /api  
          }
        },
        '/api/':{
          target:'http://localhost:8000',//服务器： 'http://10.112.147.7:5000',//实验室：'http://10.112.146.87:5000',//跨域请求的公共地址
          changeOrigin:true, //是否开启跨域，值为 true 就是开启， false 不开启
          logLevel:'debug',
          pathRewrite:{
              '^/api/': ''//注册全局路径， 但是在你请求的时候前面需要加上 /api  
          }
        },
        '/api/L':{
          target:'http://localhost:8000',//跨域请求的公共地址
          changeOrigin:true, //是否开启跨域，值为 true 就是开启， false 不开启
          logLevel:'debug',
          pathRewrite:{
              '^/api/L': ''//注册全局路径， 但是在你请求的时候前面需要加上 /api  
          },
        }
      }
    },
  })

