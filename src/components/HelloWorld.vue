<template>
  <div class="hello">
    <header class='demos-header'>
      <h1 class="demos-title">Select</h1>
    </header>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label for="name" class="weui-label">职业</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" id="job" type="text" value="" @click="val">
        </div>
      </div>
    </div>

      <div class="toggle" @click="test">
        <i v-show="shows">随便来点</i>
          {{word}}
      </div>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      word: '我是word',
      shows:false
    }
  },
  methods:{
    test(){
      this.shows = !this.shows;
    },
    val(){
       $("#job").select({
        title: "选择职业",
        items: ["法官", "医生", "猎人", "学生", "记者", "其他"],
        onChange: function(d) {
          console.log(this, d);
        },
        onClose: function() {
          console.log("close");
        },
        onOpen: function() {
          console.log("open");
        },
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
