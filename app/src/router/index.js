//配置路由的地方
//引入Vue-router
import VueRouter, { RouterLink } from 'vue-router'
import Vue from 'vue'
import routes from './routes'
import store from '@/store'
//先把VueRouter原型对象的push保存一份
let originPush=VueRouter.prototype.push;
let originReplace=VueRouter.prototype.replace;
//重写push/repalce
//第一个参数location:告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        //call||apply区别
        //相同点，都可以调用函数一次，都可以修改函数的上下文一次
        //不同点：call和apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject);
    }
    else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        //call||apply区别
        //相同点，都可以调用函数一次，都可以修改函数的上下文一次
        //不同点：call和apply传递参数，call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject);
    }
    else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
//对外暴露VueRouter实例
let router=new VueRouter({
    //配置路由
    routes,
    scrollBehavior(to,from,savePosition){
        //y代表滚动条在最上方
        return {y:0}
    }
})
//全局守卫：前置守卫（在路由跳转之间进行判断）
 router.beforeEach(async (to,from,next)=>{
    //为了测试先全部放行
    //next();
    //用户登录了才会有token
    let token=store.state.user.token;
    let name=store.state.user.userInfo.name;
    //用户已经登录了
    if(token){
        //用户已经登录了还想去login,我们不给他去
        if(to.path=='/login'||to.path=='/register'){//自行输入导航地址/login
            next('/')
        }else{
            //用户已经登录了，但是接下来去的不是登录login组件，那么我们可以放行
            //又分为是否有用户信息，如果服务器返回失败没有用户信息，那么我们继续派发action让仓库存储用户信息在跳转
            if(name){
                next();
            }else{
                //没有用户信息，派发action让仓库存储用户信息在跳转
                try{
                    //获取用户信息成功在放行
                    await store.dispatch('getUserInfo');
                    next();
                }catch(error){
                    //token失效了获取不到用户信息
                    //清除token后重新登录
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
            
        }
    }else{
        //用户未登录，没有token
        //未登录暂时没有处理完毕，先这样以后在处理
        //next();
        //未登录：不能去交易相关，支付相关和个人中心.应该跳转到登录
        let toPath=to.path;
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            //next('/login');
            //需求：当我们未登录点击我的订单，首先先跳转到登录，登录成功后我们想要他不是跳转到首页，而是跳转到就是我的订单处
            //问题：那么我们如何存储这个我们想要去的我的订单，让后登录成功后能让他跳
            //解决:把登录的时候想去而没有去成的信息，存储于地址栏中（路由）
            next('/login?redirect='+toPath);
        }else{
            //去的不是上面哪些，而是home search shopcart就放行
            next();
        }

    }
    //console.log(store);
})
//使用插件
Vue.use(VueRouter);
//配置路由，并向外暴露
export default router;