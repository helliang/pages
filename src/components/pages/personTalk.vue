/*
 * @Author: CARRIE
 * @Date: 2018-06-07 11:45:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-02 14:48:39
 */
<template>
    <div id="personTalk">
        <choosePerson :rooms="rooms" :names="names" :district="district" @listenToChildEvent="chooseName" ></choosePerson>
        <commonChange :list="list" :leftName="leftName"></commonChange>
        <ul class="list">
          <li>
            <span class="title">谈话类型</span>
            <input class="type" type="text" id="type" readonly="readonly" placeholder="请选择">
          </li>
          <li>
            <span class="title">开始谈话</span>
            <div class="switchBox">
              <span class="time" v-if="isShowStart">{{startTime}}</span>
              <div class="switch" @click="switchStart">
                <span class="control on" v-if="isStartControlShow"></span>
                <span class="control off" v-else></span>
              </div>
            </div>
          </li>
          <li>
            
            <div class="record">
            <span class="title">录音</span>
              <span class="recordBtn" >
                <input type="file" id="recordFile" class="startRecord" accept="audio/*" capture="microphone" single @change="readFile">
              </span>    
              <!-- <div class="process">
                <span class="processControl"></span>
              </div> -->
              <span class="recordTime">{{recordFile}}</span>
            </div>
          </li>
          <li>
            <span class="title">结束谈话</span>
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
import commonChange from "../common/commonChange";
import choosePerson from "../common/choosePerson";
import store from "../../store";
export default {
  name: "personTalk",
  components: {
    commonChange,choosePerson
  },
  data() {
    return {     
      list: [
              "","","","","",""
            ],
      leftName: ["姓名", "性别", "入所时间", "涉嫌罪名", "房间号","户籍所在地"],
      isShowStart : false,//是否显示开始时间
      isStartControlShow : false,//切换开始按钮状态
      startTime : "",//开始时间
      isShowEnd : false,//是否显示结束时间
      isEndControlShow : false,//切换结束按钮状态
      endTime : "",//结束时间
     // recordStatus : false,//录音状态
      recordFile : "读取录音",//录音文件路径
      rooms : [],//传给子组件的房间号
      district : [],//穿给子组件的监区号
      names :[],
      type:[]//谈话类型
    };
  },
  methods: {
    //选完人名触发的事件
    chooseName(type,value){
     if(type == 1){
        //选择人员后触发的事件
        // console.log(value);
        this.list = [
          value.NAME,
          value.SEX,
          value.INDATE,
          value.CASECLASS,
          value.ROOM_NO,
          value.NATIVE_PLACE
        ]
      }else if(type == 2){
        this.goRooms(value);
        //这是我模拟请求改变了rooms
        //console.log(value);
        // this.rooms =  [
        //   {"CD_CHINA": "A区01","CD_CODE": "0101"},
        //   {"CD_CHINA": "A区02","CD_CODE": "0102"},
        //   {"CD_CHINA": "A区03","CD_CODE": "0103"},
        // ];
      }else if(type == 3){
         this.goNames(value)
         //这是我模拟请求改变了names
        //console.log(value);
        // this.names = [
        //     {"NAME" : "周坤利","ROOM_NO" : "0101"},
        //     {"NAME" : "静安寺","ROOM_NO" : "0101"},
        //     {"NAME" : "阿斯顿","ROOM_NO" : "0102"}
        // ];
      }
    },
    addRooms(value){//新增函数，提取出房间号和监区的数据
      let self = this;
      self.rooms = [];
      let unit = "440100113";
        let params = {//监区
            "SYS_UNIT":"440100113",
            "type":1,
            "LENGTH_CD_CODE":2,//CD_CODE.length 监区2位数 ，监室4位数  例如：监区号：01 A监区，监室号：0101 A监区01号监室
            "CD_CODE":value,
            currentPage:-1, //当前页,
            pageSize:-1, //页显示数据量


            // cupage: "-1", //当前页  必填 (查所有值调用填-1)
            // rowperpage: "-1", //每页记录数  必填 (查所有值调用填-1)
            // tableZd:"CD_CODE,CD_CHINA",//请求哪一列的数据 
            // type:2,
            // table:"c_room",
            // CD_CODE:0,
            // where:'CD_CODE,SYS_UNIT',
            // whereVals:0+','+'440100113',
            // whereFh:'=,='
            };
           
      //提取监区的数据
      self.$http.get("/apis",{params})
      .then(res=>{
        if(res.data.status == 200){
          // console.log("-----已加载成功----------")
          let data = res.data;
            data.record.forEach((item,i) => {
            self.district.push(item);
        })
        }else{
          // console.log(".......正在请求.......")
        }
      });
    },
    goRooms(value){
      var self = this;
      let params = {//房间号
          "SYS_UNIT":"440100113",
					"type":1,
					"LENGTH_CD_CODE":4,//CD_CODE.length 监区2位数 ，监室4位数  例如：监区号：01 A监区，监室号：0101 A监区01号监室
 					"CD_CODE":value,
					currentPage:-1, //当前页,
          pageSize:-1, //页显示数据量




            // cupage: "-1", //当前页  必填 (查所有值调用填-1)
            // rowperpage: "-1", //每页记录数  必填 (查所有值调用填-1)
            // tableZd:"CD_CODE,CD_CHINA",//请求哪一列的数据 
            // type:2,
            // table:"c_room",
            // CD_CODE:value,//我只那个监区的ID在这里,在这里就可以,而且你的那个死数据是不能在活的下面用的呀; 
            // where:'CD_CODE,SYS_UNIT',
            // whereVals:value+','+'440100113',
            // whereFh:'=,='
            };
          self.$http.get("/apis",{params}).then(res=>{
            if(res.data.status == 200){
              console.log(res)
              let data = res.data;
              self.rooms = [];
              data.record.forEach((item,i) => {
                  self.rooms.push(item);
              })     
            }
          });
    },
     // 获取名字
    goNames(value){
      var self = this;
      let params = {//房间号
          "SYS_UNIT":"440100113",
          "type":11,
          changeCode:true,//是否把code代码翻译
          currentPage:1, //当前页,
          pageSize:10, //页显示数据量
          ROOM_NO:value,
					currentPage:-1, //当前页,
          pageSize:-1, //页显示数据量










            // cupage: "-1", //当前页  必填 (查所有值调用填-1)
            // rowperpage: "-1", //每页记录数  必填 (查所有值调用填-1)
            // tableZd:"P_KEY,T_STATUS,NAME,ID,OUTDATE,SYS_UNIT,BIRTHDAY,ROOM_NO,SEX,NATION,RESIDADDR,ADDRESSALL,ADDRESS,INDATE,ENDDATE,SENDER,CASECLASS,NATIVE_PLACE",//请求哪一列的数据 
            // type:0,
            // table:"tbl_psn",
            // CD_CODE:value,
            // where:'ROOM_NO,SYS_UNIT',
            // whereVals:value+','+'440100113',
            // whereFh:'=,=',
            // sysUnit:440100113
            };
          self.$http.get("/apis",{params}).then(res=>{
            if(res.data.status == 200){
                let data = res.data;
                data.record.forEach((item,i) => {
                    self.names.push(item);
                })     
            }
      });
    },
    dialogueType(){//谈话类型
        let self = this
        let params = {
          // cupage: '-1', //当前页  必填 (查所有值调用填-1)
          // rowperpage: '-1', //每页记录数  必填 (查所有值调用填-1)
          // tableZd: 'CD_CODE,CD_CHINA', //请求哪一列的数据
          // table: 'C_TALKEDU',
          // type: 2
          type:6
        }
        this.$http
          .get("/apis", { params }) // 请求成功返回参数
          .then(function(data) {
            if(data.data.status == 200){
                var value = data.data.record
                // console.log(value)
                value.forEach(function(item, i) {
                  self.type.push({
                    title: item.CD_CHINA,
                    value: item.CD_CODE
                  })
                });
                //  请求成功把数据放入弹框
                $("#type").select({
                  title : "请选择谈话类型",
                  // items : ["一般谈话","快速谈话","律师谈话"]
                  items : self.type
                });
            }
         }).catch(error => console.log(error))
    },
    switchStart(){//切换开始按钮的状态
        if(this.isStartControlShow == false){
            this.isShowStart = true;
            this.startTime = this.getTime();//记录时间
        }
        this.isStartControlShow = !this.isStartControlShow;
    },
    switchEnd(){//切换结束按钮的状态
        if(this.isEndControlShow == false){
            this.isShowEnd = true;
            this.endTime = this.getTime();
        }
        this.isEndControlShow = !this.isEndControlShow;
    },
    readFile(e){
      // this.recordFile = $("#recordFile").val();
      this.recordFile = "录音成功";
      // var record =$("#recordFile").val();
      // this.$router.replace('/record')
      // alert($("#recordFile").val())
      console.log('录音文件路径 ------>'+ $("#recordFile").val())
      // 转数据流
      /*
        File对象：负责处理那些以文件形式存在的二进制数据，也就是操作本地文件；
        FileList对象：File对象的网页表单接口；
        FileReader对象：负责将二进制数据读入内存内容；
        URL对象：用于对二进制数据生成URL
      */ 
      var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
          return;
          this.createImage(files[0]);
          },
        createImage(file) {
          // var image = new Image();
          var reader = new FileReader();//用于读取文件，即把文件内容读入内存
          var vm = this;

          reader.onload = (e) => {//读取成功后触发。
              console.log(e)
            vm.reader = e.target.result;
            // console.log(vm.reader)
          };
            reader.readAsDataURL(file);
            // console.log(reader)
          // FileReader.readAsDataURL(Blob|File) ： 读取结果是一个基于Base64编码的 data-uri 对象。
          // console.log(store)
    },
    getTime (){
      let period = "";
      let date = new Date();
      let hour = date.getHours();
      let min = date.getMinutes();
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      if(hour < 12){
          period = "上午";
      }else if(hour < 2){
          period = "中午";
      }else{
          period = "下午";
      }
      return (period + " " + hour + ":" + min);
    }
  },
  created(){
    
  },
  mounted(){
    var self = this;
    this.addRooms();
    // 谈话类型
    this.dialogueType();
    
    // 提交事件
    
    $("#personTalk").on('click', '.submit', function() {
      $.toast('提交成功', function() {
          console.log("已点提交 ")
      })
    })

  }
};
</script>
<style lang="less" scoped>
#personTalk {
  margin-top: -.4rem;
  .list{
      width: 100%;
      background-color: #fff;
      margin-top: .4rem;
      li{
        padding: 0 5%;
        width: 100%;
        overflow: hidden;
        border-bottom: 1px solid #ebebeb;
        .title{
          float: left;
          display: block;
          //width: 2.2rem;
          width: 25%;
          font-size: 0.373333rem;
          text-indent: .693333rem;
          line-height: 1.2rem;
        }
        .type{
          float: left;
          line-height: 1.2rem;
          padding-left: 2%;
          //width: calc(100% - 2.6rem);
          width: 75%;
          font-size: 0.426667rem;
        }
        .switchBox{
          float: right;
          height: 0.826667rem;
          line-height: 0.826667rem;
          overflow: hidden;
          margin: 0.1866665rem 0;
          .time{
            float: left;
            font-size: 0.426667rem;
            margin-right: .266667rem;
            color: #5C5C5C;
          }
          .switch{
              width: 1.36rem;
              height: 0.826667rem;
              background: url(../../assets/img/yuanjiaojux679@2x.png);
              background-size: 100% 100%;
              float: left;
              position: relative;
              .control{
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 0.6rem;
                position: absolute;              
                top: .12rem;
              }
              .off{
                background-color: #999999;
                box-shadow: 0px 0px 10px #666666;
                left: .1rem; 
              }
              .on{
                background-color: #0076da;
                box-shadow: 0px 0px 10px #008cda;
                right: .1rem;
              }
          }
        }
        .record{
          width: 100%;
          height: 1.173333rem;
          float: left;
          overflow: hidden;
          .recordBtn{
            display: block;
            width: 0.826667rem;
            height: 0.826667rem;
            float: right;
            margin-left: .7rem;  
          margin-top: .173333rem;
            background: url(../../assets/img/zanting@2x.png);
            background-size: 100% 100%;
          }
          // .recordBtn[data-on=true]{
          //   background: url(../../assets/img/zantingbf2@2x.png);
          //   background-size: 100% 100%;
          // }
          .audio{
            display: block;
            height: 0.826667rem;
            width: calc(100% - 1.6rem);
            float: left;
            background: #0076da;
          }
          // .process{
          //   width: calc(100% - 4.45rem);
          //   height: 0.426667rem;
          //   margin: .2rem 0 0 0.56rem;
          //   float: left;
          //   position: relative;
          //   background: url(../../assets/img/bofangtiao@2x.png) center center no-repeat;
          //   background-size: 100% 0.08rem;
          //   // .processControl{
          //   //   display: block;
          //   //   width: 0.426667rem;
          //   //   height: 0.426667rem;
          //   //   position: absolute;
          //   //   top: 0;
          //   //   left: 0;
          //   //   background: url(../../assets/img/bofangtiao4@2x.png);
          //   //   background-size: 100% 100%;
          //   // }
          // }
          .recordTime{
            width: 55%;
            line-height: 0.826667rem;
            font-size: 0.426667rem;
            text-align: center;
            color: #5C5C5C;
            float: left;
            // margin-left: 0.56rem;
            margin-top: .173333rem;
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
          }
        }
      }  
      li:nth-child(1){     
        .title{
          background: url(../../assets/img/tanhuahh@2x.png) left .43rem no-repeat;
          background-size: 0.426667rem 0.426667rem;
        }
        .type{
          background: url(../../assets/img/icon-fhsj@2x.png) right center no-repeat;
          background-size: 0.266667rem 0.506667rem;
        }
      }
      li:nth-child(2){
        .title{
          background: url(../../assets/img/kaisheluying@2x.png) left center no-repeat;
          background-size: 0.426667rem 0.426667rem;        
        }
      }
      li:nth-child(3){
        .title{
          background: url(../../assets/img/luying@2x.png) left center no-repeat;
          background-size: 0.426667rem 0.426667rem;        
        }
      } 
      li:nth-child(4){
        .title{
          background: url(../../assets/img/jieshutanhua@2x.png) left center no-repeat;
          background-size: 0.426667rem 0.426667rem;        
        }
      } 
      .startRecord{
        display: block;
        opacity: 0;
        width: 0.826667rem;
        height: 0.826667rem;
        float: left;
      }    
  }
  .submit {
    width: 90%;
    display: block;
    margin: 0 auto;
    padding: .386667rem 0;
    font-size: .453333rem;
    background-color: #0076da;
    color: #fff;
    text-align: center;
    outline: none;
    border: 0;
    border-radius: .133333rem;
    margin-top: 1.173333rem;
    margin-bottom: .4rem;
  }
}
</style>


