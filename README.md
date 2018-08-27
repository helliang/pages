# vue_app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
<!-- 6-22 -->
## 修改过个人谈话中的录音功能,已备份
<!-- 6.28 -->
##重新换了接口请求,因为石总说所有渲染的内容都要从json中读取
### target: "http://192.168.1.16:8000/jdbg/ydjwCon/getYdjw", //接口域名
<!-- 7.4 -->
##修改了jquery-weui的css中select的配置

<!-- 7.24 -->
##在省厅修改了接口,在Main.js中使用了默认接口,数据预警数据待提供,查询页面的等于接口待后台提供

##2.修改了业务图片的路径,用了请求require
<!-- 7-27 -->
# 修改了数据预警的背景图位置
#修改了build /utils.js中的配置 
 if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        // 背景图的时候使用
        publicPath:'../../',
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  },让页面一加载的时候可以找到背景图的位置
 
 #在业务处理页面只显示前科查询和全省羁押动态以及讯问预约页面
 #待处理事件为接收后后进来的数据控制业务处理页面哪些为警务用,哪些为游客用,增加讯问预约页面,要求周一完成 
 <!-- 8.2 -->
 #修改setting中的Img尺寸
 <!-- 8-8 -->
 #去掉导航.动态信息.设置页面,更改业务处理布局
 #在所类型只有历史人员
 # sysUnit: "440100113" // 广州市编号
 <!-- 8-16安装了npm i vue-infinite-scroll -D 滚动插件 -->
 #9-17 安装了http://mint-ui.github.io/#!/zh-cn 滚动加载插件
 
 
