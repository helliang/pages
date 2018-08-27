/*
 * @Author:carrie
 * @Date: 2018-05-22 16:40:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-23 11:13:26
 前科查询
 */

<template>
    <div id="inquire">
        <!-- <router-link class="back" to="/business"><span class="backBtn"></span></router-link> -->
        <div class="form">
            <div class="form_box">
                <p>
                    人员类型:
                    <!-- <select name="select" id="select" v-model="selected" class="personType">
                        <option value="" class="option">所有人</option>
                        <option value="10" class="option">在所人</option>
                        <option value="11" class="option">历史人</option>
                    </select> -->
                    <input type="text" value="11"  class="personType" v-model="personType" readonly>
                </p>
                <p class="genre">姓名:</p>
                <div class="state">
                    <input type="text" class="inp_box" v-model="name">
                    <select name="" id="" class="selects" v-model="isEquery">
                        <option value="=">等于</option>
                        <option value="LIKE">模糊</option>
                    </select>
                </div>
                <p class="genre">证件号&nbsp;
                    <span style="color:#666;font-size:0.32rem;">(身份证/护照) :</span>
                </p>
                <div class="state">
                    <input type="text" class="inp_box" v-model="identity">
                </div>
                <div calss="sex">
                    <div class="genre">
                        <span>性别:</span>
                        <label>
                            <input type="radio" value="1" name="sex" v-model="sex">男
                        </label>
                        <label>
                            <input type="radio" name="sex" value="2" v-model="sex" />女
                        </label>
                        <label>
                            <input type="radio" name="sex" value="" v-model="sex">不限
                        </label>

                    </div>

                    <div>
                        <p class="genre">出生日期:</p>
                        <div class="state date-of-birth">
                            <input type="text" data-toggle='date' class="inp_date" id="my-input" value="" />
                            <span class="interval">至</span><input value="" type="text" data-toggle='date' class="inp_date" id="my-input2" />
                        </div>
                    </div>
                    <div>
                        <p class="genre">民族:</p>
                        <input type="text" class="inp_box select-nation"  readonly>
                    </div>
                    <p class="genre">籍贯:</p>
                    <div class="state">
                        <input type="text" class="inp_box" v-model="native" readonly @click="onNative()">
                    </div>
                </div>
                <div>
                    <p class="genre">选择返回数据</p>
                    <select name="" v-model="number" id="" style="margin-left:0px; width:100%; height:1.066667rem;">
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                    </select>
                </div>
            </div>
            <transition name="fade" >
            <!-- showPicker 显示弹框 -->
            <div v-if="showPicker">
                 <div id="h-picker"  v-if="lists.length">
                 <!-- <div id="h-picker"  v-if="showPicker"> -->
                     <div class="area_ctrl" >
                         <!-- title -->
                        <div class="area_btn_box">
                            <div class="area_btn larea_cancel" @click="goBack(lists)">返回</div>
                            <div class="area_btn  larea_finish" @click="finish">取消</div>
                        </div>
                        <!-- content -->
                        <ul class="area_content">
                            <li v-for="(item ,index) in lists" :key="index" @click="onCityList(index)"><span>{{item.title}}</span></li>
                        </ul>
                     </div>
                 </div>

            </div>
            </transition>
             
            <p id="sub" @click="submit">搜索</p>
        </div>
        <div class="loding" v-show="showLoding">
            <div class="weui-loadmore ">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
        </div>
    </div>
