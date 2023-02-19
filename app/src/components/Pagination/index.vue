<template>
    <div class="pagination">
        <!--<h2>{{ startNumEndNum }}==={{ pageNo }}</h2>-->
      <!--上-->
      <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
      <button v-if="startNumEndNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
      <button v-if="startNumEndNum.start>2">···</button>
  
      <!--连续的条数-->
      <!--
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      -->
      <!--中间部分-->
      <template>
        <button v-for="(page,index) in startNumEndNum.end" :key="index" v-if="page>=startNumEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{ page }}</button>
      </template>

      <!--下-->
      <button v-if="startNumEndNum.end<totalPage-1">···</button>
      <button v-if="startNumEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
      <button :disabled="pageNo==totalPage"    @click="$emit('getPageNo',pageNo+1)">下一页</button>
      
      <button style="margin-left: 30px">共{{ total }}条</button>
      
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      props:['pageNo','pageSize','total','continues'],
      computed:{
        //计算总共多少页，香山取整
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        //计算连续的页码的起始数字和结尾数字（连续的页码数起码是5）
        startNumEndNum(){
            const {continues,pageNo,totalPage,total}=this;
            //定义两个变量存储数字的起始和结束
            let start=0;
            let end=0;
            //连续页码数字是5的时候，如果出现不正常的现象（页码数不够5页的时候)
            //不正常现象（总页数还没有连续的页码数多）
            if(continues>totalPage){
                start=1;
                end=totalPage;
            }else{
                //正常现象（连续页码数为5时，总的页码数大于连续页码数）
                //start=pageNo-2;//数据不能写死，要是规定连续页码数为7，那就不能减2，要减3了
                start=pageNo-parseInt(continues/2);
                end=pageNo+parseInt(continues/2);
                //但是当当前页是第一页时，连续的5个数字是 -1 0 1 2 3显然是不对的。
                //所以加入当前是第一页，应该是1 2 3 4 5
                //加入当前是第二页，0 1 2 3 4;正常也应该是 1 2 3 4 5
                //把出现不正常的数据-1,0，我们应该是纠正
                if(start<1){//要么为当前页数为1，要么当前页数为2
                    start=1;
                    end=continues;
                }
                //把出现不正常的现象（end数字大于总页码）
                if(end>totalPage){
                    end=totalPage;
                    start=totalPage-continues+1;
                }
            }
            return {start,end};
        }
      }
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align:center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>
  