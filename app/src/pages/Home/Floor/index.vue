<template>
    <div class="floor">
    <div class="py-container">
        <div class="title clearfix">
            <h3 class="fl">{{list.name}}</h3>
            <div class="fr">
                <ul class="nav-tabs clearfix">
                    <li class="active" v-for="(nav,index) in list.navList" :key="index">
                        <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tab-content">
            <div class="tab-pane">
                <div class="floor-1">
                    <div class="blockgary">
                        <ul class="jd-list">
                            <li v-for="(keyword,index) in list.keywords" :key="index">{{keyword}}</li>
                            <!--<li>4K电视</li>
                            <li>空气净化器</li>
                            <li>IH电饭煲</li>
                            <li>滚筒洗衣机</li>
                            <li>电热水器</li>-->
                        </ul>
                        <img :src="list.imgUrl" />
                    </div>
                    <div class="floorBanner">
                        <!--轮播图的地方-->
                        <Carsouel :list="list.carouselList"></Carsouel>
                        <!--<div class="swiper-container" ref="cur">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(carousel,index) in list.carouselList" :key="carousel.id">
                                    <img :src="carousel.imgUrl">
                                </div>
                            </div>
                           
                            <div class="swiper-pagination"></div>

                           
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>-->
                    </div>
                    <div class="split">
                        <span class="floor-x-line"></span>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[0]" />
                        </div>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[1]" />
                        </div>
                    </div>
                    <div class="split center">
                        <img :src="list.bigImg" />
                    </div>
                    <div class="split">
                        <span class="floor-x-line"></span>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[2]" />
                        </div>
                        <div class="floor-conver-pit">
                            <img :src="list.recommendList[3]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  </template>
  
  <script>

  
  export default {
    name: 'Floor',
    components: {
      
    },
    props:['list']
    /*mounted(){
        //第一次书写Swiper的时候，在mounted当中书写时不可以的，但是为什么现在这里可以
        //当时发请求是在组件内部发的，以及在组件中动态展示数据，服务器返回需要事件。
        //而现在现在是在父组件发送请求的，父组件已经把数据传给floor组件了，此时页面floor组件的页面结构已经是有了，组件结构有的情况下才执行的mounted
        //但是后面为了我们提取共用轮播图的组件//将这里的数据结构也写成之前那样。当然你不想的话继续写成mounted也行
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
    },*/
   /* watch:{
    
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
},*/
   
  }
  </script>
  
  <style lang="less" scoped>
   .floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }

  </style>
  
