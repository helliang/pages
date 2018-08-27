/*
 * @Author:carrie
 * @Date: 2018-05-22 16:40:06 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-21 19:27:43
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
                            <div class="area_btn larea_cancel" @click="close">取消</div>
                            <div class="area_btn larea_finish" @click="finish">确定</div>
                        </div>
                        <!-- content -->
                        <ul class="area_content">
                            <li v-for="(item ,index) in lists" :key="index" @click="onCityList(index)"><span>{{item.CD_CHINA}}</span></li>
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
            number: "20", //返回数据
            showLoding: false,
            // 籍贯弹框
            showPicker:false,
            lists:[],//空数组用来给省会赋值
            // 省
            prives:[],
            city:[],
            area:[],//区
            privesJson:{},
			cityJson:{}
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
                self.prives = [];
                self.showPicker = true;
            let params = {
                codName:'C_REGION',//户籍 
                };
            self.$http.get(self.apis.nativeURL,{params}) .then(function(response) {
                // console.log(response)
                var value= response.data.record;
                    value.pop();
                    for(let i=0;i<value.length;i++){
                        if(value[i].CD_CODE.length==2){
                            self.prives.push(value[i]);//36
                        }
                        if(value[i].CD_CODE.length==4){
                            self.city.push(value[i]);//479
                        }
                        if(value[i].CD_CODE.length==6){
                            self.area.push(value[i]);//4917
                        }
                    };
                    // debugger;
                    for(let i=0;i<self.prives.length;i++){
                        self.privesJson[self.prives[i].CD_CODE]=[];//清空privesJson中的编码,把每个编码当下标传入privesJson里
                        for(let j=0;j<self.city.length;j++){//对city进行循环
                            if(self.city[j].CD_CODE.substr(0,2) == self.prives[i].CD_CODE){//对city截取前两们和prives的编码做对比如果相等就压入
                                self.privesJson[self.prives[i].CD_CODE].push(self.city[j]);//把每个prives当下标,city当值,压入privesJson
                            }	
                    //    console.log(self.city[j].CD_CODE)//所有市截取前两位用来和省做对比
                        // console.log(self.city[j].CD_CODE.substr(0,2))//所有市截取前两位用来和省做对比
                        // console.log(self.prives[i].CD_CODE)
                        // console.log(self.prives[i].CD_CODE.substr(0,2))
                        }
                    }
                    // console.log( self.privesJson)
                    for(let i=0;i<self.city.length;i++){
                        self.cityJson[self.city[i].CD_CODE]=[];
                        for(let j=0;j<self.area.length;j++){
                            if(self.area[j].CD_CODE.substr(0,4) == self.city[i].CD_CODE){//
                                self.cityJson[self.city[i].CD_CODE].push(self.area[j]);
                            }	
                        }
                    }
                    // console.log(self.cityJson)
                    self.lists = self.prives
                    // console.log(self.cityJson)
            })
        },
        // 点击弹框里的具体值
        onCityList(index){
            var $event = event;
            if(this.lists[index].CD_CODE.length ==2){
                this.lists = this.privesJson[this.prives[index].CD_CODE];
                console.log(this.lists)
                if(this.cityJson[this.city[index].CD_CODE].length <=0){//判断市里有没有区
                    console.log(1)
                }

            }else if(this.lists[index].CD_CODE.length ==4){
                this.lists = this.cityJson[this.city[index].CD_CODE];
            }else if(this.lists[index].CD_CODE.length == 6){
                console.log($event.target.innerText)
                this.native = $event.target.innerText;
                this.showPicker = false;
                this.lists =[];
                 
            }
             $event.preventDefault();
            // console.log("下标"+index)
            // console.log(this.prives[index].CD_CODE)
            // console.log(this.privesJson[this.prives[index].CD_CODE])
            // this.lists = this.cityJson[this.city[index].CD_CODE];
        },
        // 籍贯弹框
        close: function (e) {
            let self = this;
            self.showPicker = false;
            // self.lists = [];
            // console.log(1)
            // this.$emit('cancel')
            e.preventDefault();
        },
        finish: function (e) {
            // this.$emit('confirm',this.selects)
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
                NATIVE_PLACE: this.native
            };

            // console.log(params);//打印当前所有值
            // return;
            this.$http.get(this.apis.baseURL, { params }).then(function(response) {
                // console.log('..................')
                    // console.log(params);
                    // console.log(response)
                if (response.data.status == 200) {
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
                        $.toast("请求超时");
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
        // let datestr = date.getFullYear() -75 +"-" +(date.getMonth() + 1) + "-" +date.getDay();
        // let datestr2 =date.getFullYear() + "-" +(date.getMonth() + 1) +"-" +date.getDay();
        // $("#my-input").val(datestr);
        $("#my-input").val();
        $("#my-input2").val();
        // $("#my-input2").val(datestr2);
        // console.log(this.$route.query.type)
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
        lists: function(curVal,oldVal){
            var self = this;
            if(oldVal.length <= 0 ){
                self.showLoding = true;
            console.log(self.showLoding)
            }
            if(curVal.length >0){
                self.showLoding = false;
            }
        },
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


