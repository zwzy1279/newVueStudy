//引入路由组件
import Home from '@/pages/Home'
//import Search from '@/pages/Search'
//const Search=()=>import('@/pages/Search')
const Search=()=>{
    console.log(1111);//访问/search才会加载Search组件，才会打印出1111
    return import('@/pages/Search');
}
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
//路由的配置信息
export default [
    {
        path:'/center',
        component:Center,
        meta:{
            show:true
        },
        //二级路由组件
        children:[
            {
                path:'myorder',
                component:MyOrder,
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'//默认
            }
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{
            show:true
        },
    },
    {
        path:'/pay',
        component:Pay,
        meta:{
            show:true
        },
        //路由独享守卫//已加入一访问进不去//需要条件
        beforeEnter:(to,from,next)=>{
            //去交易页面，必须是/shopcart进来的
            if(from.path=='/trade'){
                next();
            }else{
                //其他路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path:'/trade',
        component:Trade,
        meta:{
            show:true
        },
        //路由独享守卫//已加入一访问进不去//需要条件
        beforeEnter:(to,from,next)=>{
            //去交易页面，必须是/shopcart进来的
            if(from.path=='/shopcart'){
                next();
            }else{
                //其他路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{
            show:true
        }
    },
    {
        path:'/addcartsuccess',
        name:"addcartsuccess",
        component:AddCartSuccess,
        meta:{
            show:true
        }
    },
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{
            show:true
        }
    },
    {
        path:'/home',
        component:Home,
        meta:{
            show:true
        }
    },
    {   
        path:"/search/:keyword?",
        component:Search,
        meta:{
            show:true
        },
        name:"search",
        //路由组件能不能传递props数据
        //布尔值写法
        //props:true//可以把params参数作为路由组件身上的属性

        //对象写法//额外给路由组件传递一些props
        /*props:{
            a:1,
            b:2
        }*/

        //函数写法：可以把params参数，query参数，通过props传递给路由组件
        props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        }
    },
    {
        path:"/login",
        component:Login,
        meta:{
            show:false
        }
    },
    {
        path:"/register",
        component:Register,
        meta:{
            show:false
        }
    },
    //重定向：在项目跑起来的时候，访问/,立马让他定向首页
    {
        path:"*",
        redirect:"/home"
    }
]