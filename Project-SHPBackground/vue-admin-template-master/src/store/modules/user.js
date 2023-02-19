import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  //关于用户登录调用的接口api请求函数（向服务器发送请求），服务器返回数据存到该仓库中
  async login({ commit }, userInfo) {//成功与否的布尔值传给组件调用处
    //结构用户名和密码
    const { username, password } = userInfo
    //发送请求login(data),这里data传的是一个对象 {username:username,password:password}
    let result=await login({username:username.trim(),password:password});
    console.log(result);//返回code码为20000，下发了token
    if(result.code==20000){
      //我们将这个token 给存储起来，以后拿着这个token向服务器发送获得用户信息的请求
      commit('SET_TOKEN',result.data.token);
      //将token存储在本地，刷新页面不会消失//封装存储于本地的文件在utils文件夹下的auth.js
      setToken(result.data.token);
      return 'ok';
    }else{
      return Promise.reject(new Error('fail'));
    }
    /*return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })*/
  },

  // get user info
  //获取用户登录信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //获取用户信息：返回数据包含：用户名name,用户头像avatar,routes(返回的标志，不同的用户应该展示哪些菜单的标记)
      getInfo(state.token).then(response => {
        const { data } = response
        //console.log(data);//{routes: Array(66), buttons: Array(48), roles: Array(1), name: 'admin', avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'}
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  //用户退出登录
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

