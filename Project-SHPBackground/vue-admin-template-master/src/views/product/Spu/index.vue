<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!--底部这里会有三部分进行切换-->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!--这里按钮将来用hintbutton替换-->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="lookSkuList(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--@current-change="getPageList"
      @size-change="handleSizeChange"-->
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :current-page="page"
          :total="total"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev,pager,next,jumper,->,sizes,total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
      <!--添加|修改spu-->
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <!--添加sku-->
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScene2="changeScene2"
      ></SkuForm>
      <!--查看sku--><!-- :visible.sync="dialogVisible"控制是否可见  :before-close="handleClose"关闭之前的回调-->
      <el-dialog :title="`${spu.spuName}的sku列表`" width="60%" :visible.sync="dialogVisible" v-loading="loading" :before-close="handleClose">
        <!--要展示的sku数据-->
        <el-table border :data="skuList">
          <el-table-column prop='skuName' label="名称" width="width"></el-table-column>
          <el-table-column prop='price' label="价格" width="110"></el-table-column>
          <el-table-column prop='weight' label="重量" width="100"></el-table-column>
          <el-table-column prop='prop' label="默认图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" style="width:100px;height:100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动的可操作性
      show: true, //在展示spu数据列表三级联动默认可以操作，其他的禁止使用
      page: 1, //分页器当前第几页
      limit: 3, //每一页需要展示多少条数据
      total: "", //将收集到的total赋值给分页器
      //服务器返回的数据，要用来展示的
      records: [],
      //组件切换的状态，默认是0，展示spu列表
      scene: 0, //0代表展示spu列表数据 1添加|修改spu 2添加Sku
      //控制sku对话框是否可见
      dialogVisible:false,//默认为不可见，当点击查看才可见,
      //存储选中的某行的数据
      spu:{},
      //要展示的sku列表数据
      skuList:[],
      //加载数据状态是否开启
      loading:true,//默认为加载(获取到数据再停止加载)
    };
  },
  components: {
    SkuForm,
    SpuForm,
  },
  methods: {
    //三级联动自定义事件的回调，可以把子组件相对应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      //console.log(categoryId);//可以拿到子组件传来的id
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //如果是三级分类，那么获取品牌属性
        this.getSpuList();
      }
    },
    //获取Spu列表的方法
    async getSpuList(pages = 1) {
      //有三级分类的时候再调用
      this.page = pages;
      //解构
      const { page, limit, category3Id } = this;
      //发请求
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      //console.log(result);//{code: 200, message: '成功', data: {…}, ok: true}
      if (result.code == 200) {
        //将服务器返回的spu records数据存储到data中的records中，还有total
        this.total = result.data.total; //将收集到的total赋值给分页器
        this.records = result.data.records;
      }
    },
    /* //点击分页器的第几页按钮回调
    //点击第几页，page就为第几页
    handleCurrentChange(page){
        //console.log(page);
        this.page=page;
        this.getSpuList();
    },*/
    //当分页器的某一页展示数据发生变化的回调
    handleSizeChange(limit) {
      this.limit = limit;
      //再次发请求更新页面
      this.getSpuList();
    },
    //添加spu(不同于添加sku)
    addSpu() {
      this.scene = 1;
      //通知子组件spuForm发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    //修改spu（跟添加spu用一样的组件）
    updateSpu(row) {
      this.scene = 1;
      //获取子组件spuForm的节点，用节点来调用子组件的方法
      this.$refs.spu.initSpuData(row);
    },
    //子传父过来的自定义事件回调（spuForm)
    changeScene({ scene, flag }) {
      //切换场景（结构）
      //console.log(scene);//0
      this.scene = scene;
      //重新发送请求更新页面
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    //删除spu的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      //console.log(result);//{code: 200, message: '成功', data: null, ok: true}
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    //添加sku按钮的回调
    addSku(row) {
      //console.log(row);
      //场景切换为2
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row); //在父组件中国将skuForm所需要用到的参数传过去
    },
    //改变场景
    changeScene2(scene) {
      this.scene = scene;
    },
    //查看sku列表的按钮回调
    async lookSkuList(spu) {
      //console.log(row);//能拿到该行的spu数据
      //对话框设置为显示状态
      this.dialogVisible=true;
      //将传来的参数spu数据存储起来（后面要用到spuName展示数据，还有spuId要发送获取skuList列表的数据）
      this.spu=spu;
      //发请求，获取要展示的sku数据
      let result=await this.$API.sku.reqSkuList(spu.id);
      //console.log(result);//{code: 200, message: '成功', data: Array(7), ok: true}
      if(result.code==200){
        //存储skuList数据
        this.skuList=result.data;
        //当服务器返回数据后结束加载
        this.loading=false;
      }
    },
    //叉掉查看skuList列表的按钮的回调
    handleClose(done){
      //将加载状态再次开启
      this.loading=true;
      //将服务器返回的skuList清除
      this.skuList='';
      //管理对话框
      done();
    }
  },
};
</script>

<style scoped>
</style>
