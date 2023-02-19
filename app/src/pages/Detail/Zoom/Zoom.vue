<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler" ref="event"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!--遮罩层-->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:["skuImageList"],
    data(){
      return {
        currentIndex:0
      }
    },
    mounted(){
      //console.log(this.skuImageList);//undefined//父组件给子组件传的skuImageList拿不到数据，但是在子组件仓库中有
      //接收imageList传过来的index值
      //$on 第一个参数是要接受的哪个名字，第二个是一个回调函数
      this.$bus.$on('getIndex',(index)=>{
        //console.log(index);
        this.currentIndex=index;
      })
    },
    methods:{
      handler(event){
        //获取到小盒子
        let mask=this.$refs.mask;
        //当前光标距离最外层盒子的距离 event.offsetLeft
        //光标距离最外层大盒子的距离-小盒子宽度的一半=小盒子距离大盒子的距离left
        let left=event.offsetX-mask.offsetWidth/2;
        let top=event.offsetY-mask.offsetHeight/2;
        //获取大盒子
        let eventdiv=this.$refs.event;
        //限制小盒子不能出大盒子的边框
        if(left<=0)left=0;
        if(left>=eventdiv.offsetWidth-mask.offsetWidth)left=eventdiv.offsetWidth-mask.offsetWidth;
        if(top<=0)top=0;
        if(top>=eventdiv.offsetHeight-mask.offsetHeight)top=eventdiv.offsetHeight-mask.offsetHeight;
        //if(top>=mask.offsetHeight)top=mask.offsetHeight;
        //将left和top的值赋值给mask
        mask.style.left=left+'px';
        mask.style.top=top+'px';
        //遮罩层mask显示的图片会显示在放大处
        //获取到big
        let big=this.$refs.big;
        big.style.left=-2*left+'px';
        big.style.top=-2*top+'px;'
      }
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.currentIndex]||{};
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>