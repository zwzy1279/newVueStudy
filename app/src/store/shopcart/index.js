import {reqCartList,reqDeleteCartById,reqUpdateCheckedByid} from  '@/api'

export default {
    state:{
        cartList:[]
    },
    actions:{
        async getCartList({commit}){
            let result=await reqCartList();
            //测试个人能否获取到个人购物车的数据
            //console.log(result);
            if(result.code==200){
                commit('GETCARTLIST',result.data);
            }
        },
       async deleteCartListBySkuId({commit},skuId){
            let result=await reqDeleteCartById(skuId);
            if(result.code==200){
                return 'ok'
                //commit('GETDELETECARTLIST',result.data);
            }else{
                return Promise.reject(new Error('fail'));
            }
       },
       async updateCheckedById({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedByid(skuId,isChecked);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'));
        }
       },
       //删除全部勾选的产品
       deleteAllCheckedCart({dispatch,getters}){
        //如何拿到此仓库，此仓库中的action的删除方法，以及state拿到每一个商品的id
        //context参数拿到的是这个小仓库。//dispatch拿到的是这个仓库的action,getters拿到的是这个仓库中的getters
        //console.log(dispatch,getters);
         //获取购物车中全部被选中的商品
         let PromiseAll=[];
        //遍历
        getters.cartList.cartInfoList.forEach(item=>{
            //console.log(123);
            //选中的商品才被删除
            let promise=item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
            //console.log(promise);//返回的是一个promise对象
            //删除成功与否都将结果返回回去，在考虑要不要向服务器再次发送请求
        
            //将每次遍历后返回的Promise添加到数组中
            PromiseAll.push(promise);
        });
        //只有全部的promise都成功，结果才为成功
        //如果有一个删除失败，则返回失败
        //数组.all 去过滤
        return Promise.all(PromiseAll);

       },
       //修改全部产品的状态
       updateAllCartIsChecked({dispatch,state},isChecked){
        let PromiseAll=[];
         state.cartList[0].cartInfoList.forEach((item)=>{
            let promise=dispatch('updateCheckedById',{skuId:item.skuId,isChecked});//这里的isChecked为组件全选按钮传进来的全选中或者全部选中
            PromiseAll.push(promise);
         })
         return Promise.all(PromiseAll);
       }
    },
    mutations:{
        GETCARTLIST(state,cartList){
            state.cartList=cartList;
        },
        /*GETDELETECARTLIST(state,cartList){
            state.cartList=cartList;
        }*/
    },
    getters:{
        cartList(state){
            return state.cartList[0]||{}
        },
    }
}