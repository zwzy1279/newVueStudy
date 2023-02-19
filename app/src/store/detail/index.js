import {reqGoodsInfo,reqAddOrUpdateShopCart} from  '@/api'
//封装的是游客身份模块uuid----生成一个随机的字符串
import {getUUID} from '@/utils/uuid_token'
export default {
    state:{
        goodInfo:{},
        //游客临时身份
        //uuid_token:uuid()//一调用uuid函数游客名字就会发生改变，而我们想让他执行一次后一直不变的//所以我们不能这么写uuid()
        uuid_token:getUUID()//这个函数在untils中被暴露//uuid_token收到的是随机的号且不能变
    },
    actions:{
        //获取产品信息的action
        async getGoodInfo({commit},skuId){
            let result=await reqGoodsInfo(skuId)
            if(result.code==200){
                commit('GETGOODINFO',result.data);
            }
        },
        //将产品添加到购物车中
        async addOrUpdateShopCart({commit},{skuId,skuNum}){
            //加入购物车返回的解构
            //加入购物车以后（发请求），前台将数据带给服务器
            //服务器写入数据成功，并没有返回其他数据，只是返回code=200,代表这次操作成功
            //因为服务器没有返回其余数据，因此我们也不需要三连环存储数据
            let result=await reqAddOrUpdateShopCart(skuId,skuNum);//调用api中的函数reqAddOrUpdateShopCart
            //console.log(result);//回去派发action，在组件中调用addOrUpdateShopCart。这个函数给返回服务器请求失败或者成功给addOrUpdateShopCart,在组件中一掉用就拿到成功或者失败 的结果
            //async返回一个Promise对象
            if(result.code==200){
                //向服务器请求成功
                //给函数返回一个成功的返回值
                return 'ok'
            }else{
                //服务器返回失败
                return Promise.reject(new Error('fail'))
            }
        }
    },
    mutations:{
        GETGOODINFO(state,goodInfo){
            state.goodInfo=goodInfo;
        }
    },
    getters:{
        //简化数据
        categoryView(state){
            return state.goodInfo.categoryView||{};
        },
        skuInfo(state){
            return state.goodInfo.skuInfo||{}
        }
    }
}