/*
 * @Author:carrie
 * @Date: 2018-05-25 14:59:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-06 11:35:49
 */

<template>
    <div id="modifyResult">
        <!-- 变动搜索结果 -->
        <div class="publish">
            <listItem :listContent="listContent" :listTitle="listTitle" :leftName="leftName"  @listenToChildEvent="goInfo">
            </listItem>
        </div>
    </div>
</template>
<script>
// 引入vuex
import store from '../../store'
// 引入子组件 
import listItem from "../listItem"
export default {
    name:'modifyResult',
    // 注册子子组件
    components:{
    listItem
    },
    data(){
        return{
            title : "result",
           headerTitle:'环节变动' ,
           ID:[],
        //    左边一块name
        leftName:[
            //    "carrie" ,//左侧的内容
            //    "carrie1",
        ],
           listTitle:[
               '性别:',
               "入所时间:",
               "房间号:",
               "涉嫌罪名:"

           ],
           listContent:[//对应右边的内容
                // [
                //     "男",
                //     "2018-01-18",
                //     "5023",
                //     "打架"
                // ],
                // [
                //      "男",
                //     "2018-01-18",
                //     "5023",
                //     "吸毒"
                // ]
           ],
        //    获取请求页面指定data.data.record本地存储的值,
        RequestData:JSON.parse(localStorage.getItem('RequestData'))
        }
    },
    methods:{
        // 点击事件
        goInfo(index){
            // 获取P_KEY值带入查人员
            // console.log( this.ID[index]);
             this.$router.push({
                 // 切换页面
                 path: "/modifyChange",
                    query:{ // 在目标页面通过this.$route.query获取参数：
                    keyName: this.ID[index],// 唯一值
                    sysUnit:"440100113"// 广州第三看守所编号
                    }
            });
        }
    },
    mounted(){
        // 查看返回来的参数
        // console.log(this.RequestData)
        // 页面生成前调用;
        this.RequestData.forEach((item) =>{
             this.ID.push(item.P_KEY);
            // console.log(item.NAME) 
            //  获取左边的name
            this.leftName.push(
              item.NAME //姓名
            );
                // return;
                // 把缓存下来的数据放入显示页面的数组中
                this.listContent.push([
                        item.SEX, // 性别
                        item.INDATE,// 入所时间
                        item.ROOM_NO,//监室号
                        item.CASECLASS// 涉嫌罪名
                ]);
        })
    }
}
</script>
<style lang="less" <style lang="less" scoped>
    #modifyResult{
        margin-top: .4rem;
    .title{
        line-height:0;
    }
    }

</style>

