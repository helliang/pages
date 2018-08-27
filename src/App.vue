<template>
  	<div id="app">
		<div class="header" v-if="isShowHeader">
			<!-- <span  v-if="isShowHeader"><router-link class="back" to="/business"></router-link></span>   -->
      <!--<span v-if="isShowback" @click="backForward">back</span>-->
			<span  v-if="isShowback" class="back" @click="backForward"></span> 
       {{headerTitle}}
       <span class="record" v-if="isShowRecord" @click="record">预约记录</span>
		</div>

    	<router-view></router-view>
    	<!-- <ul  class="footer" v-if="isShowFooter">
			<li>
				<router-link to="/home"    class="tabbar__icon tabbar_home tabbar_home1">
					动态信息
				</router-link>
			</li>
			<li>
				<router-link  to="/business"   class="tabbar__business tabbar__icon tabbar__business1">
					业务处理
				</router-link>
			</li>
			<li>
				<router-link  to="/setting"    class="tabbar__setting tabbar__icon tabbar__setting1">
					设置
				</router-link>
			</li>
		</ul> -->
	</div>
</template>


<script>
import { mapState } from "vuex";
import home from "../src/components/home";

export default {
  name: "App",
  data() {
    return {

    };
  },
  methods: {
    backForward(){
      this.$router.go(-1)
    },
    record(){
      this.$router.replace({name:'record'})
    }
  },
  computed: {
    ...mapState({
      isShowback: state => state.$vux.btnStatus,
      headerTitle: state => state.$vux.headerTitle,
      isShowFooter: state => state.$vux.isShowFooter,
      isShowHeader: state => state.$vux.isShowHeader,
      isShowRecord: state => state.$vux.isShowRecord,
    })
  }
};
</script>

<style>
body,html{
  background-color: #ebebeb;
  overflow: visible !important; 
   height: auto !important;
}
#app {
  width: 100vw;
  background-color: #ebebeb;
  margin-top: 1.066667rem;
  /* height: calc(100vh - 1.066667rem);
  height: -webkit-calc(100vh -  1.066667rem); */
}
.header {
  height:1.066667rem;
  width: 100%;
  background-color: #0076da;
  color: #ffffff;
  font-size:.453333rem;
  text-align: center;
  line-height:1.066667rem;
  position: fixed;
  top: 0;
  z-index:100;
}
.footer {
  width: 100%;
  border-top: 1px solid #ccc;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  /* display: -webkit-flex;
  display: flex; */
}
.footer li {
  width: 33.3333333%;
  float: left;
  /* flex: 1; */
  text-align: center;
}

.footer li {
  flex: 1;
  height: 1.333333rem;
  text-align: center;
  display: flex;
}
.footer li a {
  width: 100%;
  height:1.333333rem;
  display: block;
  line-height:2rem;
  font-size:.293333rem;
  color: rgb(102, 102, 102);
  align-items: center;
}
.tabbar_home {
  background: url("../static/img/icon-xx-h@2x.png") no-repeat;
  background-size: .626667rem .533333rem;
}
.tabbar__business {
  background: url("../static/img/icon-bl-h@2x.png") no-repeat;
  background-size: .613333rem .533333rem;
}
.tabbar__setting {
  background: url("../static/img/icon-sz-h@2x.png") no-repeat;
  background-size: .546667rem .533333rem;
}
.tabbar__icon {
  margin: 0 auto;
  /* background-size: 50%; */
  background-position: 50% 21%;
}

.footer li a.on {
  color: rgb(0, 118, 218);
}
.router-link-exact-active.tabbar_home1 {
  background: url("../static/img/icon-xx@2x.png") no-repeat;
  background-position: 50% 21%;
  background-size: .626667rem .533333rem;
}
.router-link-exact-active.tabbar__business1 {
  background: url("../static/img/icon-bl@2x.png") no-repeat;
  background-position: 50% 21%;
  background-size: .613333rem .533333rem;
}
.router-link-exact-active.tabbar__setting1 {
  background: url("../static/img/icon-sz@2x.png") no-repeat;
  background-position: 50% 21%;
  background-size: .546667rem .533333rem;
}
.back {
  display: inline-block;
  width: 0.266667rem;
  height: 0.506667rem;
  background: url("../static/img/icon-fh.png") no-repeat;
  background-size: 100%;
  position: absolute;
  left: 0.293333rem;
  top: 0.293333rem;

  z-index: 11;
}
.record{
  position: absolute;
  right: .4rem;
  color:rgb(235, 235, 235);
}
</style>
