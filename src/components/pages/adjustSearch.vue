
/*
 * @Author: pan
 * @Date: 2018-05-28 17:53:07 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-06-08 14:12:28
 */
<template>
    <div class="adjustSearch">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">姓名:</label>
                </div>
                <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入" v-model="name">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">房间号:</label>
                </div>
                <div class="weui-cell__bd">
                  <input class="weui-input rooms" type="text" value="" v-model="rooms.CD_CHINA" readonly  placeholder="请选择">
                </div>
            </div>
            <div class="weui-cell">
                 <div class="weui-cell__hd">
                    <label class="weui-label">入所时间:</label>
                </div>
                  <input class="weui-input" type="text" value="" placeholder="请选择" id="datetime-picker" data-toggle='date'>
            </div>
            <div class="weui-btn-area">
              <a class="weui-btn weui-btn_primary" href="javascript:" id="showTooltips" @click="goAdjustList">搜索</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'adjustSearch',
    methods : {
        goAdjustList(){
            let self = this;
            // 获取input时间
            var inTime = $("#datetime-picker").val();
            // 请求数据 
            let url ="/apis/jdbg/fjtzCon/getYdjw";
            let params  ={
                curPage: "1", //当前页  必填 (第二次调用填-1)
                rowperpage: "6", //每页记录数  必填 (第二次调用填-1)
                name:self.name,//姓名
                room:self.room,//房间号
                indate:inTime,//入所时间
                type:"0",//查人员
                tableZd:"P_KEY,ROOM_NO,T_STATUS,NAME,ID,OUTDATE,SYS_UNIT,BIRTHDAY,SEX,NATION,RESIDADDR,ADDRESSALL,ADDRESS,INDATE,ENDDATE,SENDER,CASECLASS,NATIVE_PLACE",
            };
            // alert(1)
            this.$http.get(url,{params}).then(function(params){
                console.log(params)
            // 请求成功后保存当前的数据带入modifyResrlt页面 将data.data.record存储到RequestData字段,对象转字符串
            localStorage.setItem("RequestData",JSON.stringify(params.data.record));
                 //   追加路径
            window.location.href="/adjustList";
            })
             .catch(function(error){
            // 请求错误时
            console.log(error)

          })
        },
        goRooms(){//获取房间号
       let self = this;
        let unit = "440100113";
         let url = "/apis/jdbg/fjtzCon/getYdjw";
        let params = {
          cupage: "-1", //当前页  必填 (查所有值调用填-1)
          rowperpage: "-1", //每页记录数  必填 (查所有值调用填-1)
          tableZd:"CD_CODE,CD_CHINA",//请求哪一列的数据 
          table:"c_room",
          sysUnit:"440100113",
          type:2
          };
          // 请求成功返回参数
          this.$http.get(url, { params })
            .then(function(data) {
              // console.log("---------------请求接口成功后返回的参数-------------------------------  ")
              console.log(data)
              var value = data.data.record;
              value.forEach(function(item) {
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
    }
      
    },
    mounted(){
        // 调用房间方法
        this.goRooms();
        $("#datetime-picker").calendar({
            dateFormat:'yyyy-mm-dd'
        });
    },
    data(){
        return{
            rooms:[],
             name:'',//姓名
        }
    }
}
</script>
<style lang="less" scoped>
.adjustSearch{
    height: 100vh;
    background-color: #FFFFFF;
    .weui-cells{
        margin-top: 0;
        padding: 0;
        font-size: 0.373333rem;
        color: rgb(0,118,218);
        line-height: 0.666667rem;
        .weui-cell{
            padding: 0.226667rem 0.4rem;
            border-bottom: 0.026667rem solid rgb(237,237,237);
           
            .weui-label{
                width: 1.733333rem;
            }
            .weui-cell:before{
                height: 0;
            }
            input{
                font-size: 0.426667rem;
                height: 0.666667rem;
                line-height: 0.666667rem;
                color: rgb(0,0,0);
            }
            select{
                padding: 0;
            }
        }  
        .weui-cell:nth-child(2),.weui-cell:nth-child(3){
            background:url('/static/img/icon-fhhh@2x.png')no-repeat;
            background-size: .213333rem .4rem;
            background-position: 95% 50%;
        }
    }
    .weui-btn-area{
        margin: 1.066667rem .4rem 0;
        .weui-btn{
            background-color: #0076da;
            line-height: 1.2rem;
            font-size: 0.453333rem;
        }
        .weui-btn:active{
            background-color: #539FE0;
        }
    }
    .weui-cell__hd{
        width: 22%;

    }
    .weui-cell__bd,.weui-input{
        width: 70%;
        padding-left: 0;

    }
  
}
</style>


