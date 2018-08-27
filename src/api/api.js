const server = function(data, url2, time) {
  // data传过来的参数,url2为请求过来的需要跳转的页面,time为时间控件
  // console.log(url2);

  var self = this;
  // 获取input时间
  var inTime = time;
  // 请求数据
  var url = "http://192.168.1.16:8000/jdbg/fjtzCon/getYdjw";
  var params = data;
  this.$http
    .get(url, { params })
    .then(function(params) {
      // console.log(params)
      // 请求成功后保存当前的数据带入modifyResrlt页面
      // 将data.data.record存储到RequestData字段,对象转字符串
      localStorage.setItem("RequestData", JSON.stringify(params.data.record));
      // console.log(JSON.stringify(params.data.record));
      // this.$router.push("/adjustList");
      //   追加路径
      // return;
      if(url2!=null){
        window.location.href = "/" + url2;
      }
    })
    .catch(function(error) {
      // 请求错误时
      console.log(error);
    });
};
// 用export来导出
// 如果我们使用export default导出的话，在组件中引入就会全部引入，但我们的需求是只在相应的页面中按需引入即可，所以在vue文件中
export { server};
