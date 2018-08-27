<template>
    <div id="chooseArea">
        <input type="text" class="chooseInput" readonly="readonly" placeholder="请选择地区" name="area" :value="area" @click="chooseArea">
        <transition name="fade">
          <div v-if="isShowBox">
            <section class="cover"></section>
            <section class="areaBox">
              <h3>请选择地区<span class="return" v-if="isShowReturn" @click="returnBox"></span><span class="close" @click="closeBox"></span></h3>
              <ul v-for="(item,i) in dataList">
                <li @click="chooseItem(item.key,item.name,i)">{{item.name}}</li>
              </ul>
            </section>
          </div>
        </transition>
    </div>
</template>
<script>
export default {
    name:'chooseArea',
    props : [],
    data(){
        return{
          isShowBox : false,
          areaIndex : 1,
          province : "",
          city : "",
          district : "",
          dataList :[],
          dataCity : [],
          dataDistrict : [],
          dataProvince : [
            {name : "广东省",key : "01"},
            {name : "广西省",key : "02"},
            {name : "湖南省",key : "03"}
          ],
          dataCity2 : [
            [
              {name:"湛江市",key:"0101"},
              {name:"广州市",key:"0102"},
              {name:"深圳市",key:"0103"}
            ],
            [
              {name:"桂林市",key:"0201"},
              {name:"南宁市",key:"0202"},
              {name:"北海市",key:"0203"}
            ],
            [
              {name:"长沙市",key:"0301"},
              {name:"湘潭市",key:"0302"},
              {name:"衡阳市",key:"0303"}
            ]
          ],
          dataDistrict2 : [
            [
              [
                {name:"吴川县",key:"010101"},
                {name:"霞山区",key:"010102"},
                {name:"廉江市",key:"010103"},
              ],
              [
                {name:"天河区",key:"010201"},
                {name:"越秀区",key:"010202"},
                {name:"海珠区",key:"010203"},
                {name:"荔湾区",key:"010203"},
              ],
              [
                {name:"罗湖区",key:"010301"},
                {name:"福田区",key:"010302"},
                {name:"龙华区",key:"010303"},
              ],
            ],
            [
              [
                {name:"灵川县",key:"020101"},
                {name:"雁山区",key:"020102"},
                {name:"永福县",key:"020103"},
              ],
              [
                {name:"江南区",key:"020201"},
                {name:"兴宁区",key:"020202"},
                {name:"扶绥县",key:"020203"},
              ],
              [
                {name:"合浦县",key:"020301"},
                {name:"北山港区",key:"020302"},
              ],
            ],
            [
              [
                {name:"天心区",key:"030101"},
                {name:"芙蓉区",key:"030102"},
              ],
              [
                {name:"株洲县",key:"030201"},
              ],
              [],
            ]
          ]
        }
    },
    computed :{
      area : function(){
         return "选择地区：" + this.province + this.city + this.district;
      },
      isShowReturn : function(){
         if (this.areaIndex != 1) {
            return true;
         }else{
            return false;
         }
      }
    },
    mounted (){
      this.dataList = this.dataProvince;
    },
    methods: {
        listenChildEvent (index){
          this.$emit("listenToChildEvent", index);
        },
        closeBox(){
          this.isShowBox = false;
        },
        chooseArea(){
          this.isShowBox = true;
          this.dataList = this.dataProvince;
          this.province = "";
          this.city = "";
          this.district = "";
        },
        returnBox(){
          if (this.areaIndex > 1) {
            this.areaIndex--;
          }
          if (this.areaIndex == 1) {
            this.dataList = this.dataProvince;
          }else if (this.areaIndex == 2) {
            this.dataList = this.dataCity;
          }
        },
        chooseItem(key,name,index){
          let self = this;        
          if (self.areaIndex == 1) {
            self.dataList = self.dataCity2[index];
            self.dataCity = self.dataCity2[index];
            self.province = name;
            self.areaIndex++;
          }else if (self.areaIndex == 2) {
            let a = key.substr(1,1);
            let b = key.substr(3,1);
            self.dataList = self.dataDistrict2[a-1][b-1];
            self.dataDistrict = self.dataDistrict2[a-1][b-1];
            self.city = name;
            self.areaIndex++;
            if (self.dataList.length == 0) {
              self.isShowBox = false;
              self.areaIndex = 1;
            }
          }else if (self.areaIndex == 3) {
            self.district = name;
            self.isShowBox = false;
            self.areaIndex = 1;
          }
        }
    }, 
}
</script>
<style lang="less" scoped>
#chooseArea{
  background-color: white;
  .chooseInput{
    width: 90%;
    line-height: 1.2rem;
    margin: .2rem 5%;
    text-indent: .4rem;
    background: url(../../assets/img/icon-fhhh2@2x.png) 97% center no-repeat;
    background-size: 0.213333rem 0.4rem;
    background-color: #0076da;
    font-size: .4rem;
    color: white;
  }
  .chooseInput::-webkit-input-placeholder{
    font-size: .4rem;
    color: white;
    line-height: 1.2rem;
  }
  .cover{
    background-color: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;
  }
  .areaBox{
    width: 100%;
    height: 7rem;
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 200;
    h3{
      text-align: center;
      font-size: .5rem;
      line-height: 1.2rem;
      border-bottom: .006667rem solid #e2e2e2;
      position: relative;
      span{
         display: inline-block;
        width: .4rem;
        height: .4rem;
        position: absolute;
        top: .4rem;
      }
      .close{       
        background: url(../../assets/img/icon-ch.png) center center no-repeat;
        background-size: 100% 100%;
        
        right: .4rem;        
      }
      .return{
        background: url(../../assets/img/icon-fanh.png) center center no-repeat;
        background-size: 60% 100%;      
        left: .3rem;
      }
    }
    li{
      text-indent: .3rem;
      font-size: .42rem;
      line-height: 1.1rem;
      border-bottom: .006667rem solid #e2e2e2;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
}
</style>


