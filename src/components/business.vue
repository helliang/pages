/*
 * @Author: carrie
 * @Date: 2018-05-22 14:25:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-09 11:09:17
 */
<template>
        <!-- 业务处理 -->
    <div class="business">
        <div class="business-title-icon">
            <img src="../../static/img/banner.png" alt="">
        </div>
        <ul class="container clearfix">
            <!-- <li class="headerTitle">{{container.header}}</li> -->
            <!-- <li> -->
            <!-- <ul class="guild clearfix"> -->
            <li class="position guild" v-for="list in containers" :key="list.id">
                <span>
                    <span class="details">
                        <router-link :to="list.inquire" class="inquire"> <img :src="list.src" alt="" :class="list.img">{{list.details}}</router-link>
                    </span>
                </span>
            </li>
            <!-- </ul> -->
            <!-- </li> -->
        </ul>
        <div class="business-footer-icon">
            <img src="../../static/img/logo@2x.png" alt="">
            <p class="business-footer-title">
                广东省公安厅监所管理总队
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            containers: [
                {
                    src: require("../assets/img/icon-qkxx.png"),
                    // src: "../../static/img/icon-qkxx.png",
                    details: "前科查询",
                    inquire: "/inquire",
                    img: "img1",
                    id: 1
                },

               
                {
                    src: require("../assets/img/yuyuedenji@2x.png"),
                    details: "讯问预约",
                    inquire: "/question",
                    img: "img2",
                    id: "3"
                },
                 {
                    src: require("../assets/img/icon-yujng@2x.png"),
                    details: "全省羁押动态",
                    inquire: "/warning",
                    img: "img2",
                    id: "2"
                },

                // {
                //     src: require("../assets/img/icon-mdm@2x.png"),
                //     details: "面对面",
                //     img: "img3",
                //     inquire: "/face"
                // },
                // {
                //     src: require("../assets/img/icon-th@2x.png"),
                //     details: "个人谈话",
                //     img: "img4",
                //     inquire: "/personTalk"
                // },
                // {
                //     src: require("../assets/img/icon-dz@2x.png"),
                //     details: "房间调整",
                //     img: "img5",
                //     inquire: "/adjustResult?sysUnit=440100113"
                // },
                // {
                //     src: require("../assets/img/fengxiangpinggu@2x.png"),
                //     details: "风险评估",
                //     img: "img4",
                //     inquire: ""
                // }
                // {
                //   header: "所领导岗位",
                //   lists: [
                //     {
                //       src: require('../assets/img/suolingdoshengp@2x.png'),
                //       details: "所领导审批",
                //       img:'img2',
                //        inquire:'approve'
                //     }

                //   ]
                // },
                //  {
                //   header: "入所岗位",
                //   lists: [
                //     {
                //        src: require('../assets/img/icon-rs@2x.png'),
                //       details: "入所",
                //       img:'img1',
                //       inquire:'',
                //       id:'2'
                //     },
                //     {
                //        src: require('../assets/img/icon-fdj@2x.png'),
                //       details: "入所检查",
                //       img:'img2',
                //       inquire:''
                //     }
                //   ]
                // },
                // {
                //   header: "监区值班",
                //   lists:[
                //      {
                //        src: require('../assets/img/icon-jqty@2x.png'),
                //       details: "监区提押",
                //       img:'img2',
                //        inquire:'/district'
                //     },
                //     {
                //        src: require('../assets/img/icon-zbcx@2x.png'),
                //       details: "值班巡视",
                //       img:'img2',
                //        inquire:'/dutyCheck'
                //     }

                //   ]
                // },
                // {
                //   header: "办案",
                //   lists: [
                //     {
                //        src: require('../assets/img/icon-bd@2x.png'),
                //       details: "环节变动",
                //       img:'img2',
                //       //  inquire:'/modifySearch'
                //        inquire:'/modifyChange?sysUnit=440100113'
                //     },
                //     {
                //        src: require('../assets/img/icon-jg@2x.png'),
                //       details: "处理结果",
                //       img:'img2',
                //        inquire:''
                //     },
                //     {
                //        src: require('../assets/img/icon-zq@2x.png'),
                //       details: "延期",
                //       img:'img2',
                //        inquire:''
                //     },
                //     {
                //        src: require('../assets/img/icon-tx@2x.png'),
                //       details: "提讯",
                //       img:'img7',
                //        inquire:''
                //     },
                //     {
                //        src: require('../assets/img/icon-tj@2x.png'),
                //       details: "提解",
                //       img:'img2',
                //        inquire:''
                //     }
                //   ]
                // },
                // {
                //   header: "窗口服务",
                //   lists: [
                //     {
                //        src: require('../assets/img/icon-ls@2x.png'),
                //       details: "律师会见",
                //       img:'img2',
                //        inquire:''
                //     },
                //     {
                //        src: require('../assets/img/icon-js@2x.png'),
                //       details: "家属会见",
                //       img:'img6',
                //        inquire:''
                //     },
                //     {
                //        src: require('../assets/img/icon-wlry@2x.png'),
                //       details: "外来人员登记",
                //       img:'img1',
                //        inquire:''
                //     }
                // ]
                // }
            ]
        };
    },
    mounted() {
        let self = this;
        // 取isuserData里的数据进行判断有没有值
        // console.log(self.containers[0].lists[0].id);
        // if (self.containers[0].lists[0].id === 1) {
        //     //  self.containers[0].lists[0].src=require('../assets/img/icon-ls@2x.png')
        //     console.log("我为1");
        // }
    }
};
</script>
<style lang="less" scoped>
body,html{
    position: relative;
}
.business {
    // position: relative;
    padding-bottom: 1.566667rem;
    font-size: 0.32rem;
}
.business-title-icon{
    img{
        // width:10rem;

        width:100%;
        height: 4.666667rem;
        max-width: 100%;
    }
}
.container {
    // margin-top: 0.4rem;
    background-color: #ffffff;
    box-sizing: border-box;
    .headerTitle {
        border-bottom: 2px solid #ebebeb;
        height: 1.066667rem;
        font-size: 0.373333rem;
        color: rgb(102, 102, 102);
        padding-left: 0.4rem;
        line-height: 1.066667rem;
    }
}
.position {
    float: left;
    width: 33.333333%;
    // height: 2.933333rem;
    padding-top: 0.786667rem;
    padding-bottom: 0.746667rem;
    // border-right: 3px solid #ebebeb;
    // border-bottom: 3px solid #ebebeb;
    color: rgb(85, 85, 85);
    text-align: center;
    span {
        .inquire {
            color: rgb(85, 85, 85);
            font-size: 0.32rem;
        }
        img {
            margin: 0 auto;
        }
    }
}
.guild li {
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    .details {
        display: inline-block;
        // padding-top: 0.293333rem;
    }
}
.position {
    .img1,
    .img2,
    .img3,
    .img4,
    .img5,
    .img6,
    .img7 {
        width: 0.813333rem;
        height: 0.693333rem;
    }
    .img2 {
        width: 0.693333rem;
    }
    .img3 {
        width: 0.853333rem;
    }
    .img4 {
        width: 0.72rem;
    }
    .img5 {
        width: 0.613333rem;
    }
    .img6 {
        width: 0.826667rem;
    }
    .img7 {
        width: 0.64rem;
    }
}
.business-footer-icon{
    position: fixed;
    bottom: 1.173333rem;
    z-index: 100;
    width: 100%;
    text-align: center;
    .business-footer-title{
        color: #8B8B8B;
    }
    img{
        width: .586667rem;
        height: .586667rem;
        max-width: 100%;
        display: inline-block;
    }
}
</style>


