<template>
  <div>
    <!--inline:代表的是行内表单，代表每一行可以放置多个表单元素
    :model用来收集数据
    :label="c1.name" 显示出来的内容
    :value="c1.id"
    -->
    <el-form :inline="true"  class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1" :disabled="show">
          <el-option v-for="(c1,index) in list1" :label="c1.name" :value="c1.id" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" >
        <el-select placeholder="请选择" v-model="cForm.category2Id"  @change="handler2" :disabled="show">
          <el-option v-for="(c2,index) in list2" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" >
        <el-select placeholder="请选择"v-model="cForm.category3Id" @change="handler3" :disabled="show">
          <el-option v-for="(c3,index) in list3" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data(){
    return {
        //一级分类的数据
        list1:[],
        //二级分类的数据
        list2:[],
        //三级分类的数据
        list3:[],
        //收集相应的一级二级三级的id
        cForm:{
            category1Id:'',
            category2Id:'',
            category3Id:'',
        }
    }
  },
  //组件挂在完毕，向服务器发送请求，获取相应的一级分类的数据
  mounted(){
    //获取一级分类的数据的方法
    this.getCategory1List();
  },
  methods:{
    async getCategory1List(){
        
        //获取一级分类的接口（不用携带参数）
        let result=await this.$API.attr.reqCategory1List();
        //console.log(result);//{code: 200, message: '成功', data: Array(17), ok: true}
        if(result.code==200){
            this.list1=result.data;
        }
    },
    //一级分类的select事件回调（当一级分类的option发生变化的时候获取相应的二级分类数据）
    async handler1(){
        //置空二三级的option
        this.list2=[];
        this.list3=[];
        this.cForm.category2Id='';
        this.cForm.category3Id='';
        //解构出一级分类的id
        const {category1Id}=this.cForm;
        this.$emit('getCategoryId',{categoryId:category1Id,level:1});
        //console.log(111)//当一级分类的option发生变化的时候会打印
        //拿着一级分类的id去调用获取二级分类的接口//收集到的一级分类的id在data中的cForm中的category1Id
        let result=await this.$API.attr.reqCategory2List(this.cForm.category1Id);
        //console.log(result);//{code: 200, message: '成功', data: Array(3), ok: true}
        //返回成功存储到list2中
        if(result.code==200){
            this.list2=result.data;
        }
    },
    //二级分类的select回调（当二级分类的option变化时获取相应的三级分类数据）
    async handler2(){//后面一个一定是基于上一个
         //置空三级的option
         this.list3=[];
         this.cForm.category3Id='';
         //解构出二级分类的id
        const {category2Id}=this.cForm;
        this.$emit('getCategoryId',{categoryId:category2Id,level:2});
        let result=await this.$API.attr.reqCategory3List(this.cForm.category2Id);
        //console.log(result);
        //返回成功存储到list2中
        if(result.code==200){
            this.list3=result.data;
        }
    },
    //二级分类的select回调（当二级分类的option变化时获取属性列表，并展示数据）
    handler3(){
        //拿着一二三级的id去向服务器发送请求，获取相关的数据
        //展示数据是在另一个组件下展示的
        //所以得将一二三级的id先传给要展示的那个组件
        //然后再让哪个组件拿着一二三级的id去向服务器发送请求，获取相关的数据
        //组件之间的通信
        //解构出一级分类的id
        const {category3Id}=this.cForm;
        this.$emit('getCategoryId',{categoryId:category3Id,level:3});
       
    }
    
  }
};
</script>

<style scoped>
</style>
