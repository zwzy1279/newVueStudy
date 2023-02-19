import {reqGetCode,reqUserGegister,reqUserLogin,reqUserInfo,reqLogout} from  '@/api'
import {setToken,getToken,removeToken} from '@/utils/token';
export default {
    state:{
        code:'',
        //token:'',
        token:localStorage.getItem('TOKEN'),
        //模块化
        //token:getToken,
        userInfo:{}
    },
    actions:{
        //获取验证码
        async getCode({commit},phone){
            let result=await reqGetCode(phone);
            //console.log(result);
            if(result.code==200){
                //服务器返回的数据成功，将返回的验证码保存到仓库中
                commit('GETCODE',result.data);
                return 'ok';
            }else{
                return Promise.reject(new Error('fail'));
            }
        },
        //用户注册
        async UserRegister({commit},user){
            let result=await reqUserGegister(user);
            console.log(result);
            if(result.code==200){
                return 'ok';
            }else{
                return Promise.reject(new Error('fail'));
            }
        },
        //用户登录
        async userLogin({commit},data){
            let result =await reqUserLogin(data);
            //console.log(result);
            if(result.code==200){
                //服务器下发的token存储到仓库中，后续可以通过这个token对用户数据进行展示
                commit('USERLOGIN',result.data.token);
                //持久化存储token
                //localStorage.setItem('TOKEN',result.data.token);
                //模块化后的,直接调用utils文件夹中的token.js文件//将参数传递过去就行
                setToken(result.data.token);
                return 'ok';
            }else{
                return Promise.reject(new Error('fail'));
            }
        },
        //获取用户信息
        async getUserInfo({commit}){//在用户进行登录跳转到home首页，home首页完成挂载的时候触发该action
            let result=await reqUserInfo();
            //console.log(result);//用户的个人信息
            if(result.code==200){
                commit('GETUSERINFO',result.data);
                return 'ok';
            }else{
                return Promise.reject(new Error('fail'));
            }
            
        },
        //退出登录
        async userLogout({commit}){
            //向服务器发送请求，清除掉token
            let result=await reqLogout();
            if(result.code==200){
                commit('CLEAR');//没有返回数据的
                return 'ok';
            }else{
                return Promise.reject(new Error('fail'));
            }
        }
    },
    mutations:{
        GETCODE(state,code){
            state.code=code;
        },
        USERLOGIN(state,token){
            state.token=token;
        },
        GETUSERINFO(state,userInfo){
            state.userInfo=userInfo;
        },
        CLEAR(state){
            //帮仓库中相关用户心虚清空
            state.token='';
            state.userInfo={};
            //本地存储数据清空
            removeToken();
        }
    },
    getters:{
        
    }
}