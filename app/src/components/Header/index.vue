<template>
    <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <!--没有用户名-->
                            <span>请</span>
                            <!--<a href="###">登录</a>-->
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                            <!--<a href="###" class="register">免费注册</a>-->
                        </p>
                        <p v-else>
                            <!--有用户名-->
                            <a>{{ userName }}</a>
                            <a class="register" @click="logout">退出登录</a>
                           <!-- <router-link>{{ userName }}</router-link>
                            <router-link class="register" @click="logout">退出登录</router-link>-->
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center/myorder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <!-- <a href="###">我的订单</a>
                        <a href="###">我的购物车</a>-->
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo"  to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                        <!--这里用编程式导航实现路由跳转，因为后续还需要其他业务-->
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch" >搜索</button>
                    </form>
                </div>
            </div>
    </header>
</template>
  
  <script>
  export default {
    name: '',
    components: {
      
    },
    data(){
        return {
           keyword:""
        }
    },
    mounted(){
        //通过全局事件总线清楚关键字
        this.$bus.$on('clear',()=>{
            this.keyword=''
        });
        //获取用户信息在首页展示
    this.$store.dispatch('getUserInfo');
    },
    computed:{
        //用户名信息
        userName(){
            return this.$store.state.user.userInfo.name;
        }
    },
    methods:{
        //搜索按钮的回调函数，需要向search路由进行跳转
        goSearch(){
            //路由传参：这里举例params和query两种参数都传，当然传的时候需要配置路由，params参数需要进行占位
            //字符串形式
            //this.$router.push('/search/'+this.keyword+"?k="+this.keyword.toUpperCase())
            //asc?k=ASC//这里search组件中的params参数就是keyword,query参数就是this.keyword.toUpperCase()

            //模板字符串形式
            //this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`);

            //对象写法
            /*this.$router.push({//写成对象类型，这里要路由传参，还要传params，那么配置路由中需要给路由起name(path形式用name写法）)
                name:"search",
                params:{
                    keyword:this.keyword
                },
                query:{
                    k:this.keyword.toUpperCase()
                }
            })*/

            //***************************************************** */
            //面试题1：路由传参（对象写法）path是否可以结合params参数一起使用：不可以
            //答：路由传参数的时候，对象的写法可以是name，path的形式，但是path的形式不能与params参数一起使用
            /*this.$router.push({
                path:"/search",
                params:{
                    keyword:this.keyword
                },
                query:{
                    k:this.keyword.toUpperCase()
                }
            })*/

            //面试题2:如何指定params参数可传不可传
            //假设我就不传params参数,但是在配置路由的地方依旧有params的占位
            //结果当点路由跳转的时候，上面显示的路径是有问题的http://localhost:8081/?#/?k=ABC，连search都没有
            //如果路由要求传递params参数，但是你就不传递params参数，发现一件事情，url会有问题
            //那么我们怎么确定params参数可传可不传呢：可以在配置路由的定法：占位参数后面加上？，代表可传可以不传
            /*this.$router.push({
                name:'search',
                query:{
                    k:this.keyword.toUpperCase()
                }
            })*/

            //面试题3：params参数可以传递也可以不传递，但是如果传递的是空字符串，如何解决
            //路径有问题http://localhost:8081/?#/?k=WW
            //使用undefined解决：params参数可以传递，可以不传递（空的字符串)
            /*this.$router.push({
                name:"search",
                params:{
                    keyword:''||undefined
                },
                query:{
                    k:this.keyword.toUpperCase()
                }
            })*/

            //面试题4:路由组件能不能传递props数据,但只能传递params参数
            //props我们知道是父子通信
            //可以的：三种写法
            //在配置路由的地方加上props:true，路由组件能够拿到params上的参数，当作属性，Header组件上面会有一个$attr属性，里面有一个keyword，值为传进来的
            //路由组件props接收数据
            /*this.$router.push({
                name:"search",
                params:{
                    keyword:this.keyword
                },
                query:{
                    k:this.keyword.toUpperCase()
                }
            })*/
            if(this.$route.query){
                let location={name:'search',params:{keyword:this.keyword||undefined}}
                location.query=this.$route.query;
                this.$router.push(location)
            }
            
            //console.log(this);//组件实例vc
            //console.log(this.$router);//路由实例VueRouter
        },
        //退出登录
        async logout(){
            //console.log(123);
            //派发action,通知向服务器发请求，清除token（清除掉服务器存储的）
            //清除项目中仓库的数据
            //清除掉本地存储
            //跳转到home组件
            try{
                //如果退出成功
                await this.$store.dispatch('userLogout');
                //回到首页
                this.$router.push('/home');
            }catch(error){
                //如果退出失败//则在发送请求
                alert(error.message);
            }
        }
    }
  }
  </script>
  
  <style lang="less" scoped>
  /*这里采用less样式，不采用css样式。要让浏览器识别，需要通过less将less样式转为css样式：cmd里面npm install --save less less-loader@5，和在style加上lang="less"*/
     .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
  </style>
  