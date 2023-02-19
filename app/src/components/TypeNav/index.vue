<template>
    <!--一级菜单，二级菜单，三级菜单，数组里面装对象-->
    <div class="type-nav">
    <div class="container">
        <div  @mouseleave="leaveShow" @mouseenter="enterShow"><!--事件委派，把子元素的事件委派给父元素-->
            <h2 class="all">全部商品分类</h2>
            <!--过渡动画-->
       <transition name="sort">
        <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
                <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                    <h3 @mouseenter="changeIndex(index)" :class="{cur:currentIndex==index}">
                        <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                        <!--<router-link to="/search">{{c1.categoryName}}</router-link>-->
                    </h3>
                    <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                        <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                            <dl class="fore">
                                <dt>
                                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                    <!--<router-link to="/search">{{c2.categoryName}}</router-link>-->
                                </dt>
                                <dd>
                                    <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                        <!--<router-link to="/search">{{c2.categoryName}}</router-link>-->
                                    </em>
                                    <!--<em>
                                        <a href="">文学</a>
                                    </em>
                                    <em>
                                        <a href="">经管</a>
                                    </em>
                                    <em>
                                        <a href="">畅读VIP</a>
                                    </em>-->
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </transition>
        </div>
         <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
        
    </div>
</div>
</template>
  
<script>
 import {mapState} from 'vuex'
 //import _ from 'lodash'
 //console.log(_)
 //最好的引入方式：按需引入
 import throttle from 'lodash/throttle'
  export default {
    name: 'TypeNav',
    components: {
     
    },
    data(){
        return {
            //存储用户鼠标移到哪一个一级分类上
            currentIndex:-1,//默认值不是0-15之间的
            show:true
        }
    },
    mounted(){
    this.$store.dispatch('categoryList');
    //当组件挂载完毕，让show属性变为false//当然得加上条件，如果不是home路由组件，让typeNav进行隐藏
    if(this.$route.path=='/home'){
        this.show=true;
}else {
    this.show=false;
}
    },
   
    methods:{
        //鼠标进入修改响应式数据currentIndex属性
       /* changeIndex(index){
            //alert(1);
            //index:鼠标移上某一个一级分类的的元素的索引值
            //console.log(index);
            //正常情况（用户慢慢的操作）：鼠标进入：每一个一级分类h3,都会触发鼠标进入事件
            //非正常事件（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3被触发
            //就是由于用户的行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡断现象
            //解决用节流或者防抖
            this.currentIndex=index;
        },*/
        changeIndex:throttle(function(index){//throttle函数别用箭头函数，因为可能出现上下文this问题//_throttle(function(index)
            this.currentIndex=index;
            //console.log(index);
        },50),
        /*leaveIndex(){
            this.currentIndex=-1;
        },*/
        //路由跳转到search
        goSearch(event){
            //可以拿到事件的节点
            let element=event.target;
            //节点有一个dataset属性，可以获取节点的自定义属性和属性值
            //console.log(element);//可以拿到事件对象的节点
            //console.log(element.dataset);//可以拿到自定义属性categoryname: '图书、音像、电子书刊'

            //如何知道是一二三级属性，同样还是给他添加自定义属性
            let {categoryname,category1id,category2id,category3id} =element.dataset;
            //如果标签身上用有categoryname一定是a 标签 
            if(categoryname){
                //整理路由参数
                let location={name:'search'};
                let query={categoryName:categoryname};
                //一级，二级，三级分类的a标签
                if(category1id){
                    //动态添加要传递过去的一二三级路由参数
                    query.category1Id=category1id;
                }else if(category2id){
                    query.category2Id=category2id;
                }else{
                    query.category3Id=category3id;
                }
                //如果路由在跳转的时候，带有params参数也要一起传递过去
                if(this.$route.params){
                    location.params=this.$route.params;
                    //整理完参数，将query里面的参数添加到location
                    location.query=query;
                    //路由跳转，将要跳转的路径和参数一并传递过去
                    this.$router.push(location);
                };
                 
                
            }
            //this.$router.push('/search');
        },
        //当鼠标移入的时候，让商品分类的列表进行展示
        enterShow(){
            this.show=true
        },
        //当鼠标离开的时候，让商品分类列表进行隐藏
        leaveShow(){
            this.currentIndex=-1;
            if(this.$route.path!='/home'){
                this.show=false;
            }
        }
    },
   
    computed:{
        ...mapState({
            categoryList:(state)=>{//拿到大仓库中的数据
                //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会执行一次
                //注入一个参数state,其实即为大仓库中的数据
                return state.home.categoryList;//拿到大仓库中小仓库home的数据
                //然后就可以在组件模板中使用这个属性了
            }
        })
}
  }
</script>
  
<style lang="less" scoped>
   .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                       /* &:hover {
                            .item-list {
                                display: block;
                            }
                        }*/
                    }
                    /*.item:hover{
                        background:skyblue;
                    }*/
                    .cur {
                        background:skyblue;
                    }
                }
            }
            //过渡动画的样式
            //过渡动画开始的阶段
            .sort-enter {
                height:0px;
            }
            //过渡动画结束的状态
            .sort-enter-to {
                height:461px;
            }
            //定义动画时间，速率
            .sort-enter-active {
                transition: all .5s line;
            }
        }
    }

</style>
  
