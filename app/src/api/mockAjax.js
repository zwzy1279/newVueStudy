//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
//console.log(nprogress);//start进度条开始，done：进度条结束

//引入进度条样式
import 'nprogress/nprogress.css';
//进度条开始是当拦截器捕获到请求时，进度条不动是当服务器返回的数据成功了
//利用axios对象方法create,去创建一个axios实例
//request就是axios,只不过稍微配置一下
const requests=axios.create({
    //配置对象
    //基础路径，发请求的时候，路径会出现api
    //baseURL:"/api",
    baseURL:'/mock',
    //代表请求时间超过5
    timeout:5000
})

//请求拦截器：再发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:是一个配置对象，对象中有一个属性很重要，叫做headers请求头
    //进度条开始动
    
    nprogress.start();
    return config;
});
//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
},(err)=>{
    //响应失败的回调函数
    return Promise.reject(new Error('fails'))
})

//对外暴露
export default requests;