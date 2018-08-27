/*
 * @Author: pan
 * @Date: 2018-05-28 17:53:07 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-04 18:00:47
 */

<template>
    <div class="adjustList">
        <listItem :listContent="listContent" :listTitle="listTitle" :leftName="leftName"  @listenToChildEvent="goInfo"></listItem>
    </div>
</template>
<script>
// 引入vuex
import store from '../../store'
// 引入子组件 
import listItem from "../listItem"
export default {
    name:'adjust',
    components :{
        listItem 
    },
    mounted (){
        var self = this;
        // let RequestData = JSON.parse(localStorage.getItem('RequestData'))
        console.log(self.RequestData)
          // 页面生成前调用;
        self.RequestData.forEach((item) =>{
            console.log(item)
             this.ID.push(item.P_KEY);
            // console.log(item.NAME) 
            //  获取左边的name
            self.leftName.push(
              item.NAME //姓名
            );
            //     // return;
            //     // 把缓存下来的数据放入显示页面的数组中
                self.listContent.push([
                        item.SEX, // 性别
                        item.INDATE,// 入所时间
                        item.ROOM_NO,//监室号
                        item.CASECLASS// 涉嫌罪名
                ]);
        })
        // this.$http.get('/static/json/feHelper.json').then(response => {
        //     var value = eval("(" + response.data + ")");
        //     value["record"].forEach(function(item){ //在页面上展示的数据
        //         self.ID.push(item["P_KEY"]); 
        //         self.leftName.push(item.SYS_UNIT);
        //         self.listContent.push([
        //             item.SEX,
        //             item.INDATE,
        //             item.SYS_UNIT,
        //             item.CASECLASS
        //         ])
        //     })
        //     console.log(self.ID);
        // }, response => {
           
        // })
    },
    methods : {
       goInfo : function(index){
           console.log(this.ID[index]);
        //    return;
        //    this.$router.push("/adjustResult");
           this.$router.push({
                 // 切换页面
                 path: "/adjustResult",
                    query:{ // 在目标页面通过this.$route.query获取参数：
                    keyName: this.ID[index],// 唯一值
                    sysUnit:"440100113"// 广州市编号
                    }
            });
       }
    },
    data(){
        return{
            listTitle : ["性别：","入所时间：","房间号：","涉嫌罪名："],
            leftName :[],
            listContent : [],
            ID :[],//P_KEY值
            RequestData:JSON.parse(localStorage.getItem('RequestData'))
        }
    }
}
</script>
<style lang="less">
.adjustList{
    height: 100vh;
    background-color: #EBEBEB;
}
</style>


