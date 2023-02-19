<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类的面包屑-->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategoryName">×</i></li>
            <!--关键字的面包屑-->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!--平台售卖的属性的面包屑,因为props是一个数组，需要遍历用v-for,用到split和数组去重-->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{ attrValue.split(':')[1] }}<i @click="removeAttr(index)">×</i></li>
            <!--            <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li>-->

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--价格结构⬆-->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')"><!--写成动态的类名,这个类名的显示调价取决于order中是否包含1  searchParams.order.indexOf('1')!=-1-->
                  <a >综合<span v-show="isOne" :class="{'iconfont icon-jiantou_xiangxia':isDesc,'iconfont icon-jiantou_xiangshang':isAsc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a >价格<span v-show="isTwo"  :class="{'iconfont icon-jiantou_xiangxia':isDesc,'iconfont icon-jiantou_xiangshang':isAsc}"></span></a>
                </li>
               
              </ul>
            </div>
          </div>
          <!--销售产品的列表-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                   <!-- <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>-->
                   <!--路由跳转的时候切记别忘记要带id(params参数)-->
                    <!--<router-link :to="`/detail/${good.id}`"><img :src="good.defaultImg" /></router-link>-->
                    <!--图片懒加载 :src换成v-lazy -->
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页器-->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'//子组件
  //import {mapState} from 'vuex';
  import {mapGetters,mapState} from 'vuex';
  export default {
    name: 'Search',
    data(){
      return {
        //服务器参数
        searchParams:{
          //一级分类的id
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          //分类名字
          "categoryName": "",
          //关键字
          "keyword": "",
          //排序
          "order": "1:desc",
          //分页器用的，代表的是当前第几页
          "pageNo": 1,
          //代表的是每一页展示数据个数
          "pageSize": 10,
          //平台售卖属性操作带的参数
          "props": [],
          //品牌
          "trademark": ""
        }
      }
    },
    components: {
      SearchSelector
    },
    /*
    beforeCreate生命周期钩子函数是获取不到响应式数据的，undefined,
    beforeCreate(){

    },*/
    created(){
        //console.log(this.searchParams);
    },
    beforeMount(){
      //console.log(this.$route.query);//{categoryName: '电子书', category3Id: '1'}
      //修改SearchParams中的参数
      this.searchParams.category1Id=this.$route.query.category1Id;
      this.searchParams.category2Id=this.$route.query.category2Id;
      this.searchParams.category3Id=this.$route.query.category3Id;
      this.searchParams.categoryName=this.$route.query.categoryName;
      this.searchParams.keyword=this.$route.params.keyword;
      //Object.assign:ES6新增的语法：合并对象
      //Object.assign(this.searchParams,this.$route.query,this.$route.params);//将this.$route.query,this.$route.params有的同this.searchParams进行合并
      //console.log(this.$route);
    },
    mounted(){
      //先测试接口返回的数据格式
      //this.$store.dispatch('getSearchList',{});
      //所以在发请求之前，将searchParams参数发生变化有数值的数据传给服务器
      this.getData();
      //获取用户信息
      //this.$store.dispatch('getUserInfo');
    },
    /*computed:{
      ...mapState({
        goodsList:state=>state.search.searchList.goodsList
        //search仓库有中的数据有很多，如果要一个一个来很可能会出错
        //所以最好还是在仓库中将数据处理一下，然后再组件中映射出来就好
      })
    }*/
    computed:{
      ...mapGetters(['goodsList']),//不是对象写法，仓库中state是分模块的，分了home和search模块。而getter是不分模块的，所以在捞的时候就可以直接写数组
      //把上面决定class的表达式封装一下
      isOne(){
        return this.searchParams.order.indexOf('1')!=-1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2')!=-1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc')!=-1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc')!=-1
      },
      //获取search模块展示产品一共有多少数据
      ...mapState({
        total:state=>state.search.searchList.total
      })
    },
    //数据监听：监听组件身上的属性值发生变化
    //监听路由一变化就发送请求//搜索框输入新的数据或者点击分类路由信息都会变化
    watch:{
      $route(newValue,oldValue){
        //所以每一次发请求之前，应该把上一次的数据123级分类的id清空
          this.searchParams.category1Id='';
          this.searchParams.category2Id='';
          this.searchParams.category3Id='';
          //console.log(123);//测试能被监听到
          //如果发生变化，再次发起请求。this.searchParams是带给服务器的数据
          //console.log(this.searchParams);//没有变化，还是上一次的数据。
          //再次发起请求整理带给服务器的参数
          Object.assign(this.searchParams,this.$route.query,this.$route.params);
          //console.log(this.searchParams);//最新搜索的东西会显示出来了，但是上一次的数据记录没有清掉，依旧存在
          //所以每一次发请求之前，应该把上一次的数据123级分类的id清空
          this.getData();
      }
    },
    methods:{
      //向服务器发请求获取search模块数据，根据参数不同返回不同的数据进行展示
      //将请求封装成函数，需要的时候直接调用
      getData(){
       // this.$store.dispatch('getSearchList',{});//这里第二个参数是一个空对象，不同的参数返回不同的数据
       this.$store.dispatch('getSearchList',this.searchParams);
      },
      //删除分类的名字
      removeCategoryName(){
        //置空就没了
        //带给服务器的参数说明是可有可无的，如果属性值为空的字符串还是会把相应的字段带给服务器
        //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
        //当然置空也行，就是有点消耗宽带
        this.searchParams.categoryName=undefined;//置空名字后，就相当于删除掉了。但是还需要在发送请求
        this.searchParams.category1Id=undefined;
        this.searchParams.category2Id=undefined;
        this.searchParams.category3Id=undefined;
        this.getData();//而前面一删，里面带进来的id我们也是得置空的
        //但是现在路径原来的参数还在，也是需要我们清空的
        //那如何改地址栏呢。一点击×，地址栏也需要修改，如何修改:进行路由的跳转
        //路径发生变化是当路由跳转到的时候才会发生变化，我们让路由跳转到自己的页面上来就好
        //this.$router.push('/search');//这样可以解决路径，但是后面面包屑多的时候，点击一个，剩下的所有面包屑都没了
        //还有就是当是由params参数的时候，不能一起给删除掉了
        //所以要严谨：本意是删除query参数，如果路径当中 出现了params不应该删除，应该路由跳转的时候一起带走
        if(this.$route.params){
          this.$route.push({name:'search',params:this.$route.params});
        }
      },
      //删除关键字
      removeKeyword(){
        //给服务器带的数据keyword置空
        this.searchParams.keyword=undefined;
        //再次发请求
        this.getData();//展示默认的数据
        //要置空输入框的关键字。那如何置空Header组件中输入框的关键字//这两个组件是兄弟关系，涉及到兄弟之间的通信//全局事件总线
        //全局事件总线在main.js配置//通知兄弟组件Header清除关键字
        this.$bus.$emit('clear');
        if(this.$route.query){
          this.$router.push({name:'search',query:this.$route.query});
        }
      },
      attrInfo(attr,attrValue){
        //console.log(attr,attrValue);//拿到了父组件的数值了
        //整理传过来的数据
        //参数格式先要整理好
        let props=`${attr.attrId}:${attrValue}:${attr.attrName}`;
        //数组去重，判断一个值在不在数组里面，如果返回-1，则不存在
        if(this.searchParams.props.indexOf(props)==-1){
           //将这个数据格式扔到上面的searchParams的props中
           this.searchParams.props.push(props);
        }
        //再次发请求
        this.getData();
        //展示在面包屑上,当点击x,要删除//然后再发请求
      },
      removeAttr(index){//想想需不需要传参
        //从数组中删除一个元素
        this.searchParams.props.splice(index,1);
        //再次发请求
        this.getData();
      },
      //排序的操作
      changeOrder(flag){
        //alert(123);
        //现在默认是综合降序，用户接下来可以能点击综合，那就去取成升序。如果点击价格，不知道了，所以传参知道是哪个把
        //flag这个形参，代表用户点击的是综合还是价格
        let originOrder=this.searchParams.order;
        let originFlag=this.searchParams.order.split(':')[0];//1或者2
        let originSort=this.searchParams.order.split(':')[1];
        //准备一个新的order属性值
        let newOrder='';
        //console.log(originFlag,originSort);
        //上来默认是综合降序，怎么确定点的又是综合，传进来的flag和originFlag比较，如果是，证明用户点击的还是综合
        if(flag==originFlag){
          //这个语句确定点击的一定是综合
          newOrder=`${originFlag}:${originSort=="desc"?"asc":"desc"}`
        }else{
          //点击的是价格
          newOrder=`${flag}:${'desc'}`
        }
        //将新的order赋值给searchPArams中的order,然后再发请求
        this.searchParams.order=newOrder;
        this.getData();
        
      },
      //自定义事件的回调函数---获取当前第几页
      getPageNo(pageNo){
        //console.log(pageNo);
        //整理带给服务器的参数
        this.searchParams.pageNo=pageNo;
        //再次发请求
        this.getData();
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>