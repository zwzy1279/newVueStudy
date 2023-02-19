<template>
  <div id="app">
   <Header></Header>
   <!--路由出口的地方-->
   <router-view></router-view>
   <!--在Home，Search显示，在Login，Register隐藏-->
   <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue"
import Footer from "./components/Footer/index.vue"

export default {
  name: 'App',
  data(){
    return{
      msg:'my holiday'
    }
  },
  components: {
    Header,
    Footer
  },
  mounted(){
    //派发一个action获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
    //获取用户信息在首页展示
    //this.$store.dispatch('getUserInfo');
  }
}
</script>

<style>

</style>
