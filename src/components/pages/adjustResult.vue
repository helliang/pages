/*
 * @Author: pan
 * @Date: 2018-05-28 17:53:07 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-06 09:52:40
 */
<template>
  <div class="adjustResult">
    <choosePerson :rooms="rooms" :names="names" :district="district" @listenToChildEvent="chooseName"></choosePerson>
    <commonChange :list="list" :leftName="leftName"></commonChange>
    <!-- 列表选择部分 -->
    <ul class="select">
      <li>
        <span class="s_title">调整理由:</span>
        <!-- <input type="text" v-model="datas.title" class="s_name info0"  placeholder="请选择" readonly> -->
        <input type="text"  class="s_name info0"  placeholder="请选择" readonly>
      </li>
      <li>
        <span class="s_title">调整房间号:</span>
        <input type="text" :value="room" class="s_name info1" placeholder="请选择" readonly @click="selectRoom">
        <!-- 调整房间号弹框 -->
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
    </ul>
    <button class="submit">提交</button>
  </div>
</template>
<script>
import commonChange from "../common/commonChange";
import choosePerson from "../common/choosePerson";
import { strToJson, setList } from "../../common";
// console.log(strToJson())
export default {
    name: "adjustResult",
    components: {
        commonChange,
        choosePerson
    },
    data() {
        return {
            title: "adjustResult",
            rooms: [], //传给子组件的房间列表
            district: [], //!!!新增属性，传给子组件的监所列表
            list: ["", "", "", "", "", ""],
            leftName: [
                "姓名",
                "性别",
                "入所时间",
                "涉嫌罪名",
                "房间号",
                "户籍所在地"
            ],
            datas:[], //调整理由数据
            selectList: [], //弹框里的数据
            room: [], //调整房间号
            names: [], //传给子组件的人员列表
            listval: [],
            showLoding: false
        };
    },
    methods: {
        goData() {
            // 请求调整理由
            let self = this;
            let params = {
                type: 12
            };
            // 请求成功返回参数
            this.$http
                .get("/apis", { params })
                .then(function(data) {
                    if (data.data.status == 200) {
                        var value = data.data.record;
                        value.forEach(function(item) {
                            self.datas.push({
                                title: item.CD_CHINA,
                                value: item.CD_CODE
                            });
                        });
                    }
                    // 点击获取接口
                    $(".info0").select({
                        title: "选择理由",
                        items: self.datas
                    });
                })
                .catch(function(error) {
                    // 请求错误时
                    console.log(error);
                });
        },
        selectRoom() { //房间调整
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
        },

        //选完人名触发的事件
        chooseName(type, value) {
            if (type == 1) {
                //this.dataKey = value.
                console.log(value);
                this.list = setList(value, this.listval);
            } else if (type == 2) {
                this.goRooms(value);
            } else if (type == 3) {
                this.goNames(value);
            }
        },
        addRooms(value) {
            //新增函数，提取出监区的数据
            let self = this;
            self.rooms = [];
            let unit = "440100113";
            let params = {
                //监区
                SYS_UNIT: "440100113",
                type: 1,
                LENGTH_CD_CODE: 2, //CD_CODE.length 监区2位数 ，监室4位数  例如：监区号：01 A监区，监室号：0101 A监区01号监室
                CD_CODE: value,
                currentPage: -1, //当前页,
                pageSize: -1 //页显示数据量
            };

            //提取监区的数据
            self.$http.get("/apis", { params }).then(res => {
                if (res.data.status == 200) {
                    // console.log(res)
                    let data = res.data;
                    data.record.forEach((item, i) => {
                        self.district.push(item);
                    });
                } else {
                    console.log("请求不成功")
                }
            });
        },
        goRooms(value) {//请求监区里的房间号;
            var self = this;
            let params = {
                //房间号
                SYS_UNIT: "440100113",
                type: 1,
                LENGTH_CD_CODE: 4, //CD_CODE.length 监区2位数 ，监室4位数  例如：监区号：01 A监区，监室号：0101 A监区01号监室
                CD_CODE: value,
                currentPage: -1, //当前页,
                pageSize: -1 //页显示数据量
            };
            self.$http.get("/apis", { params }).then(res => {
                if (res.data.status == 200) {
                    // console.log(res)
                    let data = res.data;
                    self.rooms = [];
                    data.record.forEach((item, i) => {
                        self.rooms.push(item);
                    });
                }else{
                    console.log('请求数据失败')
                }
            });
        },
        // 获取名字
        goNames(value) {
            var self = this;
            let params = {
                //人员信息
                SYS_UNIT: "440100113",
                type: 11,
                changeCode: true, //是否把code代码翻译
                currentPage: 1, //当前页,
                pageSize: 10, //页显示数据量
                ROOM_NO: value,
                currentPage: -1, //当前页,
                pageSize: -1 //页显示数据量
            };
            // http://192.168.1.16:8030/jdbg/fjtzCon/getYdjw
            self.$http.get("/apis", { params }).then(res => {
                // console.log(res)
                this.listval = strToJson(res.data.column);
                this.leftName = strToJson(res.data.columnname);
                if (res.data.status == 200) {
                    let data = res.data;
                    data.record.forEach((item, i) => {
                        self.names.push(item);
                    });
                }
            });
        }
    },
    // 组件挂载后执行
    mounted() {
        var self = this;
        this.addRooms();
        //  调用调整理由接口
        self.goData();
        $(document).on("click", ".submit", function() {
            $.toast("提交成功", function() {
                console.log($(".info0").data("values"));
                console.log($(".info0").val());
                console.log($(".info1").val());
            });
        });
    }
};
</script>
<style lang="less" scoped>
.adjustResult {
    height: 100vh;
    background-color: #ebebeb;
    margin-top: -0.4rem;
    .toolbar .toolbar-inner {
        height: 1.3333rem;
    }
}
.weui-btn-area {
    margin: 1.066667rem 0.4rem 0;
    .weui-btn {
        background-color: #0076da;
        line-height: 1.2rem;
        font-size: 0.453333rem;
    }
    .weui-btn:active {
        background-color: #539fe0;
    }
}
/* // 列表调整部分 */
.select {
    background-color: #fff;
    width: 100%;
    margin-top: 0.4rem;
       }
    .select>li {
        width: 90%;
        margin: 0 auto;
        border-bottom: 1px solid rgb(237, 237, 237);
        height: 1.146667rem;
        background: url("/static/img/icon-fhhh@2x.png") no-repeat;
        background-size: 0.213333rem 0.4rem;
        background-position: right;
        overflow: hidden;
        .s_title {
            width: 30%;
            float: left;
            color: rgb(0, 118, 218);
            font-size: 0.373333rem;
            margin-right: 3%;
            line-height: 1.146667rem;
        }
        .s_name {
            width: 60%;
            height: 1.146667rem;
            color: rgb(51, 51, 51);
            font-size: 0.426667rem;
            float: left;
        }
}
// 房间调整弹框
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
//   加载图标
.loding {
    margin-top: -0.4rem;
    position: absolute;
    top: 50%;
    z-index: 100;
}
.weui-loadmore {
    width: 100%;
    margin: 2rem auto;
    line-height: 1.6em;
    font-size: 0.373333rem;
    color: #333333;
    text-align: center;
    position: fixed;
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
</style>


