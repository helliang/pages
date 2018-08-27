/*
 * @Author:carrie
 * @Date: 2018-07-30 14:44:02 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-24 21:34:18
 */
<template>
    <!-- 讯问预约 -->
    <div class="question">
        <div>
            <div class="container">
                <p class="title-bgImg">预约服务</p>
                <ul class="serve li-line">
                    <li>
                        <span>单位:</span>
                        <input type="text" placeholder="请选择"  v-model="AUnit" readonly @click="onUnit">
                    </li>
                    <li>
                        <span>姓名:</span>
                        <input type="text" placeholder="请输入" v-model="user">
                    </li>
                    <li>
                        <span>证件号码:</span>
                        <input type="text" placeholder="请输入" v-model="idCode">
                    </li>
                </ul>
            </div>
            <div class="info container">
                <p class="title-bgImg">预约信息</p>
                <ul class="serve li-line">
                    <li>
                        <span>预约时间:</span>
                        <input class="arrow" type="text" id='appointment-time' placeholder="请选择" readonly>
                    </li>
                    <li>
                        <span>预约时段:</span>
                        <input class="arrow" type="text" id="time-frame" v-model="ATimeFrame" @click="onFrame()" placeholder="请选择" readonly>
                    </li> 
                    <li>
                        <span>预约次数:</span>
                        <input class="arrow" type="text" id="appointment-num" v-model="nowNum"  placeholder="请选择" readonly>
                    </li>
                </ul>
            </div>
            <div class=" info container">
                <p class="title-bgImg appointment-info">预约人信息</p>
                <ul class="serve li-line">
                    <li>
                        <span>单位:</span>
                        <input type="text" placeholder="请输入" v-model="unit2">
                    </li>
                </ul>
            </div>
        </div>
        <ul class="serve  figure-info ">
            <li>
                <span>办事人:</span>
                <input type="text" placeholder="请输入" v-model="clerks">
            </li>
            <li>
                <span>证件号:</span>
                <input type="text" placeholder="请输入" v-model="idCode2">
            </li>
        </ul>
          <ul class="serve  figure-info ">
             <li>
                <span>办事人:</span>
                <input type="text" placeholder="请输入"  v-model="clerks2">
            </li>
            <li>
                <span>证件号:</span>
                <input type="text" placeholder="请输入"  v-model="idCode3">
            </li>
        </ul>
        <transition name="fade" >
            <!-- showPicker 显示弹框 -->
            <div v-if="showPicker">
                 <div id="h-picker"  v-if="lists.length">
                     <div class="area_ctrl" >
                         <!-- title -->
                        <div class="area_btn_box">
                            <div class="area_btn larea_cancel" @click="goBack(lists)">返回</div>
                            <div class="titleName">{{nowTitle}}</div>
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
            <loading ref="show"></loading>
         <button class="submit" @click="submit">保存</button>
    </div>
