权限管理业务：有用户管理 角色管理 菜单管理
1.用户管理：超级管理员（老板）对员工用户的管理
2.角色管理：一家企业而言：老板，运维，测试，开发
3.菜单管理

权限：老板是有权利操作整个项目的所有模块
        某技术员工只能部分菜单和首页
        普通员工只能首页

学习：把组件给你，教你写路由，权限管理最重要的是路由
权限管理其实就是多了一些判断条件

//路由的配置：为什么不同用户登录我们的项目，菜单路由是一样的
//因为咱们的路由是写死的，并没有根据不同的用户
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }//左侧标题
    }]
  },
  {
    path:'/product',
    component:Layout,//Layout骨架下的组件
    name:'Product',
    children:[
      {
        path:'trademark',
        name:'TradeMark',
        component:()=>import('@/views/product/tradeMark'),
        meta:{title:'品牌管理'}
      },
      {
        path:'attr',
        name:'Attr',
        component:()=>import('@/views/product/Attr'),
        meta:{title:'平台属性管理'}
      },
      {
        path:'spu',
        name:'Spu',
        component:()=>import('@/views/product/Spu'),
        meta:{title:'Spu管理'}
      },
      {
        path:'sku',
        name:'Sku',
        component:()=>import('@/views/product/Sku'),
        meta:{title:'Sku管理'}
      },
    ],
    meta: { title: '商品管理', icon: 'el-icon-goods' }
  },
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理',
        },
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,////路由的配置：为什么不同用户登录我们的项目，菜单路由是一样的
  //因为咱们的路由是写死的，并没有根据不同的用户
})

菜单权限：当用户获取用户信息的时候，服务器会把相应的用户拥有的菜单的权限信息返回，需要数据用户身份对比出，当前这个用户需要展示哪些菜单
完成菜单权限
当用户登录的时候，服务器会返回相应的角色的菜单权限的信息
只不过返回信息是一个数组routes->['sku','spu','product']










1.改动下store文件夹中modules文件夹中的user.js中的获取用户数据的action,mutation,state
2.改动下router文件夹中的index.js,将原来的常量路由改成有常量路由constantRoutes,异步路由asyncRoutes,任意路由anyRoutes
//处理常量路由:任何用户登录后都能够看到的
//处理异步路由：不同的用户（角色），需要通过过滤筛选出来的路由
//任意路由：任何用户都能够访问
3.在store文件夹中modules文件夹中的user.js中增加action,state
//最终计算出来的异步路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    state.resultAsyncRoutes=asyncRoutes;
  }
  //resultAsyncRoutes:[],
4.在store文件夹中modules文件夹中的user.js中引入asyncRoutes,anyRoutes
import { resetRouter,asyncRoutes,anyRoutes } from '@/router'
5.在store文件夹中modules文件夹中的user.js中
commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes));
6.在store文件夹中modules文件夹中的user.js中
//定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
 const computedAsyncRoutes = (asyncRoutes,routes)=>{
     //过滤出当前用户【超级管理|普通员工】需要展示的异步路由
    return asyncRoutes.filter(item=>{
         //数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1 
        if(routes.indexOf(item.name)!=-1){
          //递归:别忘记还有2、3、4、5、6级路由
          if(item.children&&item.children.length){
              item.children = computedAsyncRoutes(item.children,routes);
          }
          return true;
        }
     })
 }
 不会了，代码能跑就不要动