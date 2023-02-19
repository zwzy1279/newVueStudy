<template>
    <div>
        <!--三级联动全局组件，不需要再次引入，因为已经是全局组件了-->
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
        <Brand/>
    </div>
</template>
  
<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
name: 'Home',
components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
},
mounted(){
    //派发action，获取floor中的数据
    this.$store.dispatch("getFloorList");//当触发vuex去请求返回数据后，此时仓库中才有数据
    //而此时的Floor需要的数据是在父组件Home中，需要将数据传给floor组件，并展示

    //获取用户信息在首页展示
    this.$store.dispatch('getUserInfo');
},
computed:{
    ...mapState({
        floorList:state=>state.home.floorList//写完后返回浏览器看看home组件是否有这个数据//有的
    })
}
}
</script>
  
<style scoped lang="less">
  
</style>
  