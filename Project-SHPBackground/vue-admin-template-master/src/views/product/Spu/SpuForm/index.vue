<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu"
      ><!--将用户填写的数据收集到spu中，同样spu在修改时作为接收spu信息的容器-->
      <el-form-item label="SPU名称">
        <el-input placeholder="spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!--
            上传图片：action图片上传的地址，
            list-type:文件列表的类型
            on-preview图片预览的时候会触发
            on-remove当删除图片的时候会触发
            :file-list="spuImageList"展示的数据（数组元素必须有name,url属性）
        on-success当照片上传成功-->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}个未选择`"
          v-model="attrIdAndAttrName"
          ><!--attrIdAndAttrName收集未选择的id和名字-->
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="(unselect, index) in unSelectSaleAttr"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <!--@close="handleClose(tag)"-->
              <!--展示已有的属性值列表-->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!--input和button添加按钮之间的切换-->
              <!--
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"-->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!--@click="showInput"--><!--添加属性值-->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >+ 添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200">
            <template slot-scope="{ row, $index }"
              ><!--点击删除，删除掉整条属性-->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
        <!--子传父-->
      </el-form-item>
    </el-form>
  </div>
</template>
 
 <script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //点击修改spu按钮，服务器会给spu返回数据//如果是点击添加spu，我们可以用spu来收集数据//等到最后点击保存的时候，在将收集到的数据传给服务器
      //存储服务器传回来的spu信息，可以用于修改的时候展示
      //spu:{},//存储spu基本文本信息
      spu: {
        //三级分类的id
        category3Id: 0,
        //描述
        description: "",
        //spu名称
        spuName: "",
        //"id": 0,
        //平台的id
        tmId: 0,
        //收集spu图片的信息
        spuImageList: [
          //   {
          //     id: 0,
          //     imgName: "",
          //     imgUrl: "",
          //     spuId: 0,
          //   },
        ],
        //平台属性和属性值的收集
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //     //   {
          //     //     baseSaleAttrId: 0,
          //     //     id: 0,
          //     //     isChecked: "string",
          //     //     saleAttrName: "string",
          //     //     saleAttrValueName: "string",
          //     //     spuId: 0,
          //     //   },
          //     ],
          // },
        ],
      },
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //存储spu数据
      saleAttrList: [], //存储销售属性的数据
      attrIdAndAttrName: "", //收集未选择的销售属性的id
    };
  },
  methods: {
    //照片墙删除某一张图片会触发
    handleRemove(file, fileList) {
      //console.log(file, fileList);
      //file代表删除的是删除的那张图片
      //fileList照片墙删除后剩余的其他图片
      //对于服务器而言，不需要name,url字段，将来对于图片的数据在交给服务器的时候，需要处理的
      this.spuImageList = fileList;
    },
    //照片图片预览的回调
    handlePictureCardPreview(file) {
      //将图片地址赋值
      this.dialogImageUrl = file.url; //然后这个dialogImageUrl不是用于展示
      this.dialogVisible = true;
    },
    //照片请图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      //收集图片的信息
      this.spuImageList = fileList;
    },
    //添加新的销售属性
    addSaleAttr() {
      //已经收集到了需要添加的信息，当点击添加时，将数据添加到下面的table中
      //收集在了data中的attrIdAndAttrName，有id和name，需要我们分别切割出来split
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      //然后将数据赋值给data中spu存储销售信息的spuSaleAttrList: [],
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleValueList: [] };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      //清空数据
      this.attrIdAndAttrName = "";
    },
    //添加按钮的回调 添加属性值
    addSaleAttrValue(row) {
      //点击销售属性当中的销售按钮，button切换成input输入框
      //console.log(row);
      //通过添加，通过当前属性的inputVisible进行控制
      //row.inputVisible=true;//得是响应式数据
      this.$set(row, "inputVisible", true);
    },
    //input失去焦点的回调
    handleInputConfirm(row) {
      //将新增的属性值放进spu.spuSaleAttrValueList中
      //结构出销售属性当中收集的属性
      const { baseSaleAttrId, inputValue } = row;
      //新增的销售属性值不能为空
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      //属性值不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) return;
      //新增的销售属性值
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      //修改inputVisible为false,显示button
      row.inputVisible = false;
    },
    //初始化spuForm数据
    async initSpuData(spu) {
      //console.log('发请求',spu);//这里spu接受到的是选中的那一行的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      //console.log(spuResult);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      //获取品牌信息
      let tradeMark = await this.$API.spu.reqTradeMarkList();
      //console.log(tradeMark);
      if (tradeMark.code == 200) {
        this.tradeMarkList = tradeMark.data;
      }
      //获取spu图片的信息
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      //console.log(spuImageResult);//{code: 200, message: '成功', data: Array(1), ok: true}
      if (spuImageResult.code == 200) {
        //this.spuImageList = spuImageResult.data;
        //由于照片墙显示的图片时多张，需要用到数组。//数组里面每个元素需要有name和url字段
        //需要把服务器返回的数据进行修改
        let listArr = spuImageResult.data;
        //console.log(listArr);
        listArr.forEach((item) => {
          //console.log(item);//{id: 2296, spuId: 1029, imgName: '鲸鱼汉堡.jpg', imgUrl: 'http://139.198.127.41:9000/sph/20230212/鲸鱼汉堡.jpg'}
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        //把整理好的数据赋值给
        this.spuImageList = listArr; //this.spuImageList用于展示和收集，等到最后在收集到spu的spuImageList中
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      //console.log('2'+saleResult);
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
      //console.log(this.unSelectSaleAttr);
    },
    //点击保存按钮的回调
    async addOrUpdateSpu(){
        //整理参数：需要整理照片墙数据(需要imageName和imageUrl)
        this.spu.spuImageList=this.spuImageList.map(item=>{
            return {
                imageName:item.name,
                imageUrl:((item.response&&item.response.data)||item.url)
            }
        });
        //发请求
        let result=await this.$API.spu.reqAddOrUpdateSpu(this.spu);
        //console.log(result);//{code: 200, message: '成功', data: null, ok: true}
        if(result.code==200){
            this.$message({type:'success',message:'保存成功'});
            //通知父组件场景回到0
            this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'});
        }
        //清除数据
        Object.assign(this._data,this.$options.data());
    },
    //点击添加spu按钮，发请求的函数
    async addSpuData(category3Id){
        //console.log('spu');
        //添加spu的时候收集三级分类的id
        this.spu.category3Id=category3Id;
        //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      //console.log(tradeMark);
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      };
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      //console.log('2'+saleResult);
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //取消按钮
    cancel(){
        //取消按钮的回调，通知父亲切换成场景0
        this.$emit('changeScene', {scene:0,flag:''});
        //清除数据
        Object.assign(this._data,this.$options.data());
    }
  },
  computed: {
    //计算还未选择的销售属性//展示在select上
    unSelectSaleAttr() {
      //return 'er';
      //整个平台有三个属性，--spuSaleAttrList
      //当前spu有属于自己的属性，---spu.spuSaleAttrList
      //计算还未选择的，就是spuSaleAttrList-spu.spuSaleAttrList.length
      //数组过滤的方法：可以从已有的数组当中过滤出来用户需要的元素，并返回一个新的数据
      return this.saleAttrList.filter((item) => {
        //every数组的方法，会返回一个布尔值
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
};
</script>
 
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
 