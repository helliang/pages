<template>
	<div id="district">
		<div class="weui-tab">
			<div class="weui-navbar">
				<a class="weui-navbar__item weui-bar__item--on" href="#put">
					待提出
				</a>
				<a class="weui-navbar__item" href="#bring" @click="waitBack">
					待提回
				</a>
				<a class="weui-navbar__item" href="#all" @click="allInfo">
					全部
				</a>
			</div>
			<div class="weui-tab__bd tabBox">
				<div id="put" class="weui-tab__bd-item weui-tab__bd-item--active" >
					<put :list="putContent" :listType="putType" :listTitle="putTitle" @listenToChildEvent="putPerson"></put>
				</div>
            </div>
				<div id="bring" class="weui-tab__bd-item">
					<put :list="waitContent" :listType="waitType" :listTitle="waitTitle" @listenToChildEvent="waitPerson"></put>
				</div>
				<div id="all" class="weui-tab__bd-item">
					<allPut :list="allContent" :listType="allType" :listTitle="allTitle" @listenToChildEvent="goPutinfo"></allPut>
				</div>
			</div>
         <div class="loding" v-show="showLoding">
            <div   class="weui-loadmore ">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
		</div>
	</div>
</template>
<script>
import put from "../common/put";
import allPut from "../common/allPut";
export default {
    name: "district",
    components: {
        put,
        allPut
    },

    data() {
        return {
            nav: ["待提出", "待提回", "全部"],
            //  putTitle :["姓名：","监室号：","会见室："],
            putTitle: "",
            // waitTitle: ["姓名：", "监室号：", "提讯室：", "提出时间："],
            waitTitle: '',
            // allTitle: [
            //     "姓名：",
            //     "监室号：",
            //     "提讯室：",
            //     "提出时间：",
            //     "提回时间"
            // ],
            allTitle:'',
            putType: [],//待提出类型
            waitType: [],//待提回类型
            allType: [],//全部类型
            putContent: [],//待提出内容
            waitContent: [],//待提回内容
            allContent: [],//全部内容
            pkey: [],//三个页面的key值都在这个数组里
            ID: [],
            showLoding:true,//没数据的情况下为true
        };
    },
    mounted() {
        var self = this;
        this.newData();
    },

    methods: {
        putPerson(index) { //待提出页面中的点击提出按钮
            var self = this;
            let ID = this.ID[index]; //获取当前人员的对应的ID值传入后台
            $.confirm(
                "是否进行提人",
                function() {
                    let params = {
                        type: "0107",
                        pKey: ID //ID为当前所点击时提讯数据的ID值
                    };
                    // console.log(params.pKey)
                    self.$http.get("/apis", {params}).then(data => {
                        console.log(data)
                        if (data.data.info > 0) {//如果后台返回info为1就是成功
                            self.putContent.splice(index, 1);
                            $.toast("提人成功");
                        } else {
                            console.log("请求数据有误");
                        }
                    });
                },
                function() {
                    return false;
                }
            );
        },
        waitBack(){//页面待提回的title切换按钮
            var self = this;
			let params= {
					type: 13,
					SYS_UNIT: "440100113"
				}
			self.$http.get('/apis',{params})
				.then( data => {//请求回来的数据放入待提回页面
					if(data.data.status == 200){
                        self.showLoding = false;
                        // console.log(data)
						var item = data.data;
                        self.pkey =[];
					    self.ID = [];
					    self.waitType = [];
                        self.waitContent = []
                         // 把每一列的title赋给puttitle如:姓名监室号
                        self.waitTitle = eval("(" + item.columnname + ")");
                        // title对应的参数名
                        let Attribute = eval("(" + item.column + ")");
                        // console.log(Attribute)
                         item.record.forEach(item => {
                                self.pkey.push(item.P_KEY);
                                self.ID.push(item.ID);
                                self.waitType.push(item.YWLX); //待提出
                                let list = [];
                                Attribute.forEach(data => {//包含"['NAME','ROOM_NO','BAFJ','YWLX','OPTIME','AQJCSJ']"属性,把data当下标放入item,提出我们所需要的内容
                                    //对数组中的每一个参数循环
                                    list.push(item[data]);
                                });
                                self.waitContent.push(list); //需要姓名,监室号,提讯室,提出时间
                            })
                        }
                    })
        },
        allInfo(){//页面全部的title切换按钮
            var self = this;
			let params= {
					type: 14,
					SYS_UNIT: "440100113"
				}
			self.$http.get('/apis',{params})
				.then( data => {//请求回来的数据放入待提回页面
					if(data.data.status == 200){
                        self.showLoding = false;
                        self.pkey = [];
                        self.ID = [];
                        self.allTitle = [];
                        self.allType = [];
                        self.allContent = []
					    console.log(data)
						var item = data.data;
                         // 把每一列的title赋给puttitle如:姓名监室号
                        self.allTitle = eval("(" + item.columnname + ")");
                        // title对应的参数名
                        let Attribute = eval("(" + item.column + ")");
                        // console.log(Attribute)
                         item.record.forEach(item => {
                                self.pkey.push(item.P_KEY);
                                self.ID.push(item.ID);
                                self.allType.push(item.YWLX); //待提出
                                let list = [];
                                Attribute.forEach(data => {//包含"['NAME','ROOM_NO','BAFJ','YWLX','OPTIME','AQJCSJ']"属性,把data当下标放入item,提出我们所需要的内容
                                    //对数组中的每一个参数循环
                                    list.push(item[data]);
                                });
                                self.allContent.push(list); //需要姓名,监室号,提讯室,提出时间,提回时间
                            })
                        }
                    })
        },
        waitPerson(index) {  //提回点击事件
           var self = this;
            let ID = this.ID[index]; //获取当前人员的对应的ID值传入后台
            $.confirm(
                "是否进行提人",
                function() {
                    let params = {
                        type: "0108",
                        pKey: ID //ID为当前所点击时提讯数据的ID值
                    };
                    console.log(params.pKey)
                    self.$http.get("/apis", {params}).then(data => {
                        // console.log(data)
                        if (data.data.info > 0) {//如果后台返回info为1就是成功
                            self.waitContent.splice(index, 1);
                            $.toast("提人成功");
                        } else {
                            console.log("请求数据有误");
                        }
                    });
                },
                function() {
                    return false;
                }
            );
        },
        goPutinfo(index) {
            // 点击对应的人员的时候传入P_key值
            console.log(this.pkey[index])
            // return;
            this.$router.push({
                path: "/info",
                query: {
                    // 在目标页面通过this.$route.query获取参数：
                    keyName: this.pkey[index], // 唯一值
                    sysUnit: "440100113" // 广州市编号
                }
            });
        },
        newData() {//页面一开始渲染的时候请求的数据
            var self = this;
            let params = {
                type: 7,
                SYS_UNIT: "440100113"
			};
			self.$http.get("/apis", { params }).then(data => {//把请求回来的数据放入待提出页面;
                if (data.data.status == 200) {
                    self.putLoding = false;
					var item = data.data;
					self.pkey =[];
					self.ID = [];
					self.putType = [];
                    self.putContent = []
                    // 把每一列的title赋给puttitle如:姓名监室号
                    self.putTitle = eval("(" + item.columnname + ")");
                    //																						姓名    监室号     .....
                    // 																						||				||
                    // 把每一列的对应的名称参数接下来赋给Attribute,["NAME","ROOM_NO","BAFJ","YWLX","OPTIME","AQJCSJ"]
                    let Attribute = eval("(" + item.column + ")");
                    // console.log(Attribute)
                    item.record.forEach(item => {
                        self.pkey.push(item.P_KEY);
                        self.ID.push(item.ID);
                        self.putType.push(item.YWLX); //待提出
                        let list = [];
                        Attribute.forEach(data => {
                            //对数组中的每一个参数循环
                            list.push(item[data]);
                        });
                        self.putContent.push(list); //杨面 4040
                    });
                }
			});
		
        }
    },
    watch: {}
};
</script>
<style lang="less" scoped>
#district {
    margin-top: -0.42rem;
    .weui-navbar {
        position: fixed;
        top: 1.066667rem;
    }
    .weui-navbar__item {
        font-size: 0.4266667rem;
        background: white;
        color: rgb(51, 51, 51);
    }
    .weui-navbar__item.weui-bar__item--on {
        color: #0076da;
    }
    .weui-navbar__item.weui-bar__item--on::before {
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
    .weui-navbar__item:after {
        border: none;
    }
    .weui-tab__bd-item {
        margin-top: 0.4rem;
    }
    .weui-loadmore {
    width: 65%;
    margin: 4rem auto;
    line-height: 1.6em;
    font-size: .373333rem;
    text-align: center;
    color: #333;
}
}
</style>


