/*
 * @Author: pan
 * @Date: 2018-06-07 11:45:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-04 21:20:34
 */
<template>
  <div id="dutyCheck">
    <ul class="list">
      <li>
        <span class="title">房间号</span>
        <input class="type" type="text" id="rooms" :value="room" readonly="readonly" placeholder="请选择" @click="selectRoom">
        <!-- 房间号的弹框 -->
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
          <div v-else class="loding" v-show="showLoding">
            <div class="weui-loadmore ">
              <i class="weui-loading"></i>
              <span class="weui-loadmore__tips">正在加载</span>
            </div>
          </div>
        </transition>
      </li>
      <li>
        <span class="title">开始巡视</span>
        <div class="switchBox">
          <span class="time" v-if="isShowStart">{{startTime}}</span>
          <div class="switch" @click="switchStart">
            <span class="control on" v-if="isStartControlShow"></span>
            <span class="control off" v-else></span>
          </div>
        </div>
      </li>
      <li>
        <span class="title">结束巡视</span>
        <div class="switchBox">
          <span class="time" v-if="isShowEnd">{{endTime}}</span>
          <div class="switch" @click="switchEnd">
            <span class="control on" v-if="isEndControlShow"></span>
            <span class="control off" v-else></span>
          </div>
        </div>
      </li>
    </ul>
    <button class="submit">提交</button>
  </div>
</template>
<script>
export default {
    name: "dutyCheck",
    data() {
        return {
            isShowStart: false, //是否显示开始时间
            isStartControlShow: false, //切换开始按钮状态
            startTime: "", //开始时间
            isShowEnd: false, //是否显示结束时间
            isEndControlShow: false, //切换结束按钮状态
            endTime: "", //结束时间
            room: [], //房间号
            selectList: [], //弹框里的数据
            showLoding: false
        };
    },
    methods: {
        switchStart() {
            //切换开始按钮的状态
            if (this.isStartControlShow == false) {
                this.isShowStart = true;
                this.startTime = this.getTime(); //记录时间
            }
            this.isStartControlShow = !this.isStartControlShow;
        },
        switchEnd() {
            //切换结束按钮的状态
            if (this.isEndControlShow == false) {
                this.isShowEnd = true;
                this.endTime = this.getTime();
            }
            this.isEndControlShow = !this.isEndControlShow;
        },
        getTime() {
            let period = "";
            let date = new Date();
            let hour = date.getHours();
            let min = date.getMinutes();
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            if (hour < 12) {
                period = "上午";
            } else if (hour < 2) {
                period = "中午";
            } else {
                period = "下午";
            }
            return period + " " + hour + ":" + min;
        },
        selectRoom() {
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
            this.$http
                .get("/apis", { params })
                .then(function(data) {
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
                    } else {
                        self.showLoding = true;
                    }
                })
                .catch(function(error) {
                    // 请求错误时
                    console.log(error);
                });
        },
        selectItem(list, index) {
            //弹框里li的元素
            let self = this;
            let params = {
                SYS_UNIT: "440100113",
                type: 1,
                LENGTH_CD_CODE: 4, //CD_CODE.length 监区2位数 ，监室4位数  例如：监区号：01 A监区，监室号：0101 A监区01号监室
                CD_CODE: list.value
            };
            // 请求成功返回参数
            this.$http
                .get("/apis", { params })
                .then(function(data) {
                    if (data.data.status == 200) {
                        var value = data.data.record;
                        if (list.value.length == 2) {
                            self.selectList = [];
                            value.forEach(function(item) {
                                self.selectList.push({
                                    title: item.CD_CHINA,
                                    value: item.CD_CODE
                                });
                            });
                        } else {
                            // 把对应点击的下标值传入input框里的rooms
                            self.room = self.selectList[index].title;
                            self.selectList = [];
                        }
                    } else {
                        console.log("status != 200");
                    }
                })
                .catch(function(error) {
                    // 请求错误时
                    console.log(error);
                });
        },
        // 关闭弹框
        colse() {
            this.selectList = [];
        }
    },
    created() {}
};
</script>
<style lang="less" scoped>
#dutyCheck {
    .list {
        width: 100%;
        background-color: #fff;
        margin-top: 0.4rem;
        li {
            padding: 0 5%;
            width: 100%;
            overflow: hidden;
            border-bottom: 1px solid #ebebeb;
            .title {
                float: left;
                display: block;
                width: 25%;
                font-size: 0.373333rem;
                text-indent: 0.693333rem;
                line-height: 1.2rem;
            }
            .type {
                float: left;
                line-height: 1.2rem;
                padding-left: 0.266667rem;
                width: 75%;
                font-size: 0.426667rem;
            }
            .switchBox {
                float: right;
                height: 0.826667rem;
                line-height: 0.826667rem;
                overflow: hidden;
                margin: 0.1866665rem 0;
                .time {
                    float: left;
                    font-size: 0.426667rem;
                    margin-right: 0.266667rem;
                    color: #5c5c5c;
                }
                .switch {
                    width: 1.36rem;
                    height: 0.826667rem;
                    background: url(../../assets/img/yuanjiaojux679@2x.png);
                    background-size: 100% 100%;
                    float: left;
                    position: relative;
                    .control {
                        width: 0.6rem;
                        height: 0.6rem;
                        border-radius: 0.6rem;
                        position: absolute;
                        top: 0.12rem;
                    }
                    .off {
                        background-color: #999999;
                        box-shadow: 0px 0px 10px #666666;
                        left: 0.1rem;
                    }
                    .on {
                        background-color: #0076da;
                        box-shadow: 0px 0px 10px #008cda;
                        right: 0.1rem;
                    }
                }
            }
        }
        li:nth-child(1) {
            .title {
                background: url(../../assets/img/fangjianhao@2x.png) left center
                    no-repeat;
                background-size: 0.426667rem 0.426667rem;
            }
            .type {
                background: url(../../assets/img/icon-fhsj@2x.png) right center
                    no-repeat;
                background-size: 0.266667rem 0.506667rem;
            }
        }
        li:nth-child(2) {
            .title {
                background: url(../../assets/img/kaisheluying@2x.png) left
                    center no-repeat;
                background-size: 0.426667rem 0.426667rem;
            }
        }
        li:nth-child(3) {
            .title {
                background: url(../../assets/img/jieshutanhua@2x.png) left
                    center no-repeat;
                background-size: 0.426667rem 0.426667rem;
            }
        }
        .startRecord {
            display: block;
            opacity: 0;
            width: 0.826667rem;
            height: 0.826667rem;
            float: left;
            margin-left: 0.7rem;
            background: url(../../assets/img/zanting@2x.png);
            background-size: 100% 100%;
        }
    }
    .submit {
        width: 90%;
        display: block;
        margin: 0 auto;
        padding: 0.386667rem 0;
        font-size: 0.453333rem;
        background-color: #0076da;
        color: #fff;
        text-align: center;
        outline: none;
        border: 0;
        border-radius: 0.133333rem;
        margin-top: 1.173333rem;
        margin-bottom: 0.4rem;
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
        z-index: 1110;
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
                height: 1.173333rem;
                line-height: 1.173333rem;
                text-align: center;
                font-size: 0.373333rem;
                padding: 0 5%;
                border-bottom: 1px solid #ccc;
                position: relative;
            }
        }
    }
    //
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
        bottom: -6.3rem;
    }
}
</style>


