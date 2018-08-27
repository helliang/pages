<template>
    <div class="loadings">
        <div class="loding" v-show="showLoding" >
            <div class="weui-loadmore ">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showLoding: false,
        }
    }
}
</script>
<style lang="less" scoped>
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
</style>


