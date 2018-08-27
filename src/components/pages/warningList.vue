<template>
    <div class="warningList">
        <!-- 显示结果 -->
        <div class="publish">
            <listItem :listContent="listContent" :leftName="leftName" :listTitle="listTitle"  @listenToChildEvent="goInfo">
            </listItem>
        </div>
    </div>
</template>
<script>
import listItem from "../listItem"
export default {
    name:'warningList',
    mounted(){
        this.init();
    },
    components : {
        listItem
    },
    methods : {
        init () {
              var self = this;
            self.coffeeType.forEach((item) => {
                // console.log(item)
                this.ID.push(item.P_KEY);
                self.leftName.push(item.NAME);//名字
                // console.log(item.NAME)
                self.listContent.push([
                    item.SEX, //缺少性别
                    item.INDATE,        
                    item.ROOM_NO, 
                    item.CASECLASS, //涉嫌罪名
                ]);
            });
        },
        goInfo (index) { 
            this.$router.push({
                path: "/warningInfo",
                query:{ 
                   keyName: this.ID[index],
                   sysUnit:"440100113"
                }
            });
       }
    },
    data(){
        return{
            title : "result",
            ID:[],
            leftName:[],
            listTitle : [
                "性别：",
                "入所时间：",
                "房间号：",
                "涉嫌罪名：",
            ],
            listContent:[
            ],
            listDetail :[], 
            coffeeType: JSON.parse(localStorage.getItem("coffeeType"))
        }
    }
}
</script>
<style lang="less" scoped>
.warningList{
    margin-top: .4rem;
}
</style>