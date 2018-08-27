/*
 * @Author:carrie 
 * @Date: 2018-05-22 16:35:48 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-27 09:49:47
 */
/*
  在这里面描述了开发和构建两种环境下的配置， 前面的build文件夹下也有不少文件引用了index.js里面的配置。

*/
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    // carrie 简化接口 这里只是做了代理   因为是本地的ip  当访问接口的时候 是本地的ip+url但是我通过拦截你的url地址 代理到192.168.1.16这样就避免了跨域
    // 但是上线的时候 访问的线上的地址也就是线上的ip+url这样我不管你的ip怎么变 都是对应的ip+url
    proxyTable: {
      "/apis": {
        // 测试环境
        // target: "http:// 10.40.29.69.8000/jdbg/ydjwCon/getYdjw",  //接口域名
        target: "http://192.168.1.16:8000/jdbg/ydjwCon/getYdjw", //接口域名
        // target: "http://192.168.1.16:8030/jdbg/ydjwCon/getYdjw", //接口域名
        //changeOrigin: false, //是否跨域
        pathRewrite: {
          "^/apis": "" //需要rewrite重写的
        }
      }
    },
    // carrie笔记本的I P
    // host: "192.168.0.137",
    
    // host: "192.168.1.6",//笔记本IP

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
   // port: 4822, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
      port:8080, 
   // carrie  autoOpenBrowser: false,
    autoOpenBrowser: true, //是否在编译（输入命令行npm run dev）后打开http://localhost:8080/页面，以前配置为true，近些版本改为false，个人偏向习惯自动打开页面
    errorOverlay: true, //浏览器错误提示
    notifyOnErrors: true, //跨平台错误提示
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-//使用文件系统(file system)获取文件改动的通知devServer.watchOptions

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  // 构建产品时使用的配置

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "./",
    //打开dist文件夹下新生成的index.html文件，会发现页面空白，打开控制台会发现页面中引用的css和js文件都找不到：只要把assetsPublicPath: "/"改成assetsPublicPath: "./"
    // assetsPublicPath 有两个，一个是build里的，一个是dev里的，只用把build里的改成‘./’，dev里的别改

    /**
     * Source Maps
     */

    // productionSourceMap: true,
     productionSourceMap: false,//是环境设置为生产环境
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};



