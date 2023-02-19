//当前这个模块是用于所有api接口进行统一的管理
//向服务器发请求用到的是requests.js文件（二次封装了axios)
import requests from './request';
import mockRequests from './mockAjax';
//三级联动的接口
// /api/product/getBaseCategoryList get 无参数
//只需要在这里暴露一个函数，一调就实现发请求
export const reqCategoryList = () => requests({ url: 'http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList', methods: 'get' })//在baseUrl已经写了/api，这里不再需要//发请求,并返回，返回的结果是Promise对象
//看一调用这个reqCategoryList函数能不能发请求//回到入口文件测试

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner');

//获取floor组件的数据//那也是一样，暴露一个函数，返回一个promise实例//要想需不需要带参，调用这个函数不需要任何实参
export const reqFloorList = () => mockRequests.get('/floor');

//获取搜索模块的数据//当然我们得知道后端给我们的接口    
//地址：/api/list 请求方式：post  参数：要带参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: 'http://gmall-h5-api.atguigu.cn/api/list', method: 'post', data: params })

//获取产品详情的信息的接口  url:   请求方式:get
export const reqGoodsInfo = (skuId) => requests({ url: `http://gmall-h5-api.atguigu.cn/api/item/${skuId}`, method: "get" })

//将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `http://gmall-h5-api.atguigu.cn/api/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表的数据
///api/cart/cartList  get
export const reqCartList = () => requests({ url: 'http://gmall-h5-api.atguigu.cn/api/cart/cartList', method: 'get' });
//当接口写好要发请求，去vuex中发请求，写三连环

//删除购物车产品的接口 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById=(skuId)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/cart/deleteCart/${skuId}`,method:'delete'})

//修改购物车中商品的状态isCheck
export const reqUpdateCheckedByid=(skuId,isChecked)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码/api/user/passport/sendCode/{phone} get
//需要传参//需要把电话号码传给回调函数，带着电话号码去向服务器发送请求
export const reqGetCode=(phone)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/user/passport/sendCode/${phone}`,method:'get'})

//注册
///api/user/passport/register post
//注册需要将用户输入的电话号码，验证码，输入的密码传给服务器
export const reqUserGegister=(data)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/user/passport/register`,data,method:'post'});

//登录
///api/user/passport/login post
//需要传参 手机号码和密码
export const reqUserLogin=(data)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/user/passport/login`,data,method:'post'});

//登录后获取用户信息
//需要带着用户的token向服务器要用户信息
export const reqUserInfo=()=>requests({url:`http://gmall-h5-api.atguigu.cn/api/user/passport/auth/getUserInfo`,method:'get'});

//退出登录
///api/user/passport/logout get 
export const reqLogout=()=>requests({url:`http://gmall-h5-api.atguigu.cn/api/user/passport/logout`,method:'get'});

//获取用户地址信息
///api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo=()=>requests({url:`http://gmall-h5-api.atguigu.cn/api/user/userAddress/auth/findUserAddressList`,method:'get'});

//获取商品清单
///api/order/auth/trade get
export const reqOrderInfo=()=>requests({url:`http://gmall-h5-api.atguigu.cn/api/order/auth/trade`,method:'get'});

//提交订单
///api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

//获取支付信息
///api/payment/weixin/createNative/{orderId} get
export const reqPayInfo=(orderId)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/payment/weixin/createNative/${orderId}`,method:'get'});

//获取支付订单状态
///api/payment/weixin/queryPayStatus/{orderId} get 
export const reqPayStatus=(orderId)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取个人中心的数据
///api/order/auth/{page}/{limit} get
export const reqMyOrderList=(page,limit)=>requests({url:`http://gmall-h5-api.atguigu.cn/api/order/auth/${page}/${limit}`,method:'get'});




