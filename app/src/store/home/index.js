import {reqCategoryList,reqGetBannerList,reqFloorList} from  '@/api'

export default {
    state:{
        //state的数据默认初始值别瞎写
        //服务器返回的是什么，起始值就写成什么
        reqCategoryList:[],//仓库接收到数据，返回组件去使用
        //轮播图的数据
        bannerList:[],
        //floor组件的数据
        floorList:[]
    },
    actions:{
        //在这里调用api中的函数 getCategoryList categoryList
        async categoryList({commit}){
           //console.log(reqCategoryList());//返回的是axios执行返回的一个promise
           let result=await reqCategoryList();//await会等待Promise完成之后直接返回最终结果//await和async必须两者同时存在
           //console.log(result);
           //如果返回成功，提交到mutations
           if(result.code==200){
            commit('CATEGORYLIST',result.data.slice(0,16));
           }
        },
        //获取首页轮播图的数据
        async getBannerList({commit}){
            console.log('在向服务器发送ajax请求，获取轮播图的数据');
            let result=await reqGetBannerList();
            //console.log(result);
            if(result.code==200){
                commit('GETBANNERLIST',result.data);
               }
        },
        //获取floor数据
        async getFloorList({commit}){
            //发请求//await等待他返回的结果//让result来接收服务器返回的结果
            let result=await reqFloorList();
            //捞到数据之后，数据提交commit到mutation//提交的是result.data
            if(result.code==200){
                commit('GETFLOORLIST',result.data);//写完后写mutation
            }
        }
    },
    mutations:{
        
        CATEGORYLIST(state,categoryList){
            state.categoryList=categoryList;
        },
        GETBANNERLIST(state,bannerList){
            state.bannerList=bannerList;
            //console.log("在修改仓库中的数据");
        },
        GETFLOORLIST(state,floorList){//形参，随便起名字//第一个参数是state，第二个参数是上面action服务器返回的数据result.data
            state.floorList=floorList;
        }
    },
    getters:{

    }
}