<template>
    <div class="modifyChange">
        <form  @submit.prevent="submit">
          <!-- 房间号选择 -->
            <choosePerson :rooms="rooms" :names="names" :district="district" @listenToChildEvent="chooseName"></choosePerson>
              <!-- 表单数据渲染 -->
            <commonChange :list="list" :leftName="leftName"></commonChange>
            <!-- 列表选择部分 -->
            <ul class="select">
                <li class="">
                    <label>
                        <span>办案环节: </span>
                        <input type="text" class="case"   placeholder="请选择" readonly>
                    </label>
                </li> 
                  <!-- 点击时出现弹框 v-model="selects.units"-->
                <li @click="showUnit">
                    <label>
                        <span>现办案单位: </span>
                        <input type="text" class="units"  v-model="units" placeholder="请选择" readonly>
                    </label>
                </li>
                <li class="">
                    <label>
                        <span>现办案单位类型:</span>
                        <input type="text" class="unitType"  placeholder="请选择" readonly>
                    </label>
                </li>
                <li class="">
                    <label>
                        <span>变动时间:</span>
                        <input type="text" class="time" data-toggle='date'  placeholder="请选择" readonly>
                    </label>
                </li>
                <li class="">
                    <label>
                        <span>经办人:</span>
                        <input type="text" class="HandledBy" v-model="HandledBy" placeholder="请输入">
                    </label>
                </li>
                <li class="">
                    <label>
                        <span>关押期限:</span>
                        <input type="text" class="endDatEnd"  data-toggle='date'  placeholder="请选择" readonly>
                    </label>
                </li>
                <li class="">
                    <label>
                        <span>法律文书:</span>
                        <input type="text" class="textNo" v-model="textNo" placeholder="请输入">
                    </label>
                </li>
            </ul>
            <!--现办案单位的弹框 -->
            <div class="model" v-if="show">
                  <header>
                      <span class="arrow" @click="goPre">返回</span>请选择<span class="close" @click="close">X</span>
                    </header>
                    <ul >
                        <li v-for="(province,index) in provinces" :key="index" @click="goCity($event,index)">{{province.content}}</li>
                    </ul>
                    <div class="model" v-if="showCity">
                        <header><span class="arrow" @click="goPreProvince">返回</span>请选择<span class="close" @click="close">Xx</span></header>
                        <ul >
                            <li v-for="(city,index) in citys" :key="index" @click="goDistrict($event,index)">{{city.content}}</li>
                        </ul>
                    </div>
                    <div class="model" v-if="showDistrict">
                        <header><span class="arrow" @click="goPreCity">返回</span>请选择<span class="close" @click="close">Xxx</span></header>
                        <ul >
                            <li v-for="(district,index) in districts" :key="index" @click="goResult($event,index)">{{district.content}}</li>
                        </ul>
                    </div>
              </div>
          <input type="submit" class="submit" value="提交">
        </form>
    </div>
</template>

