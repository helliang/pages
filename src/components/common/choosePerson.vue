/*
 * @Author: pan
 * @Date: 2018-06-04 14:50:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-04 21:10:40
 */
<template>
    <div id="choosePerson">
      <div :class="[chooseItem,{ active: isRoomActive }]" @click="chooseRoom">
        <span class="title roomTitle">房间号：</span>
        <input class="room" type="text" :value="thisRoom" name="room" readonly="readonly" placeholder="请选择">
       </div>
        <!-- 加载事件 -->
        <div class="weui-loadmore" v-show="showLoding">
          <i class="weui-loading"></i>
          <span class="weui-loadmore__tips">正在加载</span>
        </div>
      <div :class="[chooseItem,{ active: isNameActive }]"  @click="chooseName">
        <span class="title nameTitle">姓名：</span>
        <input class="name" type="text" :value="thisName" name="name" readonly="readonly" placeholder="请选择">
      </div>
      <transition name="fade">
        <div v-if="isShowList" class="selectWindow">
          <p class="title">{{selectTitle}}<a class="enter" @click="closeSelect">关闭</a></p>
          <div class="selectBox">
            <ul >        
              <li v-for="(list,index) in selectList" @click="selectItem(list,index)" :key="index">{{list}}
              </li>
            </ul>
          </div>
        </div>
      </transition>      
    </div>
