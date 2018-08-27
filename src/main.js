// The Vue build version to load with the `import` command
//全局配置 
import Vue from 'vue'
import App from './App'
import router from './router'
import "../static/css/base.css"
import "../static/css/normalize6.0.css"
import store from './store/index'//引用全局的vuex
import axios from 'axios'
// console.log(store)
// 引用接口
import apis from './httpUrl'
// 在原型链上加属性
Vue.prototype.apis = apis;
// console.log(apis.baseURL)

Vue.config.productionTip = false;
// 配置默认路径 
// axios.defaults.baseURL = "http://10.40.29.69.8000";
// axios.defaults.baseURL = "http://192.168.20.90:8888/res072501/jdbg/ydjwCon/getYdjw";
// 在原型上加入axios(在任何组件中都可以使用)
Vue.prototype.$http = axios;

	let isShowFooter=['/home',"/setting","/business"];  //定义我们需要显示的路由页面
  router.beforeEach(function (to, from, next) {
    // console.log(to);
    if (to.path =="/business"){
      store.commit('updateReturnStatus', { btnStatus: true })
    }
    /*
      from 对象中包含当前地址
      to 对象中包含目标地址
      其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
    */ 
	if(isShowFooter.indexOf(to.path)>=0){   //如果存在 就说明改页面是需要隐藏的
        store.commit('updateLoadingStatus', {isShowFooter:true})
        // store.commit('updateReturnStatus', {btnStatus:false})
        // store.commit('updateRecordStatus', { isShowRecord:false});

    }else{
        store.commit('updateLoadingStatus', {isShowFooter:false})
        store.commit('updateReturnStatus', {btnStatus:true})
    }
    store.commit('getHeaderTitle', { headerTitle: to.meta.title });
    if (to.path == "/question"){
      store.commit('updateRecordStatus', { isShowRecord: true });
    }else{
      store.commit('updateRecordStatus', { isShowRecord: false });
    }
    next()
  })
  // 进入或返回都回出现在X:0,Y:0
// router.afterEach((to,from,next) => {
//     window.scrollTo(0,0);
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//在实例中应用store,可以实现组件直接调用
  router,
  components: { App },
  template: '<App/>'
})