<script>
// 引入子组件
import commonChange from "../common/commonChange";
import choosePerson from "../common/choosePerson";
import { strToJson, setList } from "../../common";
export default {
  name: "modifyChange",
  // 注册子组件
  components: {
    commonChange,
    // 引入房间选择子组件 
    choosePerson
  },
  data() {
    return {
      // 房间模块
      rooms : [],//传给子组件的房间列表
      names : [],
      district : [],//!!!新增属性，传给子组件的监所列表     
      // 头部模块的内容
      leftName: [
        "姓名",
        "性别",
        "入所时间",
        "涉嫌罪名",
        "房间号",
        "户籍所在地",
      ],
      list: [
          "",
          "",
          "",
          "",
          "",
          ""
      ],
      PKey: "", //页面唯一的值
      case: [], //办案环节
      units: '', //现办案单位
      unitsCode: "", //现办案单位code
      unitType: [], //现办案单位类型
      unitTypeCode: "", //现办案单位类型code
      HandledBy: this.HandledBy, //经办人
      textNo: this.textNo, //法律文书
      commonparams: {
        //现办单位公共参数
        // cupage: "-1", //当前页  必填 (查所有值调用填-1)
        // rowperpage: "-1", //每页记录数  必填 (查所有值调用填-1)
        // tableZd: "CD_CODE,CD_CHINA", //请求哪一列的数据
        // table: "C_DEPT",
        // //SYS_UNIT:"440100113",
        // type: 2,
        // where: "SYS_UNIT,CD_CODE",
        // whereFh: "=,="
        // "SYS_UNIT":"44",
					"type":2,
					"LENGTH_CD_CODE":2,//省单位2位数，市单位4位数，所单位大于12位数 ， 例如： 00 法院，0001广州市法院，000100000000 广州市越秀法院
					"CD_CODE":undefined
      },
      provinces: [
        //一级
      ],
      citys: [
        //二级
      ],
      districts: [
        //三级
      ],
      //  弹框
      show: false,
      showCity: false,
      showDistrict: false
    };
  },
  methods: {
    // 房间选择模块
    goRoom(){ // 请求房间号
          let self = this;
          let unit = "440100113";
          //  console.log(this.$route.query.sysUnit)
          let params = {
              cupage: "-1", //当前页  必填 (查所有值调用填-1)
              rowperpage: "-1", //每页记录数  必填 (查所有值调用填-1)
              tableZd:"CD_CODE,CD_CHINA",//请求哪一列的数据 
              table:"c_room",
              type:2,
              sysUnit:440100113
            };
            this.$http.get("/apis", { params }) // 请求成功返回参数
              .then(function(data) {
                  if(data.data.status == 200){
                      var value = data.data.record;
                      value.forEach(function(item) {
                        self.room.push(
                          {
                            title:item.CD_CHINA,  
                              value:item.CD_CODE,
                          }
                        );
                      });
                      //  请求成功把数据放入弹框
                      $(".info1").select({
                            title: "选择房间",
                            items:self.room,
                          })
                  }
                }) .catch(function(error) {
                // 请求错误时
                console.log(error);
              });         
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
        },
  // input选项
    goCases(index) {
      // 现办案环节
      let self = this;
      let params = {
        "type":5
      };
      this.$http
        .get("/apis", { params }) // 请求成功返回参数
        .then(function(data) {
          // console.log(data)
            if(data.data.status == 200){
                var value = data.data.record;
                // console.log(value)
                value.forEach(function(item, i) {
                  self.case.push({
                    title: item.CD_CHINA,
                    value: item.CD_CODE
                  });
                });
                //  请求成功把数据放入弹框
                $(".case").select({
                  title: "办案环节",
                  items: self.case
                });
            }
        })
          .catch(error=>console.log(error));
    },
    goUnitType() {
      //   现办案单位类型
      let self = this;
      let unit = "440100113";
      let params = {
        "type":4
      };
      self.$http
        .get("/apis", { params }) // 请求成功返回参数
        .then(function(data) {
           if(data.data.status == 200){
                var value = data.data.record;
                value.forEach(function(item) {
                  self.unitType.push({
                    title: item.CD_CHINA,
                    value: item.CD_CODE
                  });
                });
                //  请求成功把数据放入弹框
                $(".unitType").select({
                  title: "现办单位类型",
                  items: self.unitType
                });
           }
        })
        .catch(error => console.log(error));
    },
    showUnit() {
      // alert(1)
      // 现办案单位点击出弹框
      this.show = true;
      let self = this;
      let unit = "440100113";
      let params = this.commonparams;
      // params.CD_CODE = 1;
      // 请求成功返回参数
      console.log(params)
      this.$http
        .get("/apis", { params })
        .then(function(data) {
          console.log(data)
            if(data.data.status == 200){
                var value = data.data.record;
                self.provinces = []; //进入前清空,阻止累加
                value.forEach(function(item) {
                  self.provinces.push({
                    content: item.CD_CHINA,
                    value: item.CD_CODE
                  });
                });
            }
        })
        .catch(error => console.log(error));
    },
    // 点击弹框回到上一页面
    goPre() {
      this.show = false;
    },
    goPreProvince() {
      // alert(1)
      this.show = true;
      this.showCity = false;
    },
    goPreCity() {
      this.showCity = true;
      this.showDistrict = false;
    },
    close() {
      //点击弹框的关闭按键
      this.show = false;
      this.showCity = false;
      this.showDistrict = false;
    },
    goCity(event,index) {
      //点当前一级菜单请求二级菜单的内容,传入CD_CODE给到后台
      console.log("我是一级菜单");
        console.log('---------我是一级-----------')
      let self = this;
      this.showCity = true;
      let params = this.commonparams;
      params.LENGTH_CD_CODE = 4;
      params.CD_CODE = this.provinces[index].value;
      //params.CD_CODE = this.provinces[index].value; //修改commonparams中的CD_CODE属性
      // 请求成功返回参数
      this.$http
        .get("/apis", { params })
        .then(function(data) {
          console.log(data)
            if(data.data.status == 200){
              console.log(data)
                  self.citys = []; //进入前清空,阻止累加
                var value = data.data.record;
                if (value.length > 0) {
                // console.log(value.length)
                    value.forEach(function(item) {
                      // console.log(item)
                      self.citys.push({
                        content: item.CD_CHINA,
                        value: item.CD_CODE
                      });
                    });
                }else{
                      self.show = false;
                      self.showCity = false;
                      self.showDistrict = false;
                      self.units = event.target.innerText;
                }
            }
        })
        .catch(error => console.log(error));
    },
    goDistrict( event,index) {
      //点击出现三级菜单
      console.log("我是三级");
      let self = this;
      this.showDistrict = true;
      let params = this.commonparams;
      params.LENGTH_CD_CODE = 12;
      console.log(self.citys[index])
      params.CD_CODE = self.citys[index].value; //修改commonparams中的CD_CODE属性值//点击的值赋给cd_code

      this.unitsCode = params.CD_CODE; //当前code赋值到现办案单位的code中
      console.log(params.CD_CODE);
      // 请求成功返回参数
      this.$http.get("/apis", { params }).then(function(data) {
          if(data.data.status == 200){
            console.log(data)
              var value = data.data.record;
                  //  判断三级有没有值如果有 this.showDistrict = true;否则就为false
              if (value.length > 0) {
                self.districts = []; //进入前清空,阻止累加
                value.forEach(function(item) {
                  self.districts.push({
                    content: item.CD_CHINA,
                    value: item.CD_CODE
                  });
                });
              } else {
                self.showDistrict = false;
                self.show = false;
                self.showCity = false;
                self.units = event.target.innerText;
                console.log(event.target.innerText)
              }
          }
      })
      .catch( error => console.log(error))
    },
    goResult(event, index) {
      //最后一个弹框
      var self = this;
      console.log("我是三级");
      this.unitsCode = this.districts[index].value;
      let districts = this.districts;
      this.units = event.currentTarget.innerText;
      this.show = false;
      this.showCity = false;
      this.showDistrict = false;
    },
    //  点击提交事件
    submit() {
      var time = $(".time").val();
      var endDatEnd = $(".endDatEnd").val();
      var unitType = $(".unitType").val();
      let caseCode = $(".case").attr("data-values");
      let unitTypeCode = $(".unitType").attr("data-values");
      let params = {
        sysUnit: "440100113",
        pKey: this.PKey,
        changeTime: time, //变动时间
        enddatenow: endDatEnd, //关押期限
        casenow1: this.units, //现办案单位
        casenow: this.unitsCode, //现办案单位
        typenow: caseCode, //办案环节code
        deptnow1: unitType, //现办案类型-name
        deptnow: unitTypeCode, //现办案单位类型code,
        textno: this.textNo, // 法律文书
        workman: this.HandledBy, //经办人
        type: 50
      };
      this.$http
        .get("/apis", { params })
        .then(function(data) {
            // if(data.data.status == 200){
                //提交成功后,如果返回0就为不成功,1为成功
                console.log(data);
            // }
        })
        .catch(error => console.log(error));
    }
  },
  mounted() {
    //页面一加载就执行此
    var self = this;
    // 添加房间号
    this.addRooms();

    $(".time ,.endDatEnd").calendar({
      // 日期格式
      dateFormat: "yyyy-mm-dd"
    });
    this.goCases();
    this.goUnitType();
  }
};
</script>
<style lang="less" scoped>
.modifyChange{
  height: 100%;
}
// 列表调整部分
.select {
  background-color: #fff;
  width: 100%;
  line-height: 1.12rem;
  margin-top: 0.4rem;
  overflow: hidden;
  li {
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    border-bottom: 1px solid rgb(237, 237, 237);
    height: 1.146667rem;
    background: url("/static/img/icon-fhhh@2x.png") no-repeat;
    background-size: 0.213333rem 0.4rem;
    background-position: right;
    label {
      width: 100%;
      display: inline-block;
      color: rgb(0, 118, 218);
      font-size: 0.373333rem;
      span {
        width: 35%;
        float: left;
      }
      input[type="text"] {
        width: 60%;
        height: 1.133333rem;
        // float: left;
        color: rgb(51, 51, 51);
        font-size: 0.426667rem;
      }
    }
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
  margin-top: 1.6rem;
  margin-bottom: 0.4rem;
}
// 三级联动
.model,
.model1 {
  width: 100%;
  height: 80%;
  position: fixed;
  bottom: 0;
  font-size: .373333rem;
  background-color: #fff;
  overflow-y: scroll;
  z-index: 1000;

  header {  
  width: 100%;
  // height: 0.666667rem;
  height: 50px;
  line-height:50px;
// line-height: 0.666667rem;
  text-align: center;
  border: 1px solid #ccc;
  color: #fff;
  background-color: #0076da;
  position: fixed;
  // margin-top: -0.666667rem;
  z-index: 110;

    .arrow {
      height: 100%;
      // line-height: 100%;
      float: left;
      padding-left: 0.133333rem;
      font-size: 0.4rem;
      color: #fff;
      position: absolute;
      left: 2%;
      z-index: 120;
    }
    .close {
      float: right;
      padding-right: 0.133333rem;
    }
  }
  ul {
    height:100%;
    width:100%;
    margin-top: 50px;
    text-align:center;
    li {
      padding: 10px 0;
      text-align: center;
    }
  }
}
</style>


