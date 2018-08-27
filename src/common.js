
var strToJson=function(str){
    // 返回title的属性对应的参数: ["NAME", "SEX", "INDATE", "CASECLASS", "ROOM_NO", "NATIVE_PLACE"]
    return eval("(" + str + ")");
}
//把item离的值按list提取出来
var setList = function(item,list){
    // console.log(item,list)
    // item为当前人员的详细信息,list为对应属性参数
    // 属性参数对应的title:["姓名", "性别", "入所时间", "涉嫌罪名", "房间号", "户籍所在地", __ob__: Observer]
    var arrlist=[];
        list.forEach((data) => {
            arrlist.push(item[data]);
        })
    return arrlist;
}
export{
    strToJson, setList
}
