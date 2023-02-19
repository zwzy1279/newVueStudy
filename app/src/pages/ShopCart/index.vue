<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="updateChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('mins',-1,cart)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="cart.skuNum" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum*cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length>0" @change="updateAllCartChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!--<a class="sum-btn" href="###" target="_blank">结算</a>-->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle';
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData();
      //this.$store.dispatch('getCartList');//{code: 200, message: '成功', data: Array(0), ok: true}
      //没有返回数据，前面当我们点击加入购物车时，通知vuex去向服务器发送请求，可是服务器并没有返回数据，这时因为服务器不知道传进来的用户是哪个，他不知道要返回哪个用户的数据回来
      //所以这里数据是一个空的数组//我们可以用游客身份uuid获取购物车的数据
    },
    methods:{
      //获取个人购物车的数据
      getData(){
         this.$store.dispatch('getCartList')
      },
      //修改产品数量
      //节流
      handler:throttle(async function(type,disNum,cart){
        //type是为了区分时点击+ - 还是输入框
        //disNum是知道变化量  +（变化量为1） -（变化量为-1） input最终个数（并不是变化量）
        //console.log('派发action,修改某一个产品的个数',type,disNum,cart);
        //区分每一个disNum的值，
        switch(type){
          //disNum为变化的量，待会要发送给服务器
          case 'add':
            disNum=1;
            break;
          case 'mins':{
            if(cart.skuNum>1){
              disNum=-1;
            }else{
              disNum=0;
            }
            break;
          }
           
          case 'change':{
            if(isNaN(disNum)||disNum<1){
              disNum=0;
            }else{
              disNum=parseInt(disNum)-cart.skuNum;
            }
            break;
          }
        }
        //派发action//只是修改了服务器中的数据，页面不会进行更新
         try{
          //代表的是修改服务器中的数据成功
          await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum});//派发这个action，顺便更新以下详情页的数据
          //再一次获取服务器最新的数据进行展示
          //上述只是修改了服务器中的数据，页面不会进行更新，所以还需要再调用一次次页面的action
          this.getData();
        }catch(error){
          alert(error.message);
        }
      },500),
      /*async handler(type,disNum,cart){
        //type是为了区分时点击+ - 还是输入框
        //disNum是知道变化量  +（变化量为1） -（变化量为-1） input最终个数（并不是变化量）
        //console.log('派发action,修改某一个产品的个数',type,disNum,cart);
        //区分每一个disNum的值，
        switch(type){
          //disNum为变化的量，待会要发送给服务器
          case 'add':
            disNum=1;
            break;
          case 'mins':{
            if(cart.skuNum>1){
              disNum=-1;
            }else{
              disNum=0;
            }
            break;
          }
           
          case 'change':{
            if(isNaN(disNum)||disNum<1){
              disNum=0;
            }else{
              disNum=parseInt(disNum)-cart.skuNum;
            }
            break;
          }
        }
        //派发action//只是修改了服务器中的数据，页面不会进行更新
         try{
          //代表的是修改服务器中的数据成功
          await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum});//派发这个action，顺便更新以下详情页的数据
          //再一次获取服务器最新的数据进行展示
          //上述只是修改了服务器中的数据，页面不会进行更新，所以还需要再调用一次次页面的action
          this.getData();
        }catch(error){
          alert(error.message);
        }
        
      },*/
      //删除某一个产品的操作
      async deleteCartById(cart){
        try{
          //如果删除成功再次发送请求获取新的数据进行展示
          await this.$store.dispatch('deleteCartListBySkuId',cart.skuId);
          this.getData();
        }catch(error){
          alert(error.message);
        }
      },
      //修改某一个商品的状态
      //当点击勾选不勾选 的状态//把这个当前用户修改的状态给到服务器，然后后去到新的数据在显示出来
      async updateChecked(cart,event){
        try{
          //带给服务器的参数isChecked,不要布尔值，我们要1（选中）或者0（未选中）
        let isCheck=event.target.checked?'1':'0';//为真//为假
        await this.$store.dispatch('updateCheckedById',{skuId:cart.skuId,isChecked:isCheck});
        this.getData();
        }catch(error){
          alert(error.message);
        }
      },
      //删除全部勾选的产品
      async deleteAllCheckedCart(){
        //来接收仓库返回的结果，如果删除成功，则重新发送请求展示新的数据
        try{
          await this.$store.dispatch('deleteAllCheckedCart');
          this.getData();
        }catch(error){
          alert(error.message);
        }
        
      },
      //修改全部产品的选中状态
      async updateAllCartChecked(event){
        try{
          let isChecked=event.target.checked?'1':'0';
          //派发的改action需要传参，是否被选中
          await this.$store.dispatch('updateAllCartIsChecked',isChecked);//这里全选按钮的选中状态传给到仓库
          this.getData();
        }catch(error){
          alert(error.message);
        }
      }
     
    },
    computed:{
      ...mapGetters(['cartList']),
      //购物车数据
      cartInfoList(){
        return this.cartList.cartInfoList||[]
      },
      //计算产品的总价
      totalPrice(){
        let sum=0;
        this.cartInfoList.forEach(item=>{
          sum+=item.skuNum*item.skuPrice;
        });
        return sum;
      },
      //判断底部复选框是否被选中，（全部商品选中，全勾选）
      isAllCheck(){
        //遍历数组，只要全部元素isChecked属性为1就为真
        //只要有一个不死1为假false
        return this.cartInfoList.every(item=>item.isChecked==1);
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>