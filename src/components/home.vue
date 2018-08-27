/*
 * @Author: carrie
 * @Date: 2018-05-22 14:26:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-03 09:00:55
 */
<template>
  <div class="home">
    <div class="container">
      <ul>
        <li v-for="info in infoState" :key="info.id" class="info">
          <span class="imgUrl">
            <img v-bind:src="info.src" alt="">
            <span class="weui-badge infoNmu">{{info.nmu}}</span>
            <!-- <wv-badge class="infoNmu">{{info.nmu}}</wv-badge> -->
          </span>
          <div class="personInfo">
            <p class="titleInfo">{{info.titleInfo}}</p>
            <p class="infoName">{{info.name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    name: "home",
    data() {
        return {
            infoState: [
                {
                    src: require("../assets/img/icon-rsd@2x.png"),
                    titleInfo: "入所",
                    name: "张三、李四",
                    nmu: 10
                }
                // {
                //   src:'../../static/img/icon-cs@2x.png',
                //   titleInfo:'入所',
                //   name:'张三、李四',
                //    nmu:8
                // }
            ],
            // 注入进来的用户
            user: [],
            userid: [],
            unit: []
        };
    },
    // 页面一加载的时候获取点进来的身份证
    mounted() {
      console.log(this.$store)
        let self = this;
        // 获取出入境模拟出来的假json
        this.$http.get("/static/json/userData.json")
          .then(function(data) {
              data.data.forEach(element => {
                  self.user.push(element.user);
                  self.userid.push(element.userid);
                  self.unit.push(element.unit);
              });
        }).catch( error =>console.log( error))
        // 获取出入境请求后返回给后台
        let params = {
            user: self.user,
            userid: self.userid,
            unit: self.unit
        };
      self.$http.get(this.apis.baseURL,{params})
        .then(function(data){
            let datas = data;
          if(datas.data.record!=null){
              // 请求回来的数据放入vuex
              // console.log(datas.data.record)
              self.$store.commit("updateUserData",{isuserData:datas})
          }else{
            console.log('record中没有用户数据')
          }
        }).catch(error => console.log(error,"status状态非200"))
    }
};
</script>
 <style lang="less" scoped>
body {
    background-color: #ebebeb;
}
.container {
    padding-top: 0.133333rem;
}

.info {
    display: -webkit-flex;
    // display: flex;
    padding: 0.266667rem;
    background-color: #ffffff;
    margin-top: 0.266667rem;
    .imgUrl {
        position: relative;
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        background-color: #50d6f8;
        margin-right: 0.266667rem;
        // flex: 1;
        // margin:.32rem .266667rem .266667rem .4rem;
        img {
            width: 100%;
        }
    }
    .personInfo {
        display: inline-block;
        .titleInfo {
            color: #333333;
            font-size: 0.453333rem;
            font-family: "pingFang-SC-Medium";
        }
    }
    .infoNmu {
        position: absolute;
        top: -0.133333rem;
        right: -0.066667rem;
        font-size: 0.213333rem;
        
    }
    .infoName {
        color: rgb(153, 153, 153);
        font-size: 0.346667rem;
    }
}
</style>


