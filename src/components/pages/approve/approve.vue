<template>
    <div>
        <approveItem :listContent="listContent" :leftName="leftName" :listTitle="listTitle" :approves="approves"  @goApprovePages="goApprovePages"></approveItem>
    </div>
</template>
<script>
// 引入子组件
import  approveItem  from "../../common/approveItem";
export default {
    components:{
        approveItem
    },
    data(){
            return{
            title : "result",
            headerTitle : "待所领导审批",
            ID:[],
              leftName:[
                   "房间调整",//左侧的内容
                   "家人会见"
                ],
            listTitle : [
                "姓名：",
                "监室号:",
                "会见时间：",
            ],
            listContent:[      //页面显示的数据
                [
                    "张三四",
                    "2305",
                    "2018-01-18",
                ],
                 [
                    "carrie",
                    "2305",
                    "2018-01-18",
                ],
            ],
            approves:["审批"],//按钮文字
            listDetail :[], //实际的全部数据
            }
        },
        methods:{
            goApprovePages (index) { // index是子组件派发上来的
                    // alert(index)
                    // 点击审批进入所批的详情页面
                    this.$router.push({
                        name:"approveReult"
                    })
            },
        }
}
</script>

