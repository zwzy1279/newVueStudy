//引入axios(axios进行二次封装）)
import request from '@/utils/request'

//对外暴露登录接口函数
export function login(data) {
  return request({
    //这里请求的接口用的是mock模拟的，我们给换成真正的 /admin/acl/index/login post
    //url: '/vue-admin-template/user/login', http://gmall-h5-api.atguigu.cn/dev-api
    url:'/admin/acl/index/login',// Request failed with status code 404
    //url:' http://gmall-h5-api.atguigu.cn/admin/acl/index/login',
    method: 'post',
    data
  })
}
//对外暴露获取用户信息接口函数
export function getInfo(token) {
  return request({
    //url: '/vue-admin-template/user/info',
    url:'/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}
//对外暴露获取退出登录函数
export function logout() {
  return request({
    //url: '/vue-admin-template/user/logout',
    url:'/admin/acl/index/logout',
    method: 'post'
  })
}
