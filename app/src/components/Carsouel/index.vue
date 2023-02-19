<template>
     <div class="swiper-container" ref="cur">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
                                    <img :src="carousel.imgUrl">
                                </div>
                            </div>
                            <!-- 如果需要分页器 -->
                            <div class="swiper-pagination"></div>

                            <!-- 如果需要导航按钮 -->
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
</template>
  
  <script>
  import Swiper from 'swiper'
  export default {
    name: 'Carsouel',
    components: {
     
    },
    props:['list'],
    watch:{
    
    list:{
        immediate:true,//不管你数据有没有发生变化，一上来就监听一次
        //现在通过watch监听bannerList属性的属性值变化
        //如果执行handler方法，证明组件实例身上属性的属性值已经发生了变化
        handler(newValue,oldValue){
            //只能监听数据已经有了，但是v-for动态渲染结构我们还是没有办法确定，因此我们需要用nextTick
            this.$nextTick(()=>{
                var mySwiper = new Swiper (this.$refs.cur, {
      //direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项
      
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        //点击小球也切换
        clickable:true
      },
      
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })  
})
           
        }
    }
},
   
  }
  </script>
  
  <style>
  
  </style>
  