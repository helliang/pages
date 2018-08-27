/*
 * @Author: pan
 * @Date: 2018-05-22 14:26:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-20 15:11:57
 */
<template>
    <div class="result" >
        <!-- 显示结果 -->
        <div class="publish">
            <listItem :listContent="listContent" :leftName="leftName" :listTitle="listTitle" @listenToChildEvent="goInfo">
            </listItem>
        </div>
        <div class="loding" v-show="showLoding">
            <div class="weui-loadmore">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
        </div>
        <div class="footer-tip" v-show="showTip">
            {{tip}}
        </div>
    </div>
</template>
<script>
import store from "../store";
import listItem from "./listItem";
export default {
    name: "result",
    mounted() {
        this.init();
        
    },
    created(){
        this.scrollLoding();
    },
    components: {
        listItem
    },
    methods: {
        init() {
            var self = this;
            // 获取后台返回来的属性名(正常需要显示为"姓名：", "性别：", "出生日期：","籍贯：", "出所时间：",)
            this.listTitle = eval("(" + this.coffeeType.columnname + ")");
            // 相当于请求的参数
            let Attribute = eval("(" + this.coffeeType.column + ")");
            // coffeeType是从localStorage缓存中读取查询页面请求接口返回的数据
            // console.log(this.coffeeType);
            // 把缓存下来的数据放入显示页面的数组中
            this.coffeeType.record.forEach(item => {
                // ID = item.P_KEY;
                this.ID.push(item.P_KEY);
                //  获取左边的name
                this.leftName.push(
                    item.NAME //姓名
                );

                let list = [];
                Attribute.forEach(data => {
                    //对数组中的每一个参数循环
                    // console.log(list)
                    list.push(item[data]);
                });
                // console.log(list)//每一个参数对应的属性名
                self.listContent.push(list);
            });
            // console.log(this.ID)
        },
        goInfo(index) {
            // index是子组件派发上来的
            this.$router.push({
                path: "/info",
                query: {
                    // 在目标页面通过this.$route.query获取参数：
                    keyName: this.ID[index], // 唯一值
                    sysUnit: "440100113" // 广州市编号
                }
            });
        },
        scrollLoding() {
               // 缓存指针
            let self = this;
            // 上一页面带过来的参数内容
            // console.log(self.dataParams.ID)
            // 滚动条的高
           // 注册scroll事件并监听  
            if(self.coffeeType.record.length >= 20){
                console.log('长度大于20')
                    window.addEventListener('scroll',this.addData);

            }else{
                console.log('下拉')
                 window.removeEventListener('scroll',self.addData);
                 self.showTip = true;
            }
           },
            addData(){
                // console.log(22)
                
                var scrollTop = (window.pageYOffset  || document.documentElement.scrollTop || document.body.scrollTop)
                // console.log(document.body.clientHeight)
                // console.log(window.screen.height + scrollTop)
                // console.log( scrollTop  )
                // 拿页面的总数和后台返回的总数对比,如果页面数量小于等于后台总数便加载
                let self = this;
                // let scrollTop = $(document).scrollTop();//【垂直滚动条位置】
                // let scrollTop = $("#app").scrollTop();//【垂直滚动条位置】
                let windowHeight = $(window).height()//屏幕分辨率的高
                let scrollHeight = $(document).height()//整个文档的高度，可视具体情况使用
                // console.log(scrollTop)
                // console.log(scrollTop+windowHeight)
                // console.log('..........')
                // console.log(scrollHeight)
                // if (scrollTop + windowHeight  === scrollHeight) {//
                if (window.screen.height + scrollTop  >= document.body.clientHeight) {
                    // 因为判断滚动条问题 所以才一次会加载好几次数据
                    let params = {
                        pageSize: 20,
                        sysUnit:44,
                        currentPage: self.currentPage,  // 滚动加载页面数量 
                        type:self.dataParams.type,
                        // 以下为上一页面传过来的参数
                        NAME:  self.dataParams.NAME, //名称-name
                        T_STATUS: self.dataParams.T_STATUS,//历史人员
                        ISEQUERY:  self.dataParams.ISEQUERY,
                        ID:  self.dataParams.ID,//349378497623763818
                        SEX:  self.dataParams.SEX,
                        BIRTHDAY1: self.dataParams.BIRTHDAY1,
                        BIRTHDAY2: self.dataParams.BIRTHDAY2,
                        NATION:  self.dataParams.NATION,
                        NATIVE_PLACE: self.dataParams.NATIVE_PLACE
                    };
                        self.showLoding = true;
                        // console.log(params.currentPage);
                    self.$http.get(self.apis.baseURL,{params}) .then(function(response) {
                        self.totalRecord = response.data.totalRecord
                        // console.log(params);
                        // console.log(response)
                        console.log( response.data.currentPage, response.data.pageCount)
                        // 对比当前页和总页数
                        if(response.data.currentPage === response.data.pageCount){
                            window.removeEventListener('scroll',self.addData);
                            self.showLoding = false;
                            self.showTip = true;
                            return;
                        }else{
                            self.showLoding = false;
                            self.currentPage++;
                            console.log('成功后的页面数量', self.currentPage)
                                // self.numLen = response.data.record.length;
                            self.listTitle  =eval("("+response.data.columnname+")");
                            let Attribute  =eval("("+response.data.column+")");
                            response.data.record.forEach(item => {
                                    // ID = item.P_KEY;
                                    self .ID.push(item.P_KEY);
                                    //  获取左边的name
                                    self .leftName.push(
                                        item.NAME //姓名
                                    );

                                    let list = [];
                                    Attribute.forEach(data => {
                                        //对数组中的每一个参数循环
                                        // console.log(list)
                                        list.push(item[data]);
                                    });
                                    // console.log(list)//每一个参数对应的属性名
                                    self.listContent.push(list);
                                });
                        }
                    
                    })
                    .catch(error => console.log(error));
                }else{

                }
            },
    },
    data() {
        return {
            title: "result",
            headerTitle: "查询结果显示",
            ID: [],
            leftName: [
                //    "carrie" ,//左侧的内容
                //    "carrie1",
            ],
            // listTitle : [
            //     "姓名：",
            //     "性别：",
            //     "出生日期：",
            //     "籍贯：",
            //     "出所时间：",
            // ],
            listTitle: [
                //     "姓名：",
                //     "性别：",
                //     "出生日期：",
                //     "籍贯：",
                //     "出所时间：",
            ],
            listContent: [
                //页面显示的数据
                /*[
                    "广东省韶关市乳源县",
                    "张三四",
                    "男",
                    "1994-03-11",
                    "2018-01-18",
                    "广东省韶关市乳源县"
                ]*/
            ],
            listDetail: [], //实际的全部数据
            // 获取指定response.data.record本地存储的值,
            coffeeType: JSON.parse(localStorage.getItem("coffeeType")),
            dataParams:JSON.parse(localStorage.getItem('dataParams')),
            showLoding: false,
            // 滚动加载页面数量 
            currentPage:2,
            showTip:false,
            tip:'已加载完所有数据!',
            // 滚动加载后台返回的总页面
            totalRecord:''
        };
    },
  destroyed () {
          window.removeEventListener('scroll',this.addData);
    },
};
</script>
<style lang="less" scoped>
.result {
    margin-top: 0.4rem;
}
//   加载图标
//   加载图标
.loding {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    bottom:0;
    z-index: 100;
}
.weui-loadmore {
    width: 100%;
    margin: 8rem auto;
    line-height: 1.6em;
    font-size: 0.373333rem;
    color: #333333;
    text-align: center;
    position: fixed;
}
.footer-tip{
    height: 1.333333rem;
    line-height: 1.333333rem;
    text-align: center;
    color: #5555;
    font-size: .373333rem;
}
</style>



