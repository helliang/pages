/*
 * @Author: carrie
 * @Date: 2018-05-22 14:33:25 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-08 11:37:59
 */

<template>
    <div id="modifySearch">
        <!-- 环节变动页面 -->
        <ul class="main">
            <li>
                <span class="name">姓名:</span>
              <input placeholder="请输入"  type="text" v-model="name">
            </li>
            <li>
               <span class="name">房间号:</span>
                 <input placeholder="5023" class="rooms" type="text" v-model="rooms.CD_CHINA" readonly><router-link  to="" class="a_link"><img src="../../../static/img/icon-fhhh@2x.png" alt=""></router-link> 
            </li>
            <li>
               <span class="name">入所时间:</span>
                <input placeholder="请选择"  type="text"  id='datetime'  data-toggle='date' ><img src="../../../static/img/icon-fhhh@2x.png" alt="" class="arrow">
            </li>
        </ul>
        <button class="search" @click="modifySearch">搜索</button>
    </div>
</template>
<script>
// 引入查询页的子组件
import store from "../../store";
export default {
  name: "modifySearch",
  data() {
    return {
      name:'',//姓名
      rooms:[],//房间
      // time:''//时间
    };
  },
  methods:{
     goRooms(){//获取房间号
       let self = this;
        let unit = "440100113";
         let url = "/apis/jdbg/fjtzCon/getYdjw";
        let params = {
          cupage: "-1", //当前页  必填 (查所有值调用填-1)
          rowperpage: "-1", //每页记录数  必填 (查所有值调用填-1)
          tableZd:"CD_CODE,CD_CHINA",//请求哪一列的数据 
          table:"c_room",
          sysUnit:"440100113"
          };
          // 请求成功返回参数
          this.$http.get(url, { params })
            .then(function(data) {
              console.log(data)
              // console.log("---------------请求接口成功后返回的参数-------------------------------  ")
              var value = data.data.record;
              // console.log(value)
              value.forEach(function(item) {
                // console.log(item)
                self.rooms.push(
                  {
                    title:item.CD_CHINA,  
                    value:item.CD_CODE,
                  }
                );
              }
              );
              // 点击获取接口
            $(".rooms").select({
              title: "选择理由",
              items:self.rooms,
              })
          })
           .catch(function(error) {
            // 请求错误时
            console.log(error);
          });
    },
    modifySearch:function(){
      // 点击搜索请求页面数据
          let selft = this;
          // 获取input dateTime
          let time = $('#datetime').val();
          let rooms = $('.rooms').val();
          // console.log(time);
          // return;
          // 请求路径
           let url = "/apis/jdbg/fjtzCon/getYdjw";
          
          //  需要请求的参数
          let params = {
            curPage: "1", //当前页  必填 (第二次调用填-1)
            rowperpage: "50", //每页记录数  必填 (第二次调用填-1)
            name:this.name,//姓名
            roomNo:rooms,//--监室号
            indate:time,//入所时间
            type:"0",//查人员
            sysUnit:"440100113",
            tableZd:"P_KEY,ROOM_NO,T_STATUS,NAME,ID,OUTDATE,SYS_UNIT,BIRTHDAY,SEX,NATION,RESIDADDR,ADDRESSALL,ADDRESS,INDATE,ENDDATE,SENDER,CASECLASS,NATIVE_PLACE",
          };
          console.log(params)
          // console.log(params.roomNo)
          // return;
          // 请求成功执行回调函数
          this.$http.get(url,{params}).then(function(data){
            // console.log(data)
            // return;
            // 请求成功后保存当前的数据带入modifyResrlt页面
            // 将data.data.record存储到RequestData字段,对象转字符串
            localStorage.setItem("RequestData",JSON.stringify(data.data.record));
           
          //   追加路径
            window.location.href="/modifyResult";
          })
          .catch(function(error){
            // 请求错误时
            console.log(error)

          })
      }
  },
  mounted(){
    $("#datetime").calendar({
          // 日期格式
          dateFormat:'yyyy-mm-dd',
        });
         // 调用房间方法
        this.goRooms();
  }
};
</script>
<style lang="less" scoped>
#modifySearch {
  width: 100%;
  margin-top: 1.066667rem;
  background-color: #fff;
     height: 100vh;
  .main {
    margin: 0 auto;
    li {
      height: 1.173333rem;
      line-height: 1.173333rem;
      overflow: hidden;
      padding: 0 5%;
      border-bottom: 1px solid #ccc;
      position: relative;
      input::placeholder {
        color: rgb(102, 102, 102);
        font-size: 0.426667rem;
        font-size: .426667rem;
      }
      input {
        width: 70%;
        height:1.066667rem;
        font-size: .426667rem;
        
        color: #333333;
        font-family: Arial, Helvetica, sans-serif;
      }
      .arrow{
        width: .213333rem;
        height: .4rem;
        float: right;
        margin-top: .386667rem;

      }
    }
  }
  .name {
    color: #3a95e2;
    width: 20%;
    display: inline-block;
    font-size: 0.373333rem;
  }
  .a_link {
    width: 10%;
    float: right;
    height: 100%;
    img{
        width: .213333rem;
        height: .4rem;
        margin-top: .386667rem;
            float: right;
    }
  }
  .search {
    color: #fff;
    height: 1.2rem;
    line-height: 1.2rem;
    outline: none;
    border: none;
    border-radius: 0.133333rem;
    display: block;
    background-color: #0076da;
    width: 90%;
    margin: 0 auto;
    margin-top: 1.173333rem;
    text-align: center;
    font-size: 0.453333rem;
  }
}
</style>


