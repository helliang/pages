
/*
 * @Author: carrie
 * @Date: 2018-05-22 14:26:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-08-02 15:28:46
 */
 <template>
  <div class="setting">
    <!-- 设置 -->
    <div class="content">
        <div class="content_box clearfix">
            <div class="description">
                <p class="position">广州办事处</p>
                <p class="name">张三</p>
            </div>
            <div class="photograph">
                <img src="../../static/img/photo.png" alt="">
            </div>
        </div>
    </div>
    <div class="set">
        <p>设置</p>
    </div>
  </div>
</template>
<script>
export default {
    name:"setting"

  
}
</script>
<style lang="less" scoped>
.setting{
    background-color: #EBEBEB;
    height: 100vh;
    width: 100%;
}
.content{
    margin-top: .4rem;
    margin-bottom: .266667rem;
    background-color: #ffffff;
}
.content_box{
    width: 100%;
    padding: .413333rem .4rem .4rem .266667rem;
    // display: flex;
        .description{
            // flex: 1;
            width: 50%;
            float: left;
                .position{
                    font-size: .453333rem;
                    color: rgb(51,51,51);
                    font-style: normal;
                }
                .name{
                     color: rgb(153,153,153);
                     font-size: .346667rem;
                }

        }
        .photograph{
            // flex: 1;
             width: 50%;
             float:left;
            img{
                float: right;
                width: 1.6rem;
                height: 1.6rem;
            }
        }
}
.set{
    background-color: #fff;
    p{
        padding: .333333rem 0 .32rem  .266667rem;
        font-size: .453333rem;
        color: rgb(51,51,51);
    }
}
</style>

