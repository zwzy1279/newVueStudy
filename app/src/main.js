import Vue from 'vue'
import App from './App.vue'
//三级联动的组件--全局组件
//定义全局组件：在入口文件注册一次，在任何组件中都可以使用
import TypeNav from './components/TypeNav'
import Carsouel from './components/Carsouel'
import Pagination from './components/Pagination'
import { Button,MessageBox} from 'element-ui';
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsouel.name,Carsouel);
Vue.component(Pagination.name,Pagination);
Vue.component(Button.name, Button);
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;
//引入配置好的路由，挂载到根实例上面
import router from '@/router'
//引入仓库
import store from './store'
//引入MockServe.js
import '@/mock/mockServe'
//引入swiper样式
//import 'swiper/swiper-bundle.min.css'
import 'swiper/css/swiper.css'
//import {Swiper,SwiperSlide} from 'swiper'

//统一引入接口api文件夹里面的所有请求函数
import * as API from '@/api'
//console.log(API);//里面放着所有接口函数
//引入图片
import flower from '@/assets/2.jpg'

//引入插件
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:flower
})
//console.log(VueLazyload)

//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{name:'upper'});

//引入表单校验插件
import '@/plugins/validate';
/*//测试
import {reqCategoryList} from './api'
reqCategoryList();*/
Vue.config.productionTip = false
//let age=11;生命变量没有使用会报错，所以要管理eslint检验
new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;//后面我们使用API就可以不用一个一个引入，直接通过$API操作即可
  },
  //注册路由
  //当这里书写router的时候，组件身上都拥有$router,$route属性
  router,
  store//注册仓库，组件实例的身上会多一个属性$store属性
}).$mount('#app')
