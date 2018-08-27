<template>
    <div id="district">
        <div class="weui-tab">
		  <div class="weui-navbar">
		    <a class="weui-navbar__item weui-bar__item--on" href="#put">
		      待提出
		    </a>
		    <a class="weui-navbar__item" href="#bring">
		      待提回
		    </a>
		    <a class="weui-navbar__item" href="#all">
		      全部
		    </a>
		  </div>
		  <div class="weui-tab__bd tabBox">
		    <div id="put" class="weui-tab__bd-item weui-tab__bd-item--active">
		      	<put 
		      	:list="putContent" 
		      	:listType="putType" 
		      	:listTitle="putTitle"
		      	@listenToChildEvent="putPerson"
		      	></put>
		    </div>
		    <div id="bring" class="weui-tab__bd-item">
		      	<put 
		      	:list="waitContent" 
		      	:listType="waitType" 
		      	:listTitle="waitTitle"
		      	@listenToChildEvent="putPerson"
		      	></put>
		    </div>
		    <div id="all" class="weui-tab__bd-item">
		      	<allPut 
		      	:list="allContent" 
		      	:listType="allType" 
		      	:listTitle="allTitle"
		      	@listenToChildEvent="goPutinfo"
		      	></allPut>
		    </div>
		  </div>
		</div>
    </div>
</template>
<script>
import put from "../common/put"
import allPut from "../common/allPut"
export default {
    name:'district',
    components:{
    	put,allPut
    },
    methods: {
        putPerson (index){
           $.confirm("是否进行提人", function() {
    		      $.toast("提人成功");
    		   }, function() {
    		      
    		   });
        },
        goPutinfo(index){
        	console.log(index);
          this.$router.push({path: "/putInfo"});
        }
    },
    data(){
        return{
             nav :["待提出","待提回","全部"],        
             putTitle :["姓名：","监室号：","提讯室："],
             waitTitle :["姓名：","监室号：","提讯室：","提出时间："],
             allTitle :["姓名：","监室号：","提讯室：","提出时间：","提回时间"],
             putType:[],
             waitType:[],
             allType :[],            
             putContent:[],
             waitContent:[],
             allContent:[],
             putRecord:[
             	{
             		type : "律师会见",
             		name : "珍豆豆",
             		num : "101",
             		room : "5023室",
             		outTime : "2015-11-20",
             		backTime : "2015-11-20",
             	},
             	{
             		type : "提讯",
             		name : "珍豆豆",
             		num : "101",
             		room : "5023室",
             		outTime : "2015-11-20",
             		backTime : "2015-11-20",
             	},
             	{
             		type : "家属会见",
             		name : "珍豆豆",
             		num : "101",
             		room : "5023室",
             		outTime : "2015-11-20",
             		backTime : "2015-11-20",
             	},
             ]        
        }
    },
    mounted (){
    	var self = this;
    	this.putRecord.forEach((item) => {
            self.putType.push(item.type);
            self.waitType.push("提讯：");
            self.allType.push(item.type);
            self.putContent.push([item.name,item.num,item.room]);
            self.waitContent.push([item.name,item.num,item.room,item.outTime]);
            self.allContent.push([item.name,item.num,item.room,item.outTime,item.backTime]);
        })
    }
}
</script>
<style lang="less" scoped>
#district{
  margin-top: -0.42rem;
  .weui-navbar{
    position: fixed;
    top: 1.066667rem;
  }
  .weui-navbar__item{
  	font-size: 0.4266667rem;
  	background: white;
  	color: rgb(51,51,51);
  }
  .weui-navbar__item.weui-bar__item--on{
	  color: #0076da;	
  }
  .weui-navbar__item.weui-bar__item--on::before{
  	content: "";
  	display: block;
  	width: 1.733334rem;
  	height: 0.053333rem;
  	background-color: #0076da;
	  position: absolute;
	  bottom: 0;
	  left: 50%;
	  margin-left: -0.866667rem;
  }
  .weui-navbar__item:after{
  	border: none;
  }
  .weui-tab__bd-item{margin-top: .4rem;}
}

</style>


