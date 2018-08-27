/*
 * @Author: pan 
 * @Date: 2018-05-22 14:26:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-09 10:32:49
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
import { strToJson, setList } from "../../common";
export default {
    name:'warning',
    components :{
        warningItem
    },
    methods: {
        // 去到详情页面
        goWarningList(count){//判断点击的是哪一块内容,然后传入对应的接口参数
            var self = this;
            // console.log(count.TABLE);
            // console.log('----------请求前---------------'+count.TABLE)
         // 所需要的参数
          let params ={
              table:count.TABLE,//男,女,当日入所,当日出所
               type:11,
               curPage: "-1",
               rowperpage:"-1",
              tableZd:"P_KEY,NAME,INDATE,ROOM_NO,CASECLASS,SEX",
            //   sysUnit:440100113
              sysUnit:44
        };
        console.log(params.table)
        this.$http.get(this.apis.baseURL, { params})
        .then(function(data){
            if(data.data.status == 200){
                // console.log(data)
                 localStorage.setItem( "coffeeType",JSON.stringify(data.data.record));
                self.$router.push({
                    path: "/warningList",
                    query:{ // 在目标页面通过this.$route.query获取参数：
                        table:params.table
                        }
                    });

            }else{
                console.log("请求出错!")
            }
            //  window.location.href="/warningList";
        })

        // 请求成功
        // this.$http.get(url, { params})
        // .then(function(data){
        //         console.log(data)
        //     //  console.log('----------请求成功---------------'+params.table)
        //     // this.$router.push({path: "/warningList"});
        //     //  window.location.href="/warningList";
        // })
        .catch( error => console.log(error));
        }
    },
    data(){
        return{
            titleIcons : [
                require('../../assets/img/icon-lttt@2x.png'),
                require('../../assets/img/icon-bbb@2x.png'),
                require('../../assets/img/icon-yujngg@2x.png'),
            ],
            list:[
                {
                    listTitle : "当前关押情况",
                    data : [
                        {
                            icons : require('../../assets/img/nv@2x.png'),
                            dataTitle : "男",
                        },
                        {
                            icons : require('../../assets/img/nan@2x.png'),
                            dataTitle : "女",
                        },
                        {
                            icons : require('../../assets/img/rusuo@2x.png'),
                            dataTitle : "当日入所",
                        },
                        {
                            icons : require('../../assets/img/rusuo@2x.png'),
                            dataTitle : "当日出所",
                        },
                        {
                            icons : require('../../assets/img/zhonfengxsu@2x.png'),
                            dataTitle : "重风险数",
                        },
                        {
                            icons : require('../../assets/img/zhongbignhaosu@2x.png'),
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
                            icons : require('../../assets/img/tixun@2x.png'),
                            dataTitle : "提讯次数",
                        },
                        {
                             icons : require('../../assets/img/tixun@2x.png'),
                            dataTitle : "正在提讯",
                        },
                        {
                             icons : require('../../assets/img/lvshihuijian@2x.png'),
                            dataTitle : "律师会见",
                        },
                        {
                             icons : require('../../assets/img/lvshihuijian@2x.png'),
                            dataTitle : "正在会见",
                        },
                        {
                             icons : require('../../assets/img/jiashuhuijian@2x.png'),
                            dataTitle : "家属会见",
                        },
                        {
                             icons : require('../../assets/img/jiashuhuijian@2x.png'),
                            dataTitle : "正在会见",
                        },
                        {
                             icons : require('../../assets/img/chusuojiuyi@2x.png'),
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
                             icons : require('../../assets/img/zhaopiancaji@2x.png'),
                            dataTitle : "照片未采集",
                        },
                        {
                             icons : require('../../assets/img/zhiwencaiji@2x.png'),
                            dataTitle : "指纹未采集",
                        },
                        {
                             icons : require('../../assets/img/rusuoweitanhua@2x.png'),
                            dataTitle : "入所未谈话",
                        },
                        {
                             icons : require('../../assets/img/rusuoweitanhua@2x.png'),
                            dataTitle : "本月未谈话",
                        },
                        {
                             icons : require('../../assets/img/rusuoweipinggu@2x.png'),
                            dataTitle : "入所未评估",
                        },
                        {
                             icons : require('../../assets/img/rusuoweipinggu@2x.png'),
                            dataTitle : "本月未评估",
                        },
                    ],
                    count :[]//存放具体数据
                }
            ],
            counts:[[],[],[]]
        }
    }, 
    mounted(){
        var self = this;
        let params = {
            type:"0401",
			sysUnit:44
        };
        //添加数据预警内容
        // var dataUrl ="../../../static/json/warning.json"
        self.$http.get(this.apis.baseURL,{params}).then(response => {
            // console.log(response)
            /*
                {'json':[
                    {"TABLE":"skss.dqza","COUNT":"1153","NAME":"当前在押"},{"TABLE":"skss.nan","COUNT":"1153","NAME":"当前在押-男"},{"TABLE":"skss.nv","COUNT":"0","NAME":"当前在押-女"},{"TABLE":"skss.drrs","COUNT":"1","NAME":"当日入所"},{"TABLE":"skss.drcs","COUNT":"0","NAME":"当日出所"},{"TABLE":"skss.zfxs","COUNT":"1447","NAME":"重风险数"},{"TABLE":"skss.zbhs","COUNT":"56","NAME":"重病号数"},{"TABLE":"skss.drtxcs","COUNT":"58","NAME":"提讯次数"},{"TABLE":"skss.drzztx","COUNT":"10","NAME":"正在提讯"},{"TABLE":"skss.drlshj","COUNT":"28","NAME":"律师会见"},{"TABLE":"skss.drlszzhj","COUNT":"8","NAME":"律师正在会见"},{"TABLE":"skss.drjshj","COUNT":"3","NAME":"家属会见"},{"TABLE":"skss.drjszzhj","COUNT":"0","NAME":"家属正在会见"},{"TABLE":"skss.drcsjy","COUNT":"0","NAME":"出所就医"},{"TABLE":"skss.zpwcj","COUNT":"1","NAME":"照片未采集"},{"TABLE":"skss.zwwcj","COUNT":"1153","NAME":"指纹未采集"},{"TABLE":"skss.rswpg","COUNT":"1","NAME":"入所未评估"},{"TABLE":"skss.bywpg","COUNT":"0","NAME":"本月未评估"},{"TABLE":"skss.rswth","COUNT":"1","NAME":"入所未谈话"},{"TABLE":"skss.bywth","COUNT":"3","NAME":"本月未谈话"}]}
            */ 
             let value = response.data;   
             console.log(value)        
             value = eval("(" + value + ")");
            //  console.log(value);
             value.json.forEach((item,i) => {
                 console.log(item)
                 if(i == 0){
                     self.list[0].totalInfo = item;
                     self.list[0].total = item.COUNT;
                 }else if(i < 7){
                     self.list[0].count.push(item);
                     self.counts[0].push(item.COUNT);
                 }else if(i < 14){
                     self.list[1].count.push(item);
                     self.counts[1].push(item.COUNT);
                  
                 }else if(i < 20){
                     self.list[2].count.push(item);
                     self.counts[2].push(item.COUNT);
                  
                 }
             })
        })
        // this.$http.get("/jdbg/ydjwCon/getYdjw", { params})
        //     .then(function(data){
        //         console.log(data)
        //     })
        // axios.get(url, {
		// 	 params:{//预警
		// 			"type":0401,
		// 			"sysUnit":44010013
		//             }
		//   })
		//   .then(function (response) {
		// 	  console.log(response)
		//   }); 
    }
}
</script>
<style lang="less" scoped>
#warning{
    // background: url(../../assets/img/shujubeij@2x.png) repeat;
    background: url(../../../static/img/shujubeij@2x.png) repeat;
    margin-top: -.41rem;
    padding-bottom: .4rem;
    #warningChart{
        width: 90%;
        height: 4.08rem;
        margin: .4rem 5%;
        // background: url(../../assets/img/tubiao@2x.png) no-repeat;
        background: url('../../../static/img/tubiao@2x.png') no-repeat;
        background-size: 100% 100%;   
    }
}
</style>


