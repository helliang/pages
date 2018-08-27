<template>
    <ul id="put">
        <li v-for="(listItem,index) in list" :key="index" @click="listenChildEvent(index)">
          <div class="left">{{listType[index]}}</div>
          <div class="right">
            <p v-for="(rightItem,rightIndex) in listItem" :key="rightIndex">
              <span class="title">{{listTitle[rightIndex]}}</span>
              <span class="content">{{rightItem}}</span>
            </p>
          </div>
        </li>
    </ul>
</template>
<script>
export default {
    name:'put',
    props : ["list","listTitle","listType"],
    methods: {
        listenChildEvent (index){
          this.$emit("listenToChildEvent", index);
        }
    },
    data(){
        return{
                
        }
    },   
}
</script>
<style lang="less" scoped>
#put{
  li{
    width: 100%;
    display: flex;
    margin-bottom: .4rem;
    background: url(../../assets/img/icon-fhsj@2x.png) 96% center  no-repeat;
    background-size: 0.266667rem 0.506667rem;
    background-color: #FFFFFF;  
    .left{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      font-size: 0.373333rem;
      border-right: 1px rgb(237,237,237) solid;    
    }
    .right{
      flex: 3;   
      padding: 0.266667rem 0 0.266667rem 0.533333rem;
      p{
        overflow: hidden;
        span{
          display: inline-block;
          font-size: 0.32rem;
          line-height: 0.586667rem;
          float: left;
        }
        span.title{
          width: 30%;
          color: rgb(119,119,119);
        }
        span.content{
          width: 70%;
          color: rgb(51,51,51);
        }
      } 
      p:nth-child(4){
        span{
          color: rgb(83,159,224);
          font-size: 0.266667rem;
        }
      }
      p:nth-child(5){
        span{
          color: rgb(83,159,224);
          font-size: 0.266667rem;
        }
      }
    }
    .buttonBox{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      button{
        width: 1.44rem;
        height: 0.773333rem;
        text-align: center;
        font-size: 0.293333rem;
        color: white;
        background-color: #0076da;
        border: none;
        border-radius: 5px;
      }
      button:active{
        background-color: #539FE0;
      }
    }
  }
}
</style>


