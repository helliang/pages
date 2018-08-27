/*
 * @Author: carrie
 * @Date: 2018-05-22 14:26:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-22 14:27:03
 */
import Vue from 'vue'
import Router from 'vue-router'
// import home from "../components/home"
import business from "../components/business"
// import setting from "../components/setting"
import inquire from "../components/inquire"
import result from "../components/result"
import info from "../components/info"
// import modifySearch from "../components/pages/modifySearch";
// import modifyResult from "../components/pages/modifyResult";
import warning from "../components/pages/warning";
import face from "../components/pages/faceTo";
import modifyChange from "../components/pages/modifyChange";
// import adjustList from "../components/pages/adjustList";
import adjustResult from "../components/pages/adjustResult"
// import adjustSearch from "../components/pages/adjustSearch";
import district from "../components/pages/district"
import putInfo from "../components/pages/putInfo"
import warningList from "../components/pages/warningList"
import warningInfo from "../components/pages/warningInfo"
import dutyCheck from "../components/pages/dutyCheck"
import personTalk from "../components/pages/personTalk"
import approve from "../components/pages/approve/approve"
import approveReult from "../components/pages/approve/approveReult"
// 讯问预约
import question from '../components/pages/question/question.vue'
// 预约记录
import record from '../components/pages/question/record/record.vue'
// 暂无记录页面
import noRecord from '../components/pages/question/record/noRecord.vue'
// 预约详情
import approveDetails from '../components/pages/question/approveDetails/approveDetails'
// 
import native from '../components/common/chooseArea.vue'


import father from "../components/test/father"
// import child from "../components/test/child";
Vue.use(Router)

export default new Router({
  // mode: "history",
  linkActiveClass: "on",
  scrollBehavior (to, from, savedPosition) {
    // 退回页面所在的位置
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.keepAlive) {
          from.meta.savedPosition = document.body.scrollTop
        }
        return { x: 0, y: to.meta.savedPosition || 0 }
      }
    },
  routes: [
    // {
    //   path: "/home",
    //   name: "home",
    //   component: home,
    //   meta: {
    //     title: "动态信息"
    //   }
    // },
    {
      path: "/business",
      name: "business",
      component: business,
      meta: {
        title: "粤警监管" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    // {
    //   path: "/setting",
    //   name: "setting",
    //   component: setting,
    //   meta: {
    //     title: "设置" // 添加该字段，表示进入这个路由是需要登录的
    //   }
    // },
    {
      path: "*", // 重定向的组件
      redirect: "/business"
    },
    {
      path: "/inquire",
      name: "inquire",
      component: inquire,
      meta: {
        title: "前科查询" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/result",
      name: "result",
      component: result,
      meta: {
        title: "查询结果" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/info",
      name: "info",
      component: info,
      meta: {
        title: "人员基本信息" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/question",
      name: "question",
      component: question,
      meta: {
        title: "讯问预约" // 添加该字段，表示进入这个路由是需要登录的
      }
      
    },
    {
      path: "/record",
      name: "record",
      component: record,
      meta: {
        title: "预约记录" // 添加该字段，表示进入这个路由是需要登录的
      }

    },
    {
      path: "/noRecord",
      name: "noRecord",
      component: noRecord,
      meta: {
        title: "预约记录" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/approveDetails",
      name: "approveDetails",
      component: approveDetails,
      meta: {
        title: "预约详情" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    // {
    //   path: "/modifySearch",
    //   name: "modifySearch",
    //   component: modifySearch,
    //   meta: {
    //     title: "环节变动" // 添加该字段，表示进入这个路由是需要登录的
    //   }
    // },
    // {
    //   path: "/modifyResult",
    //   name: "modifyResult",
    //   component: modifyResult,
    //   meta: {
    //     title: "环节变动" // 添加该字段，表示进入这个路由是需要登录的
    //   }
    // },
    {
      path: "/modifyChange",
      name: "modifyChange",
      component: modifyChange,
      meta: {
        title: "环节变动" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/warning",
      name: "warning",
      component: warning,
      meta: {
        title: "数据预警" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/face",
      name: "face",
      component: face,
      meta: {
        title: "面对面管理" // 添加该字段，表示进入这个路由是需要登录的
      }
    },

    // {
    //   path: "/adjustSearch",
    //   name: "adjustSearch",
    //   component: adjustSearch,
    //   meta: {
    //     title: "房间调整" // 添加该字段，表示进入这个路由是需要登录的
    //   }
    // },
    // {
    //   path: "/adjustList",
    //   name: "adjustList",
    //   component: adjustList,
    //   meta: {
    //     title: "房间调整" // 添加该字段，表示进入这个路由是需要登录的
    //   }
    // },
    {
      path: "/adjustResult",
      name: "adjustResult",
      component: adjustResult,
      meta: {
        title: "房间调整" // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/district",
      name: "district",
      component: district,
      meta: {
        title: "监区提押"
      }
    },
    {
      path: "/putInfo",
      name: "putInfo",
      component: putInfo,
      meta: {
        title: "监区提押"
      }
    },
    {
      path: "/warningList",
      name: "warningList",
      component: warningList,
      meta: {
        title: "数据预警"
      }
    },
    {
      path: "/warningInfo",
      name: "warningInfo",
      component: warningInfo,
      meta: {
        title: "数据预警"
      }
    },
    {
      path: "/dutyCheck",
      component: dutyCheck,
      meta: {
        title: "值班巡视"
      }
    },
    {
      path: "/personTalk",
      component: personTalk,
      meta: {
        title: "个人谈话"
      }
    },
    {
      path: "/approve",
      component: approve,
      meta: {
        title: "待所领导审批"
      }
    },
    {
      path: "/approveReult",
      name: 'approveReult',
      component: approveReult,
      meta: {
        title: "待所领导审批"
      }
    },
    {
      path: "/father",
      name: 'father',
      component: father,
      meta: {
        title: "滚动测试加载"
      }
    },
  ]
});
