/*
 * @Author: pan
 * @Date: 2018-05-22 14:26:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-09 14:19:10
 */
<template>
<div>
    <div id="listItem">
        <div class="listItem" v-for="(item, index) in listContent" :key="index" @click="goPage(index)">
            <div class="l_sideBar" >
                <span>
                    {{leftName[index]}}
                </span>
            </div>
            <div class="list">
                <div class="info" v-for="(li,i) in item" :key="li.i">
                    <div class="r_sideBar">
                        <div class="title">
                            <span class="titlName">
                                {{listTitle[i]}}
                            </span>
                            <span class="titleContent">
                                {{li}}
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
export default {
  name: "listItem",
  props: [
    // 获取父组件的bind对应的值
    "listContent",
    "listTitle",
    "leftName"
  ],
  methods: {
    goPage(index) {
      // 触发事件
      this.$emit("listenToChildEvent", index);
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.listItem{
    margin-bottom: 3*0.2*25.6/75rem;
    background: url(../assets/img/icon-fhsj@2x.png) 96% center  no-repeat;
    background-size: 0.266667rem 0.506667rem;
    background-color: #FFFFFF;
    background-color: #fff;
    display: flex;
}
.list {
//   margin-top: 0.4rem;
//   margin-top: 0.4rem;
  overflow: hidden;
  flex: 3;
}
.l_sideBar {
    flex: 1;
    border-right: 1px solid #ccc;
    color: #0076da;
    font-size: 0.373333rem;
    justify-content: center;
    align-items: center;
    display: flex;
    margin: .266667rem 0;
    margin-right: 3%;
    word-wrap:break-word;
     white-space:normal; 
     word-break:break-all; 
}
.r_sideBar {
  width: 100%;
  float: right;
}
.title {
        padding: 0.133333rem 0;
        line-height:.426667rem;
        position: relative;
  span {
    display: inline-block;
  }
  .titlName {
    width: 24%;
    color: rgb(119, 119, 119);
    font-size: 0.32rem;
  }
  .titleContent {
    width: 55%;
    // padding-left: .266667rem;
    color: rgb(51, 51, 5);
    font-size: 0.32rem;

    position: absolute;
    left: 50%; 
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
  }
}

</style>