</template>
<script>
export default {
  name: "change",
  props: ["rooms","district","names","lodingControl","isDistrictShow"],
  data() {
    return {
      chooseItem : "chooseItem",//房间和人员的共同类名
      isRoomActive : true,//控制房间样式是否高亮
      isNameActive : false,//控制人员样式是否高亮
      thisDistrict : "",
      thisRoom : "", //房间号的值
      thisName : "", //人员的值
      thisRoomID : 0,
      isShowList : false, //是否显示选择列表
      selectTitle : "",  //列表的标题信息
      districtStatus : false,//监区列表状态
      roomsStatus : false,//房间列表状态
      personsStatus : false,//人员列表状态
      selectList : [], //列表里显示的信息
      showLoding:false,
      temporaryList : [],//用来放选择列表的缓冲
      temporaryList2 : [],//用来放选择列表的缓冲（专门放人名的）
      temporaryTitle : "",//用来放选择标题的缓冲
      isRoomChange : "0",//是否改变了房间的选择
    }
  },
  watch:{
    "rooms" : function(value){
      let room = [];
      value.forEach((item)=>{
        room.push(item.CD_CHINA);
      })
      if(room.length != 0 && this.roomsStatus == true){
        //this.showLoding = false;
        this.select("请选择房间号" , room);
      }
      this.isRoomChange = "1";//房间状态改变的标记
    },
    "showLoding" : {
      handler(value){
        if(value == false && this.roomsStatus == true){      
          this.selectTitle = this.temporaryTitle;
          this.selectList = this.temporaryList;
          this.isShowList = true;
        }
      },
      deep:true
    },
    "names" : function(value){
    //观察names的变化，如果发生改变就把他的人名提取给name
      let self = this;
      let name = [];//临时存放名字的数组
      let key = [];
      value.forEach((item)=>{
        name.push(item.NAME);
        key.push(item.P_KEY);
      });
      self.temporaryList2 = name;
    }
  },
  methods: {
    chooseRoom(){//点击房间号
      let self = this;
      self.showLoding = true;
      self.isRoomActive = true;//控制房间号选择框高亮
      self.isNameActive = false;//控制人员选择框普通
      self.districtStatus = true;//设置监区列表状态活跃
      self.roomsStatus = false;  //设置房间列表状态普通
      self.personsStatus = false;//设置人员列表状态普通
      let district = []; //展示出来的监区名字集合
      let index = 0;
      //将监区名从json数据中提取出来并放入一个数组中
      let arr = JSON.parse(JSON.stringify(self.district));
      if(arr.length != 0){
        self.showLoding = false;
        arr.forEach((item) => {
            console.log(item.CD_CHINA);
            district.push(item.CD_CHINA);
        });
        self.select("请选择监区",district);//弹出选择监区列表
      }else{
        let timer = setInterval(function(){
            index++;
            if (self.district.length > 0) {
              self.showLoding = false;
              self.district.forEach((item) => {
                  district.push(item.CD_CHINA);
              });
              clearInterval(timer);
              self.select("请选择监区",district);//弹出选择监区列表
            }else{
              if(index > 300){
                 clearInterval(timer);
                 self.showLoding = false;
                 $.toast("请求超时");
              }
            }
        },30);
      }  
    },
    chooseName (){
      this.isRoomActive = false;
      this.isNameActive = true;//控制名字选择框高亮
      let room = this.thisRoom;
      let self = this;
      if(room == "" || room == null || room == undefined){
        //如果房间号为空，则提示先输入房间号
        $.toast("请先输入房间号");
        this.isRoomActive = true;
        this.isNameActive = false;
      }else{
        let self = this;
        this.showLoding = true;//打开加载动画
        if(this.isRoomChange == "0"){//判断房号是否发生改变，无则打开缓冲中的房号
          this.showLoding = false;
          self.select("请选择人员",self.temporaryList2);
        }else{//房号改变则用50毫秒的间隔查看temporaryList2是否已加载完毕
          let index = 0;
          let timer = setInterval(function(){
            index++;
            if (self.temporaryList2.length > 0) {
              //temporaryList2加载完毕则关闭加载动画打开人员列表
              self.showLoding = false;
              self.select("请选择人员",self.temporaryList2);
              clearInterval(timer);
            }else{
              //若已请求超过50*100毫秒，则显示请求超时
              if (index > 40) {
                self.showLoding = false;
                $.toast("请求超时");
                clearInterval(timer);
              }
            }
          },50);
        }
      }
    },
    closeSelect(){
      //点击确定关闭列表选择房间号或人员时触发列表显示事件
      this.isShowList = !this.isShowList;
    },
    //选择房间号或人员时触发列表显示事件
    select(title,value){
      var self = this;
      if(self.roomsStatus == true){
        self.temporaryTitle = title;
        self.temporaryList = value;
        //self.isShowList = false;
        this.showLoding = false;
      }else{
        self.selectTitle = title;
        self.selectList = value;
        self.isShowList = true;
      }
    },
    selectItem(list,index){//选择单项时分成选监区号、房间号和人员三种情况
      if(this.districtStatus == true){
        let self = this;
        let rooms = [];
        let district = "";     
        district = this.district[index]["CD_CODE"];
        //触发父组件的事件，2代表的是事件2,将监区号传给父组件以查询房间号
        self.$emit("listenToChildEvent",2,district);
        this.showLoding = true;      
        this.districtStatus = false;
        this.roomsStatus = true;  
        this.personsStatus = false;                     
      }else if(this.roomsStatus == true){ 
        this.thisRoom = list;//将当前房间号的文本赋值给文本框 
        this.thisName = ""; //选完房间号后清空人员姓名，以防和前一次选的人冲突
        this.isShowList = false; //关闭选择列表
        //将所选的房间号真实ID赋值给thisRoomID
        this.thisRoomID = this.rooms[index]["CD_CODE"];
        //触发父组件的事件，3代表的是事件3，将房间号传给父组件以得到人名
        this.$emit("listenToChildEvent",3,this.thisRoomID);
        this.districtStatus = false;//设置监区列表状态活跃
        this.roomsStatus = false;  //设置房间列表状态低迷
        this.personsStatus = true;//设置人员列表状态低迷 
        this.temporaryList2 = [];      
      }else if (this.personsStatus == true){
        this.thisName = list;
        this.isShowList = false;
        let key = this.names[index];
        let value = this.names[index];
        //触发父组件的事件，把房间号和人名传给父组件，如果不是把人员传过去，而是传递人员ID值，则修改上面的name
        this.$emit("listenToChildEvent",1,value);
        this.isRoomChange = "0";
      }   
    },
    //对象深复制，不考虑循环引用的情况
    cloneObj(from) {
        return Object.keys(from)
            .reduce((obj, key) => (obj[key] = this.clone(from[key]), obj), {});
    },
    //数组深复制，不考虑循环引用的情况
    cloneArr(from) {
        return from.map((n) =>this.clone(n));
    },
    // 复制输入值
    clone(from) {
        if (from instanceof Array) {
            return this.cloneArr(from);
        } else if (from instanceof Object) {
            return this.cloneObj(from);
        } else {
            return (from);
        }
    }
  },
};
</script>
<style lang="less" scoped>
#choosePerson{
  background-color: #fff;
  padding: .4rem 0;
  width: 100%;
  .chooseItem{
    width: 90%;
    height: 1.173333rem;
    margin: 0 5% .4rem;
    font-size: 0.426667rem;
    line-height: 1.173333rem;
    letter-spacing: .001rem;
    border: 1px solid  rgb(153,153,153);
    background: url(../../assets/img/icon-fhhh@2x.png) 97% center no-repeat;
    background-size: 0.213333rem 0.4rem;
    .title{
      display: inline-block;
      margin: 0 0.266667rem;
      text-indent: 0.72rem;
      width: 2.25rem;
      font-size: 0.373333rem;
      float: left;
    }
    .roomTitle{
      background: url(../../assets/img/fangjianhao@2x.png) left center no-repeat;
      background-size: 0.426667rem 0.48rem;
    }
    .nameTitle{
      background: url(../../assets/img/renyuanxingm@2x.png) left center no-repeat;
      background-size: 0.426667rem 0.48rem;
    }
    input{
      background: none;
      font-size: 0.426667rem;
      line-height: 1.173333rem;
      width:calc(100% - 2.9rem);
      color: white;
      float: left;
    }
    input{
      color: black;
    }
    input::-webkit-input-placeholder{
        color:rgb(153,153,153);
    }
    input::-moz-placeholder{  
        color:rgb(153,153,153);
    }
    input:-moz-placeholder{
        color:rgb(153,153,153);
    }
  }
  .active{
    background: url(../../assets/img/icon-fhhh2@2x.png) 97% center no-repeat;
    background-size: 0.213333rem 0.4rem;
    color: white;
    border: 1px solid rgb(0,118,218);
    background-color: rgb(0,118,218);
    .roomTitle{
      background: url(../../assets/img/fangjianhaob@2x.png) left center no-repeat;
      background-size: 0.426667rem 0.48rem;
    }
    .nameTitle{
      background: url(../../assets/img/renyuanxingmb@2x.png) left center no-repeat;
      background-size: 0.426667rem 0.48rem;
    }
    input{
      color: white;
    }
    input::-webkit-input-placeholder{
        color:white;
    }
    input::-moz-placeholder{  
        color:white;
    }
    input:-moz-placeholder{
        color:white;
    }
  }
  .chooseItem:nth-child(2){
    margin-bottom: 0;
  }
}
.selectWindow{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6.3rem;
  z-index: 110;
  background-color: #fff;
  border-top: 1px solid #dcdcdc;
  .title{
    width: 100%;
    text-align: center;
    font-size: .6rem;
    line-height: 1.2rem;
    position: absolute;
    background-color: #0076da;
    top: 0;
    left: 0;
    z-index: 110;
    color: white;
    .enter{
      position: absolute;
      right: .4rem;
      color: white;
    }
  }
  .selectBox{
    overflow-y: scroll;
    padding-top: 1.2rem;
    width: 100%;
    height: 6.2rem;
    position: relative;
    z-index: 100;
    ul{  
      li{
        width: 100%;
        line-height: 1rem;
        font-size: .5rem;
        text-align: left;
        text-indent: .4rem;
        letter-spacing: .05rem;
        border-top: 1px solid #dcdcdc;
      }
    }
  } 
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter,.fade-leave-to{
  bottom: -6.3rem;
}
.weui-loadmore__tips{
  font-size: .32rem;
}
.weui-loadmore{
  width: 100%;
  height: 100vh;
  margin: inherit;
  margin-top: 1.066667rem;
  background: rgba(188, 191, 192,0.5);
  position: fixed;
  top: 0;
  z-index: 120;
  line-height: 300px;
  font-size: .373333rem;

}
</style>


