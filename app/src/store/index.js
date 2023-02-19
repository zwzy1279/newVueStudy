import Vue from 'vue';
import Vuex from 'vuex';

//使用
Vue.use(Vuex);

//引入小仓库
import home from './home/index';
import search from './search/index'
import detail from './detail/index'
import shopcart from './shopcart/index';
import user from './user/index'
import trade from './trade/index'
//对外暴露
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
   
})