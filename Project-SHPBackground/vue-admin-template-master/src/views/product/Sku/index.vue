<template>
  <div>
    <el-table border width="100%" :data="records">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column prop="skuName" label="名称" width="90"></el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="130"
      ></el-table-column>
      <el-table-column prop="prop" label="默认图片" width="200">
        <template slot-scope="{ row, $index }">
          <!--{{ row }}-->
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(kg)"
        width="80"
      ></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="success" icon="el-icon-upload2" @click="upSale(row)" v-if="show==1">
        </el-button>
          <el-button type="success" icon="el-icon-download" v-else @click="downSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click="editSku()"></el-button>
          <el-button type="info" icon="el-icon-info" @click="lookSkuDetail(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <!--@current-change="getPageList"
      @size-change="handleSizeChange"-->
    <el-pagination
      style="text-align: center"
      :current-pages="page"
      :page-size="limit"
      :page-sizes="[3,5,10]"
      layout="prev, pager, next,jumper,->,sizes,total"
      :total="total"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!--抽屉效果并不是写在上面button中-->
     <!--:before-close="handleClose"   :direction="direction"-->
     <el-drawer title="我是标题" :visible.sync="isShowDrawer"  size="50%" :show-close="false">
                <el-row>
                    <el-col :span="5">名称</el-col>
                    <el-col :span="16">{{skuDetailList.skuName }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">描述</el-col>
                    <el-col :span="16">{{ skuDetailList.skuDesc }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">价格</el-col>
                    <el-col :span="16">{{ skuDetailList.price }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">平台属性</el-col>
                    <el-col :span="16">
                       <template>
                        <el-tag type="success" v-for="(attr,index) in skuDetailList.skuAttrValueList" :key="attr.id" style="margin-right:10px">{{ attr.valueName }}</el-tag>
                       </template>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">商品图片</el-col>
                    <el-col :span="16">
                        <!--轮播图-->
                        <el-carousel  height="150px">
      <el-carousel-item v-for="item in skuDetailList.skuImageList" :key="item.id">
        <img :src="item.imgUrl" style="width:100px;height:100px"/>
      </el-carousel-item>
    </el-carousel>
                    </el-col>
                </el-row>
            </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      //该页面展示几条数据
      limit: 3,
      //当前页码(存储服务器返回的当前页码)
      page: 1,
      //存储数据总条数
      total: 0,
      //存储sku所有条数据
      records: [],
      //上架和下架之间的切换
      show:1,//默认为上架
      //存储skuList的详细信息
      skuDetailList:{},
      //存储抽屉展示状态
      isShowDrawer:false,//默认为不显示
      //抽屉出来方向
      direction:'rtl',//默认为从右到左
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    //获取sku列表的数据
    async getSkuList(pages=1) {
        this.page=pages;
      //解构
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList2(page, limit);
      //console.log(result);
      if (result.code == 200) {
        //收集服务器返回的数据
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    //改变最大限制数的回调
    handleSizeChange(limit){
        this.limit=limit;
    },
    //上架按钮的回调
    async upSale(row){
        let result=await this.$API.sku.reqSale(row.id);
        //console.log(result);//{code: 200, message: '成功', data: null, ok: true}
        if(result.code==200){
            //上架成功的话，要将图标展示成下架
            this.show=0;//1代表上架，0代表下架
            //提示信息
            this.$message({type:'success',message:'上架成功'});
        }
    },
    //下架按钮的回调
    async downSale(row){
        let result=await this.$API.sku.reqCancel(row.id);
        //console.log(result);
        if(result.code==200){
            //下架成功的话，要将图标展示成上架
            this.show=1;//1代表上架，0代表下架
            //提示信息
            this.$message({type:'success',message:'下架成功'});
    }
  },
  //编辑按钮的回调
  editSku(){
    alert('正在开发中...');
  },
  //查阅sku详情的按钮的回调reqSkuById
  async lookSkuDetail(row){
    //弹出抽屉展示
    this.isShowDrawer=true;
    let result=await this.$API.sku.reqSkuById(row.id);
    //console.log(result);
    if(result.code==200){
        //存储数据到data的skuList中
        this.skuDetailList=result.data;
        
    }
  },
  
  
}}
</script>
<style>
 /*.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }*/
  
  </style>
<style scoped>
    .el-row .el-col-5{
        font-size:18px;
        text-align:right;
    }
    .el-col {
        margin:10px 10px;
    }
    >>>.el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>
