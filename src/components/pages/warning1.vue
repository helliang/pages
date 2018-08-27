/*
 * @Author: pan 
 * @Date: 2018-05-22 14:26:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-10 10:15:20
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
            // let url = "../../../static/json/test.json";
            let params ={
               table:count.TABLE,           
               type:11,
               curPage: "-1",
               rowperpage:"-1",
              tableZd:"P_KEY,NAME,INDATE,ROOM_NO,CASECLASS,SEX",
              sysUnit:440100113
            };
            self.$router.push({
                path: "/warningList",
                query: {
                    table : params.table
                }
            });
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
                        },
                        {
                            icons : require('../../assets/img/nan@2x.png'),
                        },
                        {
                            icons : require('../../assets/img/rusuo@2x.png'),
                        },
                        {
                            icons : require('../../assets/img/rusuo@2x.png'),
                        },
                        {
                            icons : require('../../assets/img/zhonfengxsu@2x.png'),
                        },
                        {
                            icons : require('../../assets/img/zhongbignhaosu@2x.png'),
                        },
                    ],
                    isShowTotal : true,
                },
                {
                    listTitle : "当日办理业务",
                    isShowTotal : false,
                    data : [
                        {
                            icons : require('../../assets/img/tixun@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/tixun@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/lvshihuijian@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/lvshihuijian@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/jiashuhuijian@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/jiashuhuijian@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/chusuojiuyi@2x.png'),
                        },
                    ],
                },
                {
                    listTitle : "数据预警",
                    isShowTotal : false,
                    data : [
                        {
                             icons : require('../../assets/img/zhaopiancaji@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/zhiwencaiji@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/rusuoweitanhua@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/rusuoweitanhua@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/rusuoweipinggu@2x.png'),
                        },
                        {
                             icons : require('../../assets/img/rusuoweipinggu@2x.png'),
                        },
                    ],
                }
            ],
            counts:[
                [
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.dqza",
                    },
                ],
                [
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.nan",
                    },
                    {   
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.nv",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drrs",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drcs",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.zfxs",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.zbhs",
                    }
                ],
                [
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drtxcs",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drzztx",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drlshj",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drlszzhj",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drjshj",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drjszzhj",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.drcsjy",//
                    },
                ],
                [
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.zpwcj",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.zwwcj",  
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.rswth",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.bywth",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.rswpg",
                    },
                    {
                        "dataTitle" : "",
                        "count" : 0,
                        "TABLE":"skss.bywpg",
                    }
                ]            
            ]
        }
    }, 
    mounted(){
        var self = this;
        let params = {
            type:"0401",
			sysUnit:44
        };
        //添加数据预警内容
        self.$http.get(this.apis.baseURL,{params}).then(response => {
            let value = response.data;           
            console.log(value)
             value = eval("(" + value + ")");
             value.json.forEach((item,i) => {
                self.counts.forEach((item1)=>{
                    item1.forEach((item2)=>{
                        if (item2.TABLE == item.TABLE) {
                            item2.dataTitle = item.NAME;
                            item2.count = item.COUNT;
                        }
                    })
                })
                /*
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
                 }*/
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
    background: url(../../assets/img/shujubeij@2x.png) repeat;
    margin-top: -.41rem;
    padding-bottom: .4rem;
    #warningChart{
        width: 90%;
        height: 4.08rem;
        margin: .4rem 5%;
        background: url(../../assets/img/tubiao@2x.png) no-repeat;
        background-size: 100% 100%;   
    }
}
</style>


