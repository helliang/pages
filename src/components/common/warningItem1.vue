<template>
    <div id="warningItem">
        <div class="panel" v-for="(item,index) in list" :key="index">
            <div class="panelHead">
                <div class="headContent">
                    <span class="imgBox"><img :src="titleIcons[index]"></span>
                    {{item.listTitle}}
                </div>            
            </div>
            <p class="total" v-if="item.isShowTotal">
                <span class="totalTitle">总数</span>
                <span class="totalContent">{{counts[0][0].count}}</span>
            </p>
            <p v-else class="noTotal"></p>
            <!-- 上一部分 -->
            <ul class="panelData">
                <li v-for="(itemData,i) in item.data" :key="i">
                    <div class="icons">
                        <img :src="itemData.icons">
                    </div>
                    <div class="dataItem"  @click="listenToChildEvent(counts[index+1][i])">
                        <p class="dataTitle">{{counts[index+1][i].dataTitle}}</p>
                        <p class="dataContent">{{counts[index+1][i].count}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'warningItem',
    // list整个div的版块循环   titleIcons小图标
    props :["list","titleIcons","counts"],
    data(){
        return{
        }
    },
    mounted(){
    },
    methods: {
        // 点击图标右侧版块触发事件 ,index头部标题的具体内容,name总数下的头部内容 
        listenToChildEvent(index){
            this.$emit("listenToChildEvent", index);
        }
    },
}
</script>
<style lang="less" scoped>
.panel{
    width: 92%;
    margin: 0 auto;
    padding-bottom: 1.173333rem;
    background-color: rgb(245,245,247);
    border-radius: 10px;
    color: rgb(0,112,228);
    margin-bottom: .8rem;
    .panelHead{
        text-align: center;
        position: relative;
        font-size: 0.426667rem;
        line-height: 0.426667rem;
        padding: 0.586667rem 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: white;
        letter-spacing: 2px;
        .headContent{
            .imgBox{
                display: inline-block;
                width: 0.426667rem;           
                height: 0.426667rem;
                vertical-align: middle;
                margin-right: 0.266667rem;
            }
            .imgBox:nth-child(1){
                width: .4rem;
                height: 0.426667rem;
            }
        }    
    }
    .total{
        line-height: 1.173333rem;
        overflow: hidden;
        .totalTitle{
            float: left;
            font-size: 0.4rem;
            margin-left: .4rem;
            color: rgb(51,51,51);
        }
        .totalContent{
            float: right;
            font-size: 0.5rem;
            margin-right: .4rem;
            color: rgb(0,112,228);
        }
    }
    .noTotal{
        height: .4rem;
        width: 100%;
    }
    .panelData{
        width: 100%;
        overflow: hidden;
        li{
            width:calc(50% - 5px);
            background-color: white;
            float: left;
            margin-bottom: 0.1333rem;
            height: 1.893333rem;
            position: relative;         
            .icons{
                position: absolute;                 
                width: 1.066667rem;
                height: 1.066667rem; 
                top: 0.413333rem;
                left: 0.4rem;
            }
            .dataItem{
                margin-left: 1.86667rem;
                padding: 0.15rem 0;
                text-align: center;
                touch-action: none;
                .dataTitle{
                    font-size: 0.373333rem;
                    line-height: 0.773333rem;
                    color: rgb(153,153,153);
                }
                .dataContent{
                    font-size: 0.506667rem;
                    line-height: 0.906667rem;
                }
            }
        }
        li:nth-child(odd){
            margin-right: 10px;
        }
        li::before{
            content: "";
            display: block;
            width: 0.026667rem;
            height: .533334rem;
            background-color: rgb(237,237,237);
            position: absolute;
            top: 50%;
            left: 1.866667rem;
            margin-top: -.266667rem;
        }
    }
}
img{
   width: 100%;
   height: 100%;
}
</style>