<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称" >
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格（元）" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" type='number' v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px" v-for="(attr,index) in attrInfoList" :key="attr.id">
          <el-form-item :label="attr.attrName">
            <el-select placeholder="请选择" v-model="attr.attrIdAndAttrValueId"><!--select收集的是option的value值，v-model将这个值收集到attrInfoList.attrIdAndAttrValueId,最后我们在切割赋值给skuInfo-->
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
          <el-form-item :label="saleAttr.saleAttrName">
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndSaleAttrValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border style="width: 100%" :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column
            prop="prop"
            label="label"
            width="80"
            type="selection"
          ></el-table-column>
          <el-table-column
            prop="prop"
            label="图片"
            width="width"
          >
            <template slot-scope="{row,$index}">
                <img :src="row.imgUrl" style="width:100px;height:100px" />
            </template>
        </el-table-column>
          <el-table-column
            prop="imgName"
            label="名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
          >
          <template slot-scope="{row,$index}">
            <el-button type="primary" @click="changeDefault(row)" v-if="row.isDefault==0">设为默认</el-button>
            <el-button v-else>默认</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
export default {
  name: "",
  data() {
    return {
      //存储图片的信息
      spuImageList: [],
      //存储销售属性
      spuSaleAttrList: [],
      //存储平台属性的数据
      attrInfoList: [],
      //存储父组件传进来的spu
      spu: {},
      //收集用户输入的数据
      skuInfo: {
        //父组件传进来的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //在模板v-model双向绑定收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        //需要写代码收集的
        skuAttrValueList: [
        //   {
        //     attrId: 0,  
        //     valueId: 0,
        //   },
        ],
        skuSaleAttrValueList: [
        //   {
        //     id: 0,
        //     saleAttrId: 0,
        //     saleAttrName: "string",
        //     saleAttrValueId: 0,
        //     saleAttrValueName: "string",
        //     skuId: 0,
        //     spuId: 0,
        //   },
        ],
        //默认的图片
        skuDefaultImg: "",
        skuImageList: [
        //   {
        //     id: 0,
        //     imgName: "string",
        //     imgUrl: "string",
        //     isDefault: "string",
        //     skuId: 0,
        //     spuImgId: 0,
        //   },
        ],
      },
      //收集选中的图片数据
      imageList:[]
    };
  },
  methods: {
    //获取skuForm数据
    async getData(category1Id, category2Id, spu) {
      ////存储父组件传进来的spu
      this.spu = spu;
      this.skuInfo.category3Id=spu.category3Id;
      this.skuInfo.tmId=spu.tmId;
      this.skuInfo.spuId=spu.id;
      //此方法在父组件处被调用
      //console.log(11);
      //发请求

      //获取图片的数据
      //let result=this.$API.sku.reqSpuImageList(spu.id);//Promise {<pending>}//没有await和async返回的是Promise对象
      let result = await this.$API.sku.reqSpuImageList(spu.id);
      if (result.code == 200) {
        //this.spuImageList = result.data;
        let list=result.data;
        //给服务器返回的数据添加上isDefault字段
        list.forEach(item=>{
            item.isDefault=0;
        })
        //再将服务器返回的数据赋值给spuImageList
        this.spuImageList=list;
      }
      //获取销售属性
      let result1 = await this.$API.sku.reqSpuSaleAttrList(spu.id);
      //console.log(result1);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      //获取平台属性的数据
      let result2 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      //console.log(result2);
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    //当选项变化会被触发
    handleSelectionChange(params){
        //收集图片相关的数据
        //params参数能够收集选中的那一行的数据
        //console.log(params);
        this.imageList=params;
        //目前图片数据收集还缺少isDefault(当图片设置为默认时isDefault=1,其余为0)
    },
    //当点击设置默认按钮触发的回调
    changeDefault(row){
        //将所有的isDefault设置为0
        this.spuImageList.forEach(item=>{
            item.isDefault=0;
        });
        //将点击的哪个元素的isDefault设置为1
        row.isDefault=1;
        //收集默认图片的地址
        this.skuInfo.skuDefaultImg=row.imgUrl;
    },
    //取消按钮的回调
    cancel(){
        //通知父组件切换场景
        this.$emit('changeScene2',0);
        //清除数据
        Object.assign(this._data,this.$options.data());
    },
    //保存按钮的回调
    async save(){
        //整理参数到skuInfo
        //整理平台属性的参数
        //将收集的平台属性attrInfoList整理好（只需要attrId和valueId参数）赋值给skuInfo的skuAttrValueList
        //attrId和valueId参数我们是将他存在attrInfoList的attrIdAndAttrValueId中（需要split分隔出来）
        //结构
        const {attrInfoList,skuInfo,spuSaleAttrList,imageList}=this;
        //新建数组skuAttrValueList
        let arr=[];
        attrInfoList.forEach(item=>{
            //console.log(item);
            //用户选择的平台属性
            if(item.attrIdAndAttrValueId){
                //console.log(11);
                //进行切割
                const [attrId,valueId]=item.attrIdAndAttrValueId.split(":");
                //console.log(attrId,valueId);
                let obj={attrId,valueId};
                arr.push(obj);
            }
        });
            //将整理好的平台属性赋值给skuInfo
            skuInfo.skuAttrValueList=arr;

        //整理销售属性参数（方法可以像上面一样，也可以用reduce)
        skuInfo.skuSaleAttrValueList=spuSaleAttrList.reduce((prev,item)=>{
            if(item.saleAttrIdAndSaleAttrValueId){
                //进行切割
                const [saleAttrId,saleAttrValueId]=item.saleAttrIdAndSaleAttrValueId.split(":");
                prev.push([{saleAttrId,saleAttrValueId}]);
            }
            return prev;
        },[]);

        //整理图片数据
        skuInfo.skuImageList=imageList.map(item=>{
            return {
                imgName:item.imgName,
                imgUrl:item.imgUrl,
                isDefault:item.isDefault,
                spuImgId:item.id,
            }
        });

        //发保存请求
        let result =await this.$API.sku.reqAddSku(skuInfo);
        //console.log(result);//{code: 200, message: '成功', data: null, ok: true}
        if(result.code==200){
            //提示信息
            this.$message({type:'success',message:'保存成功'});
            //通知父组件切换场景
        this.$emit('changeScene2',0);
        }
    }
  },
};
</script>
  
  <style scoped>
</style>
  