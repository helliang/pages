/*
 * @Author: carrie
 * @Date: 2018-05-28 10:08:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-02 11:27:40
 */
<template>
    <div id="change">
      <!-- 头部模块的内容-->
      <ul class="title">
          <li class="l_sideBar"  v-for="(li,i) in list" :key="i">
             <span class="c_title">
                 <!-- 左边的title -->
                 {{leftName[i]}}
             </span>
             <!-- 右边对应的内容 -->
             <span class="c_name">{{li}}</span>
          </li>
      </ul>    
    </div>
</template>
<script>
export default {
  name: "change",
  props: [
    // 获取父组件头部模块的内容
    "list",
    // 左边title
    "leftName",
 
  ],
  data() {
    return {
    
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
#change {
  background-color: #fff;
  padding-bottom: .4rem;
  .title {
    width: 90%;
    margin: 0 auto ;
    color: rgb(102, 102, 102);
    font-size: 0.32rem;
    border-radius: 0.133333rem;
    border: 1px solid #999999;
    background-color: #F3F3F3;
    li {
      width: 100%;
      margin: 0 auto;
      display: flex;
      line-height: 1rem;
      font-size: .4rem;
      border-bottom: 1px solid #dcdcdc;
      .c_title {
        flex: 2;
        color: #333333;
        border-right: 1px solid #dcdcdc;
        padding-left: .4rem;
      }
      .c_name {
        flex: 5;       
        color: #666666;
        padding-left: .4rem;
      }
    }
    li:first-child{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px; 
    }
    li:last-child{
      border-bottom: none;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px; 
    }
  }
  .span {
    display: inline-block;
  }

}
</style>


