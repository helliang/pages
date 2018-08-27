/*
 * @Author: carrie
 * @Date: 2018-05-22 14:33:25 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-05 18:13:40
 */

<template>
  <div id="face">
    <!-- 环节变动页面 -->
    <ul class="main">
      <li>
        <span class="name">监室号:</span>
        <input placeholder="请选择" type="text"  readonly :value="rooms" @click="selectRoom" >
        <!-- 监室号的弹框 -->
        <transition name="fade">
          <div class="selectBox" v-if="selectList.length > 0">
            <p class="slect-title">
              <span class="select-rooms">请选择房间号</span>
              <span @click="colse">关闭</span>
            </p>
            <ul class="">
               <li v-for="(list,index) in selectList" @click.self="selectItem(list,index)" :key="index">{{list.title}}</li> 
            </ul>
          </div>
          <div v-else class="loding"  v-show="showLoding">
                <div   class="weui-loadmore ">
                    <i class="weui-loading"></i>
                    <span class="weui-loadmore__tips">正在加载</span>
                </div>
          </div>
        </transition>
        <span to="" class="a_link"><img src="../../../static/img/icon-fhhh@2x.png" alt="">
        </span>
      </li>
      <li>
        <span class="name">进入时间:</span>
        <input placeholder="请选择" type="text" data-toggle='date' id="my-input" readonly>
        <span to="" class="a_link"><img src="../../../static/img/icon-fhhh@2x.png" alt="">
        </span>
      </li>
      <li>
        <span class="name">进入人:</span>
        <input placeholder="请输入" type="text" class="date" v-model="name">
        <span to="" class="a_link"><img src="../../../static/img/icon-fhhh@2x.png" alt="">
        </span>
      </li>
    </ul>
    <button class="submit" @click="submit">提交</button>
  </div>
</template>
<script>
// 引入查询页的子组件
import store from "../../store";
export default {
    name: "face",
    data() {
        return {
            rooms:'', //监室号
            name: this.name,
            selectList: [], //弹框里的数据
            districts:[],
            showLoding:false,
        };
    },
    methods: {
        selectRoom() {//点击input获取监室号
            let self = this;
            // 设置loding
            self.showLoding = true;
            let params = {
                SYS_UNIT: "440100113",
                type: 1,
                LENGTH_CD_CODE: 2, //CD_CODE.length 监区2位数 ，监室4位数  例如：监区号：01 A监区，监室号：0101 A监区01号监室
                CD_CODE: undefined
            };
            // 请求成功返回参数
            this.$http.get("/apis", { params })
                .then(function(data) {
                    console.log(data)
                    if (data.data.status == 200) {
                        self.showLoding = false;
                        self.selectList = [];
                        var value = data.data.record;
                        value.forEach(function(item) {
                            self.selectList.push({
                                title: item.CD_CHINA,
                                value: item.CD_CODE
                            });
                        });
                    }else{
                        self.showLoding = true;
                    }
                })
                .catch(function(error) {
                    // 请求错误时
                    console.log(error);
                });
        },
        selectItem(list, index) {//弹框里li的元素
            let self = this;
            let params = {
                SYS_UNIT: "440100113",
                type: 1,
                LENGTH_CD_CODE: 4, //CD_CODE.length 监区2位数 ，监室4位数  例如：监区号：01 A监区，监室号：0101 A监区01号监室
                CD_CODE: list.value
            };
            // 请求成功返回参数
            this.$http.get("/apis", { params })
                .then(function(data) {
                    if (data.data.status == 200) {
                        var value = data.data.record;
                        if(list.value.length == 2){
                            self.selectList = [];
                            value.forEach(
                                function(item) {
                                    self.selectList.push({
                                        title: item.CD_CHINA,
                                        value: item.CD_CODE
                                    });
                                }
                            );
                        }else{
                            // 把对应点击的下标值传入input框里的rooms
                              self.rooms=self.selectList[index].title;
                              self.selectList =[]
                            }
                           
                    } else {
                        console.log("status != 200");
                            self.showLoding = true;
                        
                    } 
                })
                .catch(function(error) {
                    // 请求错误时
                    console.log(error);
                });
        },
        // 关闭弹框
        colse() {
          this.selectList =[]
        },
        // 提交事件
        submit() {
            console.log("-------提交结果----");
            var data = {
                room: $(".rooms").attr("data-values"), //房间号
                time: $("#my-input").val(),
                name: this.name
            };
            console.log(data);
        }
    },
    // 创建之前
    created() {
        $("#face").on("click", ".submit", function() {
            $.toast("提交成功", function() {
                console.log("close");
            });
        });
    },
    // dom加载完成之后
    mounted() {
        // this.goRooms();
        $("#my-input").calendar({
            // 日期格式
            dateFormat: "yyyy-mm-dd"
        });
    },
    // 监听一级弹框的变化
    watch:{
      "selectList":function(value,old){//让旧值清空 
      }
    }
};
</script>
<style lang="less" scoped>
#face {
    width: 100%;
    background-color: #fff;
    width: 100%;
    height: 100vh;
    .main {
        margin: 0 auto;
        li {
            height: 1.173333rem;
            line-height: 1.173333rem;
            padding: 0 5%;
            border-bottom: 1px solid #ccc;
            position: relative;
            input::placeholder {
                color: rgb(102, 102, 102);
                font-size: 0.426667rem;
                font-size: 0.426667rem;
            }
            input {
                width: 65%;
                height: 0.666667rem;
                font-size: 0.426667rem;

                color: #333333;
                font-family: Arial, Helvetica, sans-serif;
            }
        }
    }
    .name {
        color: #3a95e2;
        width: 20%;
        display: inline-block;
        font-size: 0.373333rem;
    }
    // 弹框
 
    .selectBox {
        width: 100%;
        height: 60vh;
        position: fixed;
        background-color: #fff;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 11100;
        .slect-title {
            width: 100%;
            height: 1.333333rem;
            line-height: 1.333333rem;
            display: flex;
            background-color: #0076da;
            color: #fff;
            font-size: 0.426667rem;
            padding: 0 5%;
            .select-rooms {
                text-align: center;
                flex: 1;
            }
            .colse {
                flex: 1;
            }
        }
        ul {
            width: 100%;
            height: 100%;
            overflow-y: scroll;

            background-color: #fff;
            li {
                width: 100%;
                text-align: center;
                font-size: 0.373333rem;
            }
        }
    }
    .a_link {
        width: 10%;
        float: right;
        height: 100%;
        img {
            // padding-top: .386667rem;
            float: right;
            width: 0.213333rem;
            height: 0.4rem;
            margin: 0.386667rem 0;
        }
    }
    .submit {
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
   
    //   加载图标
    .loding{
            margin-top: -.4rem;
            position: absolute;
            z-index: 100;
    }
    .weui-loadmore{
            width: 100%;
    margin: 2rem auto;
    line-height: 1.6em;
    font-size: .373333rem;
    color: #333333;
    text-align: center;
    position: fixed;
    }
    // 
   .fade-enter-active, .fade-leave-active {
        transition: all .5s;
      }
      .fade-enter,.fade-leave-to{
        bottom: -6.3rem;
      }
}
</style>


