<template>
    <div id="approve">
        <div class="listItem" v-for="(item, index) in listContent" :key="index"  @click="approvePages(index)">
            <div class="l_sideBar">
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
            <div class="btn-approve" v-for="(approve,index) in approves" :key="index">
              <button type="button" class="approve" >{{approve}}</button>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'approveItem',
    props: [
      // 获取父组件的bind对应的值
      'listContent',
      'listTitle',
      'leftName',
      "approves"
    ],
    data() {
      return {
        // approves:["审批","不批"]
      }
    },
    methods:{
    approvePages(index){
      // 触发父组件点击事件
      this.$emit("goApprovePages",index)

  }

    }
  }
</script>
<style lang="less" scoped>
  .listItem {
    margin-bottom: 3 * 0.2 * 25.6/75rem;
    background-size: 0.266667rem 0.506667rem;
    background-color: #fff;
    display: flex;
  }
  .list {
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
    margin: 0.266667rem 0;
    margin-right: 3%;
  }
  .r_sideBar {
    width: 100%;
    float: right;
  }
  .title {
    display: flex;
    padding: 0.133333rem 0;
    line-height: 0.426667rem;
    span {
      display: inline-block;
    }
    .titlName {
      flex: 1;
      color: rgb(119, 119, 119);
      font-size: 0.32rem;
    }
    .titleContent {
      flex:2;
      color: rgb(51, 51, 5);
      font-size: 0.32rem;
    }
  }
  .btn-approve{
    
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: .4rem;
  }
  .approve{
    width: 1.626667rem;
    height: .88rem;
    border-radius: .133333rem;
    font-size: .293333rem;
    background-color: #0076DA;
    color: white;
    border: none;
    outline: none;
  }
</style>
