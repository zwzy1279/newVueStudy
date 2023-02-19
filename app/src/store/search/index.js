import {reqGetSearchInfo} from '@/api'

export default {
    state:{
        searchList:{}
    },
    actions:{
        //获取search模块数据
        async getSearchList({commit},params={}){
            //当前这个reqGetSearchInfo这个函数在调用的时候获取服务器的数据，至少要传递一个参数（空对象），params形参适当用户派发action时第二个参数传递过来的
            let result=await reqGetSearchInfo(params);
            if(result.code==200){
                commit('GETSEARCHLIST',result.data)
            }
        }
    },
    mutations:{
        GETSEARCHLIST(state,searchList){
            state.searchList=searchList;
        }
    },
    getters:{
        //getter在项目中是为了简化数据而生（简化仓库中的数据）
        //可以把我们再组件需要的数据简化以下，将来组将再获取数据的时候就方便了
        goodsList(state){
            //console.log(state);//是searchList//说明getter中的函数的形式参数是该仓库中的state
            //state.searchList.goodsList如果服务器的数据返回回来了，那么没问题，返回的是一个数组
            //加入加入网络不给力，或者说没有网络，返回的是undefined，空对象.goodsList
            //计算新的属性至少给人家一个数组
            return state.searchList.goodsList||[];//但是这样书写是有问题的
        },
        tratemarkList(state){
            return state.searchList.tratemarkList||[];
        },
        attrsList(state){
            return state.searchList.attrsList||[];
        }
    }
}