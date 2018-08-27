/*
 * @Author: pan 
 * @Date: 2018-05-22 14:26:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-04 16:34:59
 */
<template>
    <div id="warning">
        <div id="warningChart"></div>
        <warningItem :list="list" :titleIcons="titleIcons" :counts="counts" @listenToChildEvent="goWarningList"></warningItem>
        </div>
    <!-- </div> -->
</template>
<script>
import warningItem from "../common/warningItem"
import store from "../../store";
export default {
    name:'warning',
    components :{
        warningItem
    },
    methods: {
        // 去到详情页面
        goWarningList(count){//判断点击的是哪一块内容,然后传入对应的接口参数
            console.log(count);
            console.log("-------------对应的table名------------")
            console.log(count.TABLE);
            // console.log('----------请求前---------------'+count.TABLE)
            let url = "/apis/jdbg/tjCon/getTj?sysUnit=440100113";
        // console.log(url)
         // 所需要的参数
          let params ={
              table:count.TABLE,//男,女,当日入所,当日出所
        };
        // 请求成功
        this.$http.get(url, { params})
        .then(function(data){
            console.log(data)
            console.log(data.data)
            var value = eval('('+data.data+')');
            //  console.log('----------请求成功---------------'+params.table)
            // this.$router.push({path: "/warningList"});
            //  window.location.href="/warningList";
        })
        // .catch( error => console.log(error));
        }
    },
    data(){
        return{
            titleIcons : [
                "/static/img/icon-lttt@2x.png",
                "/static/img/icon-bbb@2x.png",
                "/static/img/icon-yujngg@2x.png"
            ],
            list:[
                {
                    listTitle : "当前关押情况",
                    data : [
                        {
                            icons : "../../../static/img/nv@2x.png",
                            dataTitle : "男",
                        },
                        {
                            icons : "../../../static/img/nan@2x.png",
                            dataTitle : "女",
                        },
                        {
                            icons : "../../../static/img/rusuo@2x.png",
                            dataTitle : "当日入所",
                        },
                        {
                            icons : "../../../static/img/rusuo@2x.png",
                            dataTitle : "当日出所",
                        },
                        {
                            icons : "../../../static/img/zhonfengxsu@2x.png",
                            dataTitle : "重风险数",
                        },
                        {
                            icons : "../../../static/img/zhongbignhaosu@2x.png",
                            dataTitle : "重病号数",
                        },
                    ],
                    total : 0,
                    isShowTotal : true,
                    totalInfo:{},//总数
                    count :[]//存放具体数据
                },
                {
                    listTitle : "当日办理业务",
                    isShowTotal : false,
                    data : [
                        {
                            icons : "../../../static/img/tixun@2x.png",
                            dataTitle : "提讯次数",
                        },
                        {
                            icons : "../../../static/img/tixun@2x.png",
                            dataTitle : "正在提讯",
                        },
                        {
                            icons : "../../../static/img/lvshihuijian@2x.png",
                            dataTitle : "律师会见",
                        },
                        {
                            icons : "../../../static/img/lvshihuijian@2x.png",
                            dataTitle : "正在会见",
                        },
                        {
                            icons : "../../../static/img/jiashuhuijian@2x.png",
                            dataTitle : "家属会见",
                        },
                        {
                            icons : "../../../static/img/jiashuhuijian@2x.png",
                            dataTitle : "正在会见",
                        },
                        {
                            icons : "../../../static/img/chusuojiuyi@2x.png",
                            dataTitle : "出所就医",
                        },
                    ],
                    count :[]
                },
                {
                    listTitle : "数据预警",
                    isShowTotal : false,
                    data : [
                        {
                            icons : "../../../static/img/zhaopiancaji@2x.png",
                            dataTitle : "照片未采集",
                        },
                        {
                            icons : "../../../static/img/zhiwencaiji@2x.png",
                            dataTitle : "指纹未采集",
                        },
                        {
                            icons : "../../../static/img/rusuoweitanhua@2x.png",
                            dataTitle : "入所未谈话",
                        },
                        {
                            icons : "../../../static/img/rusuoweitanhua@2x.png",
                            dataTitle : "本月未谈话",
                        },
                        {
                            icons : "../../../static/img/rusuoweipinggu@2x.png",
                            dataTitle : "入所未评估",
                        },
                        {
                            icons : "../../../static/img/rusuoweipinggu@2x.png",
                            dataTitle : "本月未评估",
                        },
                    ],
                    count :[]
                }
            ],
            counts:[[],[],[]]
            /*jsonData : [
                {TABLE:"TBL_A_PSN-DQZY",COUNT:"13886",NAME:"当前在押"},

                {TABLE:"TBL_A_PSN-NAN",COUNT:"12685",NAME:"当前在押-男"},
                {TABLE:"TBL_A_PSN-NV",COUNT:"1201",NAME:"当前在押-女"},
                {TABLE:"TBL_A_PSN-DRRS",COUNT:"0",NAME:"当日入所"},
                {TABLE:"TBL_A_PSN-DRCS",COUNT:"0",NAME:"当日出所"},
                {TABLE:"TBL_FXPG-0",COUNT:"2332",NAME:"重风险数"},
                {TABLE:"TBL_ZBH",COUNT:"71",NAME:"重病号数"},

                {TABLE:"TBL_PSNARRAIGN-1",COUNT:"0",NAME:"提讯次数"},
                {TABLE:"TBL_PSNARRAIGN-2",COUNT:"0",NAME:"正在提讯"},
                {TABLE:"TBL_PSNLAWYER-1",COUNT:"0",NAME:"律师会见"},
                {TABLE:"TBL_PSNLAWYER-2",COUNT:"0",NAME:"律师正在会见"},
                {TABLE:"TBL_SIB-1",COUNT:"0",NAME:"家属会见"},
                {TABLE:"TBL_SIB-2",COUNT:"0",NAME:"家属正在会见"},
                {TABLE:"TBL_OFFILLNESS",COUNT:"0",NAME:"出所就医"},

                {TABLE:"B_PIC",COUNT:"13866",NAME:"照片未采集"},
                {TABLE:"B_FINGER",COUNT:"13886",NAME:"指纹未采集"},
                {TABLE:"TBL_FXPG-1",COUNT:"865",NAME:"入所未评估"},
                {TABLE:"TBL_FXPG-2",COUNT:"13886",NAME:"本月未评估"},
                {TABLE:"TBL_PSNEDU-2",COUNT:"2",NAME:"入所未谈话"},
                {TABLE:"TBL_PSNEDU-1",COUNT:"13886",NAME:"本月未谈话"},
            ]*/
        }
    }, 
    // 创建完毕状态
    beforeCreate:function(){
        let self = this;
        let url = "/apis/jdbg/tjCon/getTj?sysUnit=440100113";
        // console.log(url)
         // 所需要的参数
          let params ={
              sysUnit:"440100113"
            //   table:TABLE,//男,女,当日入所,当日出所
            //   count:COUNT,//总数
            //   name:NAME,//当前在押-->男,女,当日入所,当日出所,重风险数
        };
        // 请求成功
        self.$http.get(url, { params})
        .then(function(data){//转数组 
               var value = eval('('+data.data+')');
            //    console.log(value)
               value.json.forEach((item,i) => {//遍历所有
                    // console.log(item)
                    // console.log(i)
                     if(i == 0){//致生病号数
                    self.list[0].totalInfo = item;
                    self.list[0].total = item.COUNT;
                }else if(i < 7){//
                    self.list[0].count.push(item);
                    self.counts[0].push(item.COUNT);
                }else if(i < 14){//
                    self.list[1].count.push(item);
                     self.counts[1].push(item.COUNT);
                }else if(i < 20){//
                    self.list[2].count.push(item);
                     self.counts[2].push(item.COUNT);
                }
               });
        })
        .catch(function(error) {
            // 请求错误时
            console.log(error);
          });
        // 小潘的json
        // this.$http.get('/static/json/warning.json').then(response => {
        //     var value = eval("(" + response.data + ")");
        //     value.json.forEach((item,i) => {
        //         if(i == 0){
        //             self.list[0].totalInfo = item;
        //             self.list[0].total = item.COUNT;
        //         }else if(i < 7){
        //             self.list[0].count.push(item);
        //         }else if(i < 14){
        //             self.list[1].count.push(item);
        //         }else if(i < 20){
        //             self.list[2].count.push(item);
        //         }
        //     })
        // })
    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>
#warning{
    background: url(/static/img/shujubeij@2x.png) repeat;
    margin-top: -.41rem;
    padding-bottom: .4rem;
    #warningChart{
        width: 90%;
        height: 4.08rem;
        margin: .4rem 5%;
        background: url(/static/img/tubiao@2x.png) no-repeat;
        background-size: 100% 100%;   
    }
}
</style>