</template>
<script>
import store from "../store";
export default {
    name: "inquire",
    data() {
        return {
            // selected: "", //人员类型
            personType:'历史人员',
            name: "", //姓名
            isEquery: "=", //姓名之后的模糊
            identity: "", //证件号
            sex: "", //姓别
            nation: [], //民族
            native: "", //籍贯
            nativeCode:'',//传入籍贯代码给到后台
            number: "20", //返回数据
            showLoding: false,
            // 籍贯弹框
            showPicker:false,
            lists:[],//空数组用来给省会赋值
            // 省
            prives:[],
            city:[],
            area:[],//区
            codeType:4,
        };
    },
    computed:{
    },
    methods: {
        // 选择民族
        onSelectNation:function(){
            let self = this;
            let params = {
                // type:3,
                codName:'C_NATION',//名族
            //    C_REGION 户籍 
            }
             self.$http.get(self.apis.nativeURL,{params}) .then(function(response) {
                    // console.log(response)
                 if(response.data.status == 200){
                    var value = response.data.record;
                        value.pop()//移除最后一条数据
                     value.forEach(function(item) {
                        // console.log(item)
                        self.nation.push({
                        title: item.CD_CHINA,
                        value: item.CD_CODE
                        });
                    });
                    // console.log(self.nation)
                    //  请求成功把数据放入弹框
                    $(".select-nation").select({
                    title: "选择民族",
                    autoClose:true,
                    items: self.nation
                    });
                }
            })
        },
        // 选择籍贯
        onNative(){//籍贯的Input框 
          let self = this;
            self.showPicker = true;
            self.lists = [];
            self.city = [];
            self.area = [];
            let params = {
                codLength:'2',
                codName:'C_REGION',//户籍 
                cdCode:undefined,
            };
           
            self.$http.get(self.apis.nativeURL,{params}) .then(function(response) {
                 var value= response.data.record;
                     self.prives = [];
                 if(value.length > 0){
                    //  console.log(value)
                    // console.log(response)
                        // console.log(value)
                    value.forEach(element => {
                        self.prives.push({
                            title:element.CD_CHINA,
                            code:element.CD_CODE
                        })
                        // console.log(self.prives.title)
                        self.lists = self.prives;
                    });
                    // console.log(self.lists.title) 
                 }else{
                     $.toast("暂无数据");
                 }
            })
            .catch(error => console.log(error))
        },
        // 点击弹框里的具体值
        onCityList(index){
            let self = this;
            var $event = event;
            // var codeType = 1;
            if(self.codeType == 4){//市
            console.log('市')
             let params = {
                    codLength:'4',
                    codName:'C_REGION',//户籍 
                    cdCode:self.lists[index].code,
                };
                self.$http.get(self.apis.nativeURL,{params}) .then(function(response) {
                    var value= response.data.record;
                    // console.log(response.data.record)
                    if(value.length > 0){
                        // console.log('进来了')
                            self.city = []
                            self.codeType ++;
                                // console.log(value)
                            value.forEach(element => {
                                self.city.push({
                                    title:element.CD_CHINA,
                                    code:element.CD_CODE
                                })
                                self.lists = self.city;
                            });
                        }else{
                            self.native = $event.target.innerText;
                            self.nativeCode = self.lists[index].code;
                             self.showPicker = false;
                    }
                })
            }else if(self.codeType == 5){//区
                console.log('区')
                let params = {
                        codLength:'6',
                        codName:'C_REGION',//户籍 
                        cdCode:self.lists[index].code,
                    };
                console.log(params.cdCode)
                self.$http.get(self.apis.nativeURL,{params}) .then(function(response) {
                    // console.log(response)
                    var value= response.data.record;
                        console.log(value)
                    if(value.length> 0){
                            self.area = []
                            self.codeType ++;
                            value.forEach(element => {
                                self.area.push({
                                    title:element.CD_CHINA,
                                    code:element.CD_CODE
                                })
                                self.lists = self.area;
                            });
                        }else{
                            self.showPicker = false;
                            self.native = $event.target.innerText;
                            self.nativeCode = self.lists[index].code;
                            // return;
                    }
            })
            }else if(self.codeType == 6){
                            self.native = $event.target.innerText;
                            self.nativeCode = self.lists[index].code;
                            self.showPicker = false;
                            self.codeType = 4;
                console.log('最后一层',self.native)
            }
             $event.preventDefault();
            
        },
        // 籍贯弹框
        goBack: function (codes) {
            let self = this;
            // console.log(codes.code)
            for (let i = 0; i < codes.length; i++) {
                const element = codes[i];
                // console.log(element.code)
                if(element.code.length == 2){
                    this.showPicker = false;
                }else if(element.code.length == 4){//市赋省的值
                    this.codeType = 4;
                    this.lists = this.prives;

                }else if(element.code.length == 6){//区赋市的值
                    this.codeType = 5;
                    this.lists = this.city;

                }
                
            }
        },
        finish: function (e) {
            this.showPicker = false;
            e.preventDefault();
            // e.preventDefault();
        },
        submit: function() {
            this.showLoding = true;
            let self = this;
            // 出生日期
            let birthday = $("#my-input").val();
            // console.log(birthday);
            let birthday2 = $("#my-input2").val();
            let nation = $('.select-nation').attr('data-values')//民族
            let params = {
                type: 10,
                sysUnit:44,
                changeCode: true, //是否把code代码翻译
                currentPage: 1, //当前页,
                pageSize: this.number, //页显示数据量
                NAME: this.name, //名称-name
                T_STATUS: 11,//历史人员
                ISEQUERY: this.isEquery,//姓名之后的模糊
                ID: this.identity,//身份证号
                SEX: this.sex,//性别
                BIRTHDAY1: birthday,
                BIRTHDAY2: birthday2,
                NATION:nation,//民族
                NATIVE_PLACE: this.nativeCode//籍贯代码
            };

            // console.log(params);//打印当前所有值
            // return;
            this.$http.get(this.apis.baseURL, { params }).then(function(response) {
                // console.log('..................')
                    // console.log(params);
                if (response.data.record.length >0) {
                    self.showLoding = false;
                        // 将response.data.record存储到coffeeType字段
                        localStorage.setItem("coffeeType",JSON.stringify(response.data));
                        // 将参数存储传入下一个页面
                        localStorage.setItem('dataParams',JSON.stringify(params))
                        //  return;
                        // alert('成功')
                        //  window.location.href="result";
                        self.$router.push({ path: "/result" });
                        // self.$router.push("/result");
                    } else {
                        self.showLoding = false;
                        $.toast("暂无此用户数据");
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alert("请接接口错误"+error);
                    self.showLoding = false;
                }); 
        }
    },
    mounted() {
        // 调用民族方法
        this.onSelectNation()
        let date = new Date();
        $("#my-input").val();
        $("#my-input2").val();
        $("#my-input").calendar({
            // 日期格式
            dateFormat: "yyyy-mm-dd"
        });
        $("#my-input2").calendar({
            // 日期格式
            dateFormat: "yyyy-mm-dd"
        });
    },
    watch:{
        // lists: function(curVal,oldVal){
        //     var self = this;
        //     if(oldVal.length <= 0 ){
        //         self.showLoding = true;
        //     console.log(self.showLoding)
        //     }
        //     if(curVal.length >0){
        //         self.showLoding = false;
        //     }
        // },
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
#inquire {
    width: 100%;
    height:100%;
    position:relative;
    max-width: 100%;
}
.form {
    width: 100%;
    height: 100%;
    padding-top: 0.4rem;
    background-color: #ffffff;
    font-size: 0.373333rem;
    color: rgb(51, 51, 51);
    text-align: start;
}
.form_box {
    width: 90%;
    margin: 0 auto;
}
.state {
    display: flex;
    display: -webkit-flex;
    line-height: 1.066667rem;
}
.date-of-birth {
    width: 100%;
}
.date-of-birth > input {
    width: 45%;
}
.date-of-birth > .interval {
    width: 10%;
    text-align: center;
}
select {
    outline: none;
    text-align: center;
    display: inline-block;
    line-height: 1.066667rem;
    padding-left: 0.293333rem;
    // padding-right: 1.333333*75/25.6rem;
    font-size: 0.373333rem;
    color: rgb(51, 51, 51);
    /*在选择框的最右侧中间显示小箭头图片*/
    //   background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    option {
        background-color: transparent;
    }
}
.personType {
    width: 100%;
    display: block;
    height: 1.066667rem;
    margin-top: 0.266667rem;
    border: 1px solid #aeaeae;
     padding-left: 0.293333rem;
     font-size: 0.373333rem;
}
.inp_date {
    border: 1px solid #aeaeae;
    // width:80%;
    padding: 0.133333rem;
    font-size: 0.32rem;
}
.interval {
    padding: 0.066667rem;
}
.inp_box {
    border: 1px solid rgb(174, 174, 174);
    padding-left: 0.293333rem;
    width: 100%;
    line-height: 1.066667rem;
    font-size: 0.373333rem;
}
.toolbar .picker-button{
    height: 1.2rem;
}
.inp_box,
select,
input {
    // height: 1.066667rem;
    background: rgb(245, 245, 247);
}
.selects {
    width: 35%;
    margin-left: 5%;
    float: right;
}
.genre {
    // padding: .4rem 0 .266667rem 0;
    margin: 0.4rem 0 0.266667rem 0;
    label{
        font-size: .373333rem;
        margin-right: .133333rem;
    }
}
#sub {
    width: 90%;
    margin: 0 auto;
    margin-top: 1.733333rem;
    margin-bottom: 1.92rem;
    font-size: 0.373333rem;
    text-align: center;
    background-color: #539fe0;
    color: #fff;
    outline: none;
    border: none;
    height: 1.173333rem;
    line-height: 1.173333rem;
}
//   加载图标
.loding {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    bottom:0;
    z-index: 100;
}
.weui-loadmore {
    width: 100%;
    margin: 8rem auto;
    line-height: 1.6em;
    font-size: 0.373333rem;
    color: #333333;
    text-align: center;
    position: fixed;
}


// 籍贯弹框

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
    bottom: -6.3rem;
}

.area_ctrl {
    height:90%;
    width:100%;
    position:fixed;
    bottom:0;
    z-index:1000;
	font-size:0.32rem;
   
}


.area_btn_box {
    height: 6%;
  display:flex;
  background-color:#F7F7F8;
  div{
      flex:1;
      line-height:1.2rem;
  }
  .larea_cancel{
      padding-left:5%;
  }
  .larea_finish{
      text-align:right;
      padding-right:5%;
  }

}
.area_btn {
    color: #04BE02;
}
.area_content{
    background-color: #fff;
    height: 94%;
    overflow-y: scroll;
    li{
        padding: .133333rem;
        // padding: 10px 15px;
        span{
            font-size:17px;
           font-size: 17px;
        color: #3d4145;
        padding: .2rem 0;
        width: 100%;
        border-bottom: 1px solid #F3F3F3;
        display: block;
        }
    }
}

</style>


