<template>
    <div class="info">
        <div class="header">
            <p class="title">
                <span class="backBtn" @click="goResult"></span>
                {{headerTitle}}
            </p>
            <div class="photoBox">
                <div class="photo">
                    <img :src="photos">
                </div>
                <div class="place">
                    <p>{{info.SYS_UNIT}}：</p>
                    <p>{{info.NAME}}</p>
                </div>
            </div>
        </div>
        <ul class="infoList">
            <li >
                <p>姓名</p>
                <p>{{info.NAME}}</p>
            </li>
            <li >
                <p>姓别</p>
                <p>{{info.SEX}}</p>
            </li>
             <li >
                <p>民族</p>
                <p>{{info.NATION}}</p>
            </li>
             <li >
                <p>出生日期</p>
                <p>{{info.BIRTHDAY}}</p>
            </li>
             <li >
                <p>身份证</p>
                <p>{{info.ID}}</p>
            </li>
             <li >
                <p>户籍地</p>
                <p>{{info.RESIDADDR}}</p>
            </li>
             <li >
                <p>现在居住地</p>
                <p>{{info.ADDRESS}}</p>
            </li>
             <li >
                <p>入所时间</p>
                <p>{{info.INDATE}}</p>
            </li>
             <li >
                <p>关押期限</p>
                <p>{{info.ENDDATE}}</p>
            </li>
             <li >
                <p>关押单位</p>
                <p>{{info.SYS_UNIT}}</p>
            </li>
             <li >
                <p>送押单位</p>
                <p>{{info.SENDER}}</p>
            </li>
             <li >
                <p>涉嫌案由</p>
                <p>{{info.CASECLASS}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import store from "../../store";
export default {
    name: "info",
    mounted() {
        this.init()
    },
    watch: {
        '$route' () {
            this.init();
        }
    },
    methods :{
        init () {
            store.commit("updateHeadStatus", this.title == "info");
            // console.log(this.$route.query.sysUnit );
            let url = "/jdbg/fjtzCon/getYdjw";//请求接口
          
            let params = {
                curPage: "1", //当前页  必填 (第二次调用填-1)
                rowperpage: "2", //每页记录数  必填 (第二次调用填-1)
                sysUnit: this.$route.query.sysUnit, //单位代码 440100113
                table: "TBL_A_PSN", //数据库表名 必填
                key:this.$route.query.keyName  //唯一值
            };
            // console.log(params);//打印当前所有值
            // return;
            this.$http.get(url, {params})
                .then(response => {
                    if(response.data.status == 200){
                        console.log(response)
                        let imgUrl ="/jdbg/displayPhoto?pkValue=" + response.data.record[0].P_KEY;
                        // console.log(imgUrl)
                        // 照片模版
                        // var url ="http://192.168.1.16:8000/jdbg/displayPhoto?pkValue=440100113200901181821";
                        this.info = response.data.record[0];
                        this.photos = imgUrl;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        goResult : function(){
            this.$router.go(-1);
        }
    },
    destroyed() {
        store.commit("updateHeadStatus", this.title == "info");
    },
    data() {
     return {
      title: "info",
      headerTitle: "监区提押",
      photos:'',
      info: {
        // photo: "../../static/img/photo1.png",
        // placeTitle: "关押单位",
        // place: "广东省广州市监所公安厅",
        // personInfo: [
        //   {
        //     name: "姓名",
        //     content: "珍豆豆"
        //   },
        //   {
        //     name: "性别",
        //     content: "男"
        //   },
        //   {
        //     name: "民族",
        //     content: "汉"
        //   },
        //   {
        //     name: "出生日期",
        //     content: "1994-03-11"
        //   },
        //   {
        //     name: "身份证",
        //     content: "123456789123456789"
        //   },
        //   {
        //     name: "户籍地",
        //     content: "广东省"
        //   },
        //   {
        //     name: "现在居住地",
        //     content: "中山市"
        //   },
        //   {
        //     name: "入所时间",
        //     content: "2012-09-09"
        //   },
        //   {
        //     name: "关押期限",
        //     content: "3年"
        //   },
        //   {
        //     name: "关押单位",
        //     content: "中山市拘留所"
        //   },
        //   {
        //     name: "送押单位",
        //     content: "三角分局"
        //   },
        //   {
        //     name: "涉嫌案由",
        //     content: "暂无"
        //   }
        // ]
      }
    };
    }
};
</script>
<style lang="less" scoped>
.info {
  height: 100%;
  background-color: #ebebeb;

  margin-top: -0.4rem;
}
.header {
  height: 2 * 7.77344 * 25.6/75rem;
  background: url("../../../static/img/txbjk@2x.png");
  background-size: 100% 100%;
  width: 100%;
  color: rgb(255, 255, 255);
  font-size: 2 * 0.664 * 25.6/75rem;
  text-align: center;
  line-height: 2 * 1.6015625 * 25.6/75rem;
  position: relative;
  .title {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    text-align: center;
    width: 100%;
    background: url("../../../static/img/txbjk@2x.png") repeat;
    background-size: 100%;
    .backBtn {
      display: inline-block;
      width: 2 * 0.390625 * 25.6/75rem;
      height: 2 * 0.7421875 * 25.6/75rem;
      background: url("../../../static/img/icon-fh.png") no-repeat;
      background-size: 100%;
      position: absolute;
      left: 2 * 0.5859 * 25.6/75rem;
      top: 2 * 0.42969 * 25.6/75rem;
      z-index: 12;
    }
  }
  .photoBox {
    width: 100%;
    height: 2 * 4.6875 * 25.6/75rem;
    position: absolute;
    top: 2 * 2.3049 * 25.6/75rem;
    left: 0;
    overflow: hidden;
    display: -webkit-flex;
    // display: flex;
    .photo {
      width: 30%;
      height: 100%;
      margin-left: 2*0.5859*25.6/75rem;
      float: left;
      // flex: 1;
      img {
        max-width: 100%;
        max-width: 100%;
        width: 6.5625 * 25.6/75rem;
        height: 9.375 * 25.6/75rem;
      }
    }
    .place {
      width: 60%;
      float: left;
      // flex: 3;
      margin-top: 1.7308 * 25.6/75rem;
      // margin-left: 2*1.09375*25.6/75rem;
      text-align: left;
      p:nth-child(1) {
        font-size: 2 * 0.546875 * 25.6/75rem;
        line-height: 2 * 0.8984 * 25.6/75rem;
      }
      p:nth-child(2) {
        font-size: 1.25 * 25.6/75rem;
        line-height: 1.953125 * 25.6/75rem;
      }
    }
  }
}
.infoList {
  list-style: none;
  overflow: hidden;
  li {
    width: 100%;
    border-bottom: 0.078125 * 25.6/75rem solid rgb(237, 237, 237);
    background: rgb(255, 255, 255);
    padding: 0.625 * 25.6/75rem 0;
    p {
      text-indent: 1.171875 * 25.6/75rem;
    }
    p:nth-child(2n + 1) {
      line-height: 1.796875 * 25.6/75rem;
      font-size: 1.25 * 25.6/75rem;
      color: rgb(85, 85, 85);
    }
    p:nth-child(2n) {
      line-height: 1.6153846 * 25.6/75rem;
      font-size: 1.076923 * 25.6/75rem;
      color: rgb(119, 119, 119);
    }
  }
}
</style>


