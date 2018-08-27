<template>
<div id="approveReult">
  <!-- <div class="approveContent"> -->
  <form class="approveContent" v-on:submit.prevent="onSubmit">
    <commonChange :list="list" :leftName="leftName"></commonChange>
    <!-- 录音 -->
    <div class="approveBg">
      <div class="recordBox">
        <div class="record clearfix">
          <span class="records"></span>
          <span class="play"></span>
        </div>
      </div>
    </div>
    <!-- 审核内容 -->
    <div class="approveContainer">
      <div class="approveOpinion">
        <span class="opinion-title">审核意见:</span>
        <input type="submit" name="" value="" v-model="consent" :class="[btnBase,{ active:isConsent}]" @click="isDisagree = false;isConsent = true;goConsent()">
        <input type="submit" name="" value="" v-model="disagree" :class="[btnBase,{ active:isDisagree}]" @click="isConsent = false;isDisagree = true;goDisagree()" >
      </div>
      <!-- 批示 -->
      <div class="clearfix">
        <p class="text-title">批示:</p>
        <textarea rows="5" cols="" class="approve-content" v-model="approveContent"></textarea>
        <div class="approve-area">
          <p class="text-title">审批人:</p>
          <label><input type="text" name="name" v-model="approveName" placeholder="张三" autocomplete="off"></label>
          <p class="text-title">审批时间:</p>
          <label><input type="text" name="time" v-model="approveTime" placeholder="2018-6-25" data-toggle='date' id="my-input"></label>
        </div>
      </div>
    </div>
    <button class="submit" @click="onSubmit">提交</button>
  </form>
  <!-- </div> -->
</div>
</template>
<script>
// 引入子组件
import commonChange from '../../common/commonChange'
export default {
  components: {
    commonChange
  },
  data() {
    return {
      list: [
        //  "","","","","",""
        '',
        '',
        '',
        '',
        '',
        ''
      ],
      leftName: [
        '姓名',
        '性别',
        '入所时间',
        '涉嫌罪名',
        '房间号',
        '户籍所在地'
      ],
      approveContent: '', //批示内容
      approveName: '',
      approveTime: '',
      consent: "同意",
      disagree: "不同意",
      btnBase: "btnBase", //按钮的基本色
      isDisagree: true, //按钮的背景色
      isConsent: false,
      opinionReult:'',//用户选择审批结果
    }
  },
  methods: {
    onSubmit() {

      $("#approveReult").on('click', '.submit', function() {
        $.toast('提交成功', function() {
          console.log('已点提交 ')
        })
      })
    },
    goConsent(){//同意
      var self = this;
      if(self.isConsent == true){
        this.opinionReult = self.consent
      }else{
          return false;
      }
    },
    goDisagree(){//不同意
      var self = this;
      if(self.isDisagree == true){
        // console.log(self.disagree)
        this.opinionReult = self.disagree
      }else{
          return false;
      }
    }
  },
  mounted() {

    $('#my-input').calendar({
      // 日期格式
      dateFormat: 'yyyy-mm-dd'
    })

  }
}
</script>
<style lang="less" scoped>
#approveReult {
  height: 100%;
  margin-top: -0.4rem;
}

.approveContent {
  padding-top: 0.4rem;
  background-color: white;
  padding-bottom: 1.866667rem;
}
.approveBg{
  width: 100%;
  height: 100%;
  background-color: #EBEBEB;
}
.recordBox {
  width: 100%;
  background-color: white;
  border-top: 1px solid #ccc;
}

.record {
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding-top: 0.133333rem;
  padding-bottom: 0.133333rem;
  margin-bottom: 0.4rem;
  .records {
    flex: 1;
    font-size: 0.373333rem;
    background: url("../../../assets/img/luying@2x.png") no-repeat;
    width: 0.426667rem; // height:.426667rem;
    background-size: 6%;
  }
  .records::after {
    content: "录音";
    padding-left: 0.8rem;
  }
  .play {
    width: 0.826667rem;
    height: 0.826667rem; // flex:1;
    background: url("../../../assets/img/zanting@2x.png") no-repeat;
    background-size: 90%;
  }
}

// 审核意见
.approveContainer {
  width: 90%;
  margin: 0 auto;
}

.approveOpinion {
  display: flex;
  padding-top: .4rem;
}

.opinion-title {
  flex: 1;
  font-size: .426667rem;
  color: rgb(51, 51, 51);
}

.btnBase {
  // 按钮的边框色
  flex: 1;
  width: 3.146667rem;
  height: .88rem;
  text-align: center;
  color: rgb(0, 118, 218);
  border: 1px solid rgb(0, 118, 218);
  background-color: #fff;
  border-radius: .133333rem;
  margin: 0 .266667rem;
  outline: none;
}

.active {
  // 需要变动的颜色
  background: rgb(0, 118, 218);
  color: white;
}

.text-title {
  font-size: 0.426667rem;
  text-align: left;
  color: rgb(51, 51, 51);
  margin: 0.533333rem 0 0.266667rem 0;
}

.approve-content {
  width: 100%;
  border: 2px solid rgb(153, 153, 153);
  border-radius: 0.133333rem;
  padding: 0.4rem;
  color: rgb(102, 102, 102);
  font-size: 0.373333rem;
  text-align: left;
}

.approve-area input[type="text"] {
  width: 100%;
  color: rgb(102, 102, 102);
  font-size: 0.373333rem;
  border-bottom: 1px solid rgb(153, 153, 153);
  padding-bottom: 0.4rem;
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