</template>
<script>
import store from "../../../store";
import loading from "../../common/loading";
export default {
    name: "question",
    components:{loading},
    data() {
        return {
            user:'',
            names:[],
            AUnit:'',//单位
            unit2:'',//预约信息下的单位
            idCode:'',//证件号
            ATimeFrame:[],//时段
            ANum:[],//预约次数
            nowNum:[],
            AUnitCode:'',
            clerks:'',//办事人
            clerks2:'',//办事人2
            idCode2:'',//预约信息下的证件号
            idCode3:'',//预约信息下的证件号
             // 籍贯弹框
            showPicker:false,
            lists:[],//空数组用来给省会赋值
            // 省
            prives:[],
            city:[],
           // area:[],//区
            codeType:1,
            nowTitle:'',
            coffeeType:JSON.parse(localStorage.getItem('coffeeType')),
        };
    },
    methods:{
        // 预约单位:
        onUnit(){
            let self = this;
           self.$refs.show.showLoding = true;
            self.showPicker = true;
            self.lists = [];
            self.city = [];
            self.area = [];
            self.ATimeFrame =[];
            self.ANum = [];
            self.nowNum = null;
            self.AUnitCode ='';
            self.codeType = 1;
            self.nowTitle = '请选择单位名称';
            let params = {
                codLength:4,
                codName:'C_KEY_KSS',//单位
                cdCode:undefined,
            };
            self.$http.get(self.apis.nativeURL,{params}) .then(function(response) {
                self.$refs.show.showLoding = false;
                 var value= response.data.record;
                    self.lists = [];
                    self.prives = [];
                 if(value.length > 0){
                    value.forEach(element => {
                        self.prives.push({
                            title:element.CD_CHINA,
                            code:element.CD_CODE
                        })
                        self.lists = self.prives;
                    });
                 }else{
                     $.toast("暂无数据");
                 }
            })
            .catch(error => {
                console.log(error)
                 $.toast('请求数据失败')
                })
        },
            // 点击单位弹框里的具体值
        onCityList(index){
            let self = this;
            var $event = event;
            if(self.codeType == 1){//市
                // console.log('长度为9的单位')
                let params = {
                        codLength:9,
                        codName:'C_KEY_KSS',//单位
                        cdCode:self.lists[index].code,
                    };
                self.$http.get(self.apis.nativeURL,{params}) .then(function(response) {
                    var value= response.data.record;
                    if(value.length > 0){
                            self.city = []
                            self.codeType = 2;//2
                            value.forEach(element => {
                                self.city.push({
                                    title:element.CD_CHINA,
                                    code:element.CD_CODE
                                })
                                self.lists = self.city;
                            });
                        }else{
                            self.AUnit = $event.target.innerText;
                            self.AUnitCode = self.lists[index].code;
                            self.showPicker = false;
                    }
                }).catch(error => console.log(error))
            }else if(self.codeType == 2){
                    self.AUnit = $event.target.innerText;
                    self.AUnitCode = self.lists[index].code;
                    self.showPicker = false;
                    // console.log('最后一层',self.AUnit);
                     if(self.AUnitCode.length == 9){//用做预约时段的值
                        let params ={
                            type:'0205',
                            sysUnit: self.AUnitCode//单位代码
                        }
                        self.$http.get(self.apis.baseURL,{params}).then(function(response){//从单位中获取对应的时段和预约次数
                                self.lists = [];
                                let value = response.data.record;
                                self.codeType =3;
                                // 获取当前电脑的时分和返回来的时分做对比,对上了就赋当前的值
                                    if(value.length > 0){
                                        var nowTime = new Date();
                                        var nowHours = nowTime.getHours();
                                        var nowMin = nowTime.getMinutes();
                                        // 系统的时分
                                        var nowSec = nowHours * 3600 * 1000 + nowMin * 60 * 1000;
                                        // console.log('系统时间' + nowSec)//65700000
                                        var optionsTime = [];
                                        var timeLine = [];
                                        var strTime = [];   
                                        var timeFlag = 1;
                                        for(let i = 0 ;i < value.length; i++ ){
                                            timeLine[i] = value[i].SJD;//把每个时间提出放一个数组里
                                            strTime = timeLine[i].split("-");
                                            //第一位的 开始时间8:00
                                            var startTimes = parseInt(strTime[0].split(':')[0]) * 3600 * 1000
                                            var endTimes = parseInt(strTime[0].split(':')[1]) * 60 * 1000
                                            //第一位的 结束时间-10:00
                                            var startTimes2 = parseInt(strTime[1].split(':')[0]) * 3600 * 1000
                                            var endTimes2 = parseInt(strTime[1].split(':')[1]) * 60 * 1000
                                            // 
                                            if (nowSec >= startTimes + endTimes && nowSec <= startTimes2 + endTimes2) {
                                                self.ATimeFrame = value[i].SJD//当前时间
                                                self.nowNum = value[i].SYCS
                                                // console.log(value[i].SJD)
                                                // return;
                                            } else {
                                                self.ATimeFrame = value[0].SJD
                                                self.nowNum = value[2].SYCS
                                            };
                                            // 把返回来的时间放入lists中
                                        }

                                    }else{
                                        $("#time-frame").attr('placeholder','暂无预约时段')
                                        $("#appointment-num").attr('placeholder','暂无预约次数')
                                    }
                                    if(self.codeType ==3){//给预约时段赋值
                                        // console.log(index)
                                        let timeFrame = [];
                                        if(value.length > 0){
                                            // self.showPicker = true;
                                            value.forEach(element => {
                                                timeFrame.push({
                                                    title:element.SJD
                                                });
                                                self.ANum.push(element.SYCS)
                                            });
                                            self.lists = timeFrame;

                                        }else{
                                        }
               
                                    }
                        }).catch(error =>{
                            console.log(error);
                            $.toast('请求数据失败')
                        })
                     }
            };
            if(self.codeType == 3){
                
                    self.ATimeFrame = $event.target.innerText;
                    self.nowNum = self.ANum[index]
                    self.showPicker = false;
                    console.log(index)
            }
            //  $event.preventDefault();
        },
   
        // 籍贯弹框
        goBack: function (codes) {
            let self = this;
            for (let j = 0; j < codes.length; j++) {
                const element = codes[j];
                if(element.hasOwnProperty('code')){
                    for (let i = 0; i < codes.length; i++) {//单位里的弹框返回
                        const element = codes[i];
                        if(element.code.length == 4){
                            this.showPicker = false;
                        }else if(element.code.length == 9){//市赋省的值
                            this.codeType = 1;
                            this.lists = this.prives;
                        }
                    }
                }else{
                    this.showPicker = false;
                }
                
            }
        },
        finish: function (e) {
            this.showPicker = false;
            e.preventDefault();
            // e.preventDefault();
        },
        // 预约时段
        onFrame(){
            let $event = event;
            console.log(this.AUnitCode)
            // console.log(this.coffeeType)
            let self = this;
            self.nowTitle = '请选择预约时段';
            self.showPicker = true;
            if(self.AUnitCode.length == 0){
                $.toast('请先选择单位!')
            }else if(self.ATimeFrame.length == 0){
                $.toast('暂无预约时段!')
                return;
                // console.log(11)
                // console.log($event.target.innerText)
            }
        },
        submit(){
            // 点击保存的时候判断预约时间是不是为当天,
            var date = new Date();
            var    Y = date.getFullYear() + '-';
            var    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var    D = date.getDate();
            var     nowDate = Y+M+D;
                // console.log(Y+M+D); //呀麻碟
            var ATime = $('#appointment-time').val();
            // 预约时段
            let ATimeFrame = $("#time-frame").val();
            // 预约次数
            var ANum = $('#appointment-num').val();
            if(nowDate != ATime){
                 $.toast("不能大于或小于当天日期!");
            }
            let params = {
                type:'0202',
                sysUnit:this.AUnitCode,//单位代码
                xm:this.user,//姓名
                id:this.idCode,//临时证件号
                yysj:ATime,//预约时间
                //num:ANum,//预约次数
                badw:this.unit2,
                yysjd :ATimeFrame,//预约时间段
                bar1:this.clerks,  //办案人1
                bar1zjh:this.idCode2,  //办案人1证件号
                bar2:this.clerks2,  //办案人2
                bar2zjh:this.idCode3,  //办案人2证件号 
                // 隐藏的操作人
                czr:'admin',
            }
        
            console.log(params)
            console.log(ANum)
            if(this.user!=''&&this.idCode!=''&&this.AUnit!=''&&this.ATime!=''&&this.ATimeFrame!=''&&ANum!=''&&this.unit!=''&&this.clerks!=''&&this.clerks2!=''&&this.idCode2!=''&&this.idCode3!=''){
                if(ANum == '0'){
                     $.toast("当前无可预约次数!");
                }else{
                    this.$http.get(this.apis.baseURL,{params}).then(function(response){//周98    349378497623763818  这个可以用
                    console.log(response)
                        let value = response.data;
                        console.log(value.message)
                        if(value == 'Success'){
                            $.toast("预约成功");
                            this.AUnit = [];
                            this.ATimeFrame = [];
                            this.nowNum = [] ;
                        }else if(value == 'Fail'){
                            $.toast("预约失败");
                        }else if(value == 'exist'){
                            $.toast("羁押人员在时间段内已预约");
                        }else if(value == 'inCase'){
                            $.toast("羁押人员的办案环节不符合预约条件");
                        }else if(value == 'inSwjy'){
                            $.toast("羁押人员已办理出所就医，无法进行预约！");
                        }else if(value == 'notExist'){
                            $.toast("羁押人员信息不存在，无法进行预约！");
                        }
                    })
                    .catch(error =>{
                         $.toast("请求失败");
                         console.log(error)
                    })
                }
            }else{
                 $.toast("内容不能为空!");
            }
        },
    },
    mounted() {
        // 
        // 预约时间
        $("#appointment-time").calendar({
            dateFormat: "yyyy-mm-dd"
        });
        // console.log(this.$refs.showLoding.showLoding)
        // 获取数据复用
        // 通过路由跳转
        // console.log(this.$route.query.user)
        // 通过vuex存储
        // console.log(store.state.$vux.isDataReuse)
        if(store.state.$vux.isDataReuse !=null){
            let obj = store.state.$vux.isDataReuse
            // console.log(store.state.$vux.isDataReuse)
        //    this.names = store.state.$vux.isDataReuse.name
        for(var i in obj){
            // console.log(i+obj)
        }
        }else{
            console.log('我是空数据')
        }
    },
    watch:{
    
    }
};
</script>
<style lang="less" scoped>
.question {
    width: 100%;
    color: rgb(51, 51, 51);
    font-size: 0.373333rem;
}
.container {
    background-color: #fff;
}
.serve {
    padding-left: 0.266667rem;
}
.title-bgImg {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.426667rem;
    padding-left: 0.266667rem;
    border-bottom: 1px solid #eaeaea;
    color: #006ad7;
}
.title-bgImg::before {
    content: "";
    width: 0.426667rem;
    height: 0.426667rem;
    background: url("../../../../static/img/yuyuexingxi@2x.png") no-repeat;
    background-size: 70%;
    padding-right: 0.693333rem;
    vertical-align: middle;
}
.appointment-info::before {
    background: url("../../../../static/img/yuyuerenxinxi@2x.png") no-repeat;
    background-size: 70%;
}
input::placeholder {
    color: rgb(153, 153, 153);
}
input::-webkit-input-placeholder {
    color: rgb(153, 153, 153);
}
.li-line > li,
.figure-info > li {
    height: 1.173333rem;
    line-height: 1.173333rem;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    /*主轴居中对齐*/
    justify-content: center;
    /*侧轴居中对齐*/
    align-items: center;
    span {
        flex: 1;
    }
    input {
        height: 80%;
        flex: 4;
        font-size: .373333rem;
    }
    .arrow {
        display: flex;
        // 居中对齐
        justify-content: space-around;
    }
}
// 预约信息
.info {
    margin-top: 0.4rem;
    ul > li > input.arrow {
        background: url("/static/img/icon-fhhh@2x.png") no-repeat;
        background-position: 90%;
        background-size: 0.213333rem 0.4rem;
    }
}
.figure-info {
    background-color: #fff;
    li {
        border: none;
        input {
            flex: 4;
        }
    }
    border-bottom: 1px solid #eaeaea;
}
.module-icon {
    flex: 0;
    position: absolute;
    right: 1rem;
    z-index:1000;
    img {
        max-width: 100%;
        width: 0.64rem;
        height: 0.64rem;
    }
}
.add-module{
    width:100%;
    height: 1.306667rem;
    line-height: 1.306667rem;
    background-color: #fff;
    font-size:.426667rem;
    color:#0076DA;
    text-align: center;
    img{
        display: inline-block;
        margin-left: .4rem;
        // max-width: 100%;
        width: 0.64rem;
        height: 0.64rem;
        vertical-align: middle;
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
        margin-bottom: 1.173333rem;
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
    // display:flex;
    background-color:#F7F7F8;
  div{
    //   flex:1;
    background-color:#F7F7F8;
      width: 33.3333%;
      float: left;
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
    width: 100%;
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
            padding-left: 5%;
            width: 100%;
            border-bottom: 1px solid #F3F3F3;
            display: block;
        }
    }
}


</style>

