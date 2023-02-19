import {reqAddressInfo,reqOrderInfo} from  '@/api'

export default {
    state:{
       address:[],
       orderInfo:{}
    },
    actions:{
        //获取用户地址信息
        async getUserAddressInfo({commit}){
            let result =await reqAddressInfo();
            //console.log(result);//返回200是成功的，但是data中没有数据。我们得用老师给的账号，才有用户地址信息//地址信息放置在数组里面
            if(result.code==200){
                commit('GETUSERADDRESSINFO',result.data);
            }
        },
        //获取商品清单数据
        async getOrderInfo({commit}){
            let result=await reqOrderInfo();
            //console.log(result);//返回的data是对象
            if(result.code==200){
                commit('GETORDERINFO',result.data)
            }
        }
    },
    mutations:{
        GETUSERADDRESSINFO(state,address){
            state.address=address;
        },
        GETORDERINFO(state,orderInfo){
            state.orderInfo=orderInfo;
        }
    },
    getters:{
      
    }
}