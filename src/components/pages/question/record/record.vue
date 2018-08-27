/*
 * @Author: carrie
 * @Date: 2018-07-30 15:35:38 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-02 15:39:48
 */
 <template>
    <div class="make-record">

        <div class="record-info" v-for="(infoList,i) in infoLists" :key="i">
            <!-- 头部信息 -->
            <div class="info-title clearfix" @click="details(i)">
                <span class="title-text fl">{{infoList.makeInfo}}</span>
                <span class="arrow fr"><img src="../../../../../static/img/icon-fhhh@2x.png" alt=""></span>
            </div>
            <!-- 中部信息 -->
            <div class="make-result">
                <ul class="result-show">
                    <li>
                        <span>{{infoList.personnel}}</span>
                        <span class="result-info">{{infoList.name}}</span>
                    </li>
                    <li>
                        <span>{{infoList.timeTitle}}</span>
                        <span class="result-info">{{infoList.time}}</span>
                    </li>
                    <li>
                        <span>{{infoList.makeReult}}</span>
                        <span class="result-info">{{infoList.reultInfo}}</span>
                    </li>
                </ul>
            </div>
            <!-- 尾部按钮信息 -->
            <div class="data-dispose">
                <button @click="reuse(i)">数据复用</button>
                <button @click="cancel">取消预约</button>
            </div>
        </div>
    </div>
</template>
 <script>
 import store from '../../../../store'
export default {
    data() {
        return {
            infoLists: [
                {
                    makeInfo: "预约信息",
                    personnel: "预约人",
                    name: "carrie",
                    timeTitle: "预约时间",
                    time: "2018-09-01 11:00",
                    makeReult: "预约结果",
                    reultInfo: "成功"
                },
                {
                    makeInfo: "预约信息",
                    personnel: "预约人",
                    name: "周",
                    timeTitle: "预约时间",
                    time: "2018-09-01 10:30",
                    makeReult: "预约结果",
                    reultInfo: "失败"
                }
            ]
        };
    },
    methods: {
        details(index) {
            console.log(index);
            this.$router.push({
                name:'approveDetails'
            })
        },
        //  数据复用
        reuse(index) {
            // console.log(this.infoLists[index])
            store.commit("updateDataReuse",{isDataReuse:this.infoLists[index]})
            // return;
             this.$router.push({
                 name:'question',
                 query:{
                     user:this.infoLists[index]
                     }
                 } )
                //  console.log(this.$route.query.user)
        },
        // 取消预约
        cancel() {
            $.confirm({
                title: "",
                text: "确定取消预约?",
                onOK: function() {
                    //点击确认
                     $.toast("已取消预约");
                },
                onCancel: function() {
                    console.log('点击取消按钮')
                }
            });
        },
    
    }
   
};
</script>
 <style lang="less" scoped>
.make-record {
    font-size: 0.32rem;
    color: rgb(102, 102, 102);
    .record-info {
        margin-top: 0.266667rem;
        background-color: #fff;
    }
    .info-title {
        line-height: 1.066667rem;
        border-bottom: 1px solid #ebebeb;
        padding: 0 5%;
    }
    .title-text {
        font-size: 0.426667rem;
        color: rgb(51, 51, 51);
        //  font-weight: 600;
    }
    .arrow {
        line-height: 1.066667rem;
        vertical-align: middle;
        img {
            display: inline-block;
            width: 0.213333rem;
            height: 0.4rem;
        }
    }
    .make-result {
        .result-show {
            border-bottom: 1px solid #ebebeb;
        }
        .result-show > li {
            display: flex;
            padding: 0.133333rem 5%;

            span {
                font-size: 0.32rem;
                color: rgb(102, 102, 102);
                flex: 1;
            }
            .result-info {
                text-align: right;
            }
        }
    }
    .data-dispose {
        padding: 0.266667rem 0;
        text-align: right;
        button {
            outline: none;
            border: 1px solid #bababa;
            border-radius: 0.4rem;
            padding: 0.266667rem 0.4rem;
            background-color: #fff;
            margin-right: 0.4rem;
        }
    }
}
</style>
 
