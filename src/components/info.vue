/*
 * @Author: carrie
 * @Date: 2018-05-22 14:26:37
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-17 12:18:24
 */
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
                    <p>{{info.SYS_UNIT}}:</p>
                    <p>{{info.NAME}}</p>
                </div>
            </div>
        </div>
        <ul class="infoList">
           <!-- _html -->
        </ul>
    </div>
</template>
<script>
import store from "../store";
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
          
            let params = {
                // curPage: "1", //当前页  必填 (第二次调用填-1)
                // rowperpage: "2", //每页记录数  必填 (第二次调用填-1)
                // sysUnit: this.$route.query.sysUnit, //单位代码 440100113
               // "SYS_UNIT":"44",
                type:3,
                changeCode:true,//是否把code代码翻译
                P_KEY:this.$route.query.keyName
            };
            
            console.log(params);//打印当前所有值
            // return;
            this.$http.get(this.apis.baseURL, {params})
                .then(response => {
                    console.log(response)
                    if(response.data.status == 200){
                        let _html="";
                      
                            let columnname  =eval("("+response.data.columnname+")");
                            let column  =eval("("+response.data.column+")");
                                console.log(response.data.record[0]);
                       for(var i=0;i<column.length;i++){
                           let value = column[i];
                             _html +=  `<li style=" width: 100%;
                                            border-bottom: 1px solid rgb(237, 237, 237);
                                            background: rgb(255, 255, 255);
                                            padding: 0.214rem 0;">
                                            <p style="text-indent: 0.4rem;
                                                line-height: 0.614rem;
                                                font-size: 0.427rem;
                                                color: rgb(85, 85, 85);">`
                                                + columnname[i]+
                                            `</p>
                                            <p style=" text-indent: 0.4rem;
                                                line-height: 0.551rem;
                                                font-size: 0.368rem;
                                                color: rgb(119, 119, 119);">`
                                                + response.data.record[0][value] +
                                            `</p>
                                         </li>`;
                        }
                            $(".infoList").empty();
                            $(".infoList").append(_html);
                            // $(".infoList").listview(_html); 
                            // $(".infoList").trigger(_html); 

                        // console.log(response)
                        // let imgUrl ="/apis/jdbg/displayPhoto?pkValue=" + response.data.record[0].P_KEY;
                        // console.log(imgUrl)
                        // 照片模版
                        // var imgUrl ="http://192.168.1.10:8010/res072501/jdbg/displayPhoto?pkValue="+ response.data.record[0].P_KEY;
                        // var imgUrl =this.apis.photoURL+'?pkValue='+response.data.record[0].P_KEY;
                        // 省厅接口
                        var imgUrl =this.apis.photoURL+'?pkValue='+response.data.record[0].P_KEY;
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
            this.$router.replace('/menu')
        },
        
    },
    destroyed() {
        store.commit("updateHeadStatus", this.title == "info");
    },
    data() {
     return {
      title: "info",
      headerTitle: "人员基本信息",
      photos:'',
      info: {
        
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
  background: url("../../static/img/txbjk@2x.png");
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
    background: url("../../static/img/txbjk@2x.png") repeat;
    background-size: 100%;
    .backBtn {
      display: inline-block;
      width: 2 * 0.390625 * 25.6/75rem;
      height: 2 * 0.7421875 * 25.6/75rem;
      background: url("../../static/img/icon-fh.png") no-repeat;
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
  li.info-container {
    width: 100%;
    border-bottom: 0.078125 * 25.6/75rem solid rgb(237, 237, 237);
    background: rgb(255, 255, 255);
    padding: 0.625 * 25.6/75rem 0;
    p {
      text-indent: 1.171875 * 25.6/75rem;
    }
    .title {
      line-height: 1.796875 * 25.6/75rem;
      font-size: 1.25 * 25.6/75rem;
      color: rgb(85, 85, 85);
    }
    .title-content {
      line-height: 1.6153846 * 25.6/75rem;
      font-size: 1.076923 * 25.6/75rem;
      color: rgb(119, 119, 119);
    }
  }
}

</style>


