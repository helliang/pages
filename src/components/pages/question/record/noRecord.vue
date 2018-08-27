<template>
    <div class="noRecord">
        <div class="record-ico"><img src="/static/img/bqb@2x.png" alt=""></div>
        <p class="record-text">暂无记录!</p>
    </div>
</template>
<style lang="less" scoped>
.noRecord {
    text-align: center;
    font-size: 0.426667rem;
    /*设置元素绝对定位*/
    position: absolute;
    top: 50%;
    left: 50%;
    /*css3   transform 实现*/
    transform: translate(-50%, -50%);
    .record-ico {
        vertical-align: middle;
        margin-bottom: 0.826667rem;
        img {
            display: inline-block;
            width: 2.293333rem;
            height: 2.293333rem;
        }
    }
}
</style>

