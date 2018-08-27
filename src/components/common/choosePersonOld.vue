/*
 * @Author: pan
 * @Date: 2018-06-04 14:50:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-03 16:42:16
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
  props: ["rooms","district","names"],
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
    }
  },
  methods: {
    chooseRoom(){//点击房间号
      this.isRoomActive = true;//控制房间号选择框高亮
      this.isNameActive = false;//控制人员选择框普通
      this.districtStatus = true;//设置监区列表状态活跃
      this.roomsStatus = false;  //设置房间列表状态普通
      this.personsStatus = false;//设置人员列表状态普通
      let district = []; //展示出来的监区名字集合
      //将监区名从json数据中提取出来并放入一个数组中
      this.district.forEach((item) => {
          district.push(item.CD_CHINA);
      });
      this.select("请选择监区",district);//弹出选择监区列表     
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
        let name = [];//临时存放名字的数组
        let key = [];
        //提取人员名字文本的列表
        self.names.forEach((item)=>{
          name.push(item.NAME);
          key.push(item.P_KEY);
        })
          // console.log(key)
          //打开选择人员列表
        self.select("请选择人员",name);
      }
    },
    closeSelect(){
      //点击确定关闭列表选择房间号或人员时触发列表显示事件
      this.isShowList = !this.isShowList;
    },
    //选择房间号或人员时触发列表显示事件
    select(title,value){
      var self = this;
      self.showLoding = true,
      setTimeout(function(){loding();},1000);//这一行会延迟2秒执行
      function loding() {
          //打开选择框,并将列表的值展示出来
          self.selectTitle = title;
          self.selectList = value;
          self.isShowList = true;
          self.showLoding = false;
      }
    },
    selectItem(list,index){//选择单项时分成选监区号、房间号和人员三种情况
      if(this.districtStatus == true){
        let rooms = [];
        let district = "";
        this.districtStatus = false;
        this.roomsStatus = true;  
        this.personsStatus = false;
        district = this.district[index]["CD_CODE"];
        //触发父组件的事件，2代表的是事件2,将监区号传给父组件以查询房间号
        this.$emit("listenToChildEvent",2,district);    
      }else if(this.roomsStatus == true){
        let room = self.thisRoom; //临时存放房间实际ID的变量
        this.districtStatus = false;//设置监区列表状态活跃
        this.roomsStatus = false;  //设置房间列表状态低迷
        this.personsStatus = true;//设置人员列表状态低迷       
        this.thisRoom = list;//将当前房间号的文本赋值给文本框 
        this.thisName = ""; //选完房间号后清空人员姓名，以防和前一次选的人冲突
        this.isShowList = false; //关闭选择列表
        //将所选的房间号真实ID赋值给thisRoomID
        this.thisRoomID = this.rooms[index]["CD_CODE"];
        //触发父组件的事件，3代表的是事件3，将房间号传给父组件以得到人名
        this.$emit("listenToChildEvent",3,this.thisRoomID);
      }else if (this.personsStatus == true){
        this.thisName = list;
        this.isShowList = false;
        let key = this.names[index];
        let value = this.names[index];
        // console.log(value)
        //触发父组件的事件，把房间号和人名传给父组件，如果不是把人员传过去，而是传递人员ID值，则修改上面的name
        this.$emit("listenToChildEvent",1,value );
      }   
    }
  },
  watch:{
    "rooms" : function(value){
      // console.log(value)
      let room = [];
      value.forEach((item)=>{
        room.push(item.CD_CHINA);
      })
      // console.log(value);
      if(room.length != 0){
        this.select("请选择房间号" , room);
      }
    }
  }
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


