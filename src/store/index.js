    // ｉｎｄｅｘ．ｊｓ文件夹是ｓｔｏｒｅ的入口文件
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)
    const store = new Vuex.Store({
        // modules: {
        //     welfare,
        // },
        // getters 用来获取sate里面存储的数据
    })
    store.registerModule('$vux', { // 名字自己定义
        state: {//设置属性
            isShowFooter:false,
            headerTitle:'',
            btnStatus : true,
            isShowHeader : true,
            isShowRecord:false,
            // 预约页面的数据复用
            isDataReuse:[],
            menuItems:{//menuItems用来做测试; 可以删除
                //设置father中请求的属性,然后在mutations中来更改,在father的data()中定义的back属性是没有用了的; 所以我们应该在computed计算属性中调用
            },
            // 设置home一生成时的用户数据
            isuserData:[]
        },
        getters:{ // getters 用来获取sate里面存储的数据

        },
        mutations: {//更改属性的状态
            setMenuItems(state,data){//返回来会有两个状态一个是上面的state,还有一个是返回来的状态(形参),返回之后将我们请求回来的数据赋给state
                state.menuItems = data;
               //menuItems用来做测试; 可以删除
            },
            updateLoadingStatus (state, payload) {
                state.isShowFooter = payload.isShowFooter
            },
            getHeaderTitle(state, obj) {
                state.headerTitle = obj.headerTitle
            },
            updateReturnStatus(state,payload){
                state.btnStatus = payload.btnStatus       
            },
            updateHeadStatus(state,obj){
                if(obj){
                    state.isShowHeader = !state.isShowHeader;
                }
            },
            updateRecordStatus(state,obj){//讯问预约
                state.isShowRecord = obj.isShowRecord;
            },
            // 数据复用
            updateDataReuse(state,obj){
                state.isDataReuse = obj.isDataReuse;
                // console.log(state.isDataReuse)
            },
              // 设置home一生成时的用户数据
            // isuserData: []
            updateUserData(state,obj){
                state.isuserData = obj.isuserData;
            }
         
        },
        actions:{
            // 应用mutations,不能直接操作
        }
    })


    export default store
