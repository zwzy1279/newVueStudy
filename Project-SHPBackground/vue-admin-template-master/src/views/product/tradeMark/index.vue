<template>
  <div>
    <!--按钮el-button  type="primary"背景颜色为蓝色 icon="el-icon-plus"文字前加一个加号-->
    <el-button type="primary" icon="el-icon-plus" @click="showDialog"
      >添加</el-button
    >
    <!--表格组件el-table  单纯一根横线加no data-->
    <!--
            表格组件属性：
            data:表格组件将来需要展示的数据（数据类型）
            border:是给表格添加边框
            :data="data"加了这一个将数据条数列数直接绘制表格出来
        -->
    <el-table style="width: 100%" border :data="list">
      <!--列column,属性干嘛的不知道，得查-->
      <!--
                column属性：（一列一列的拍下去）：下面一共有4列
                label:显示标题
                width:对应列的宽度
                prop:对应列的内容的字段名
                align:标题的对其方式

                一列当中有几条数据（已经在table处:data='list'搞定了）
                现在需要搞一列中有什么数据  prop="prop"一列中展示的数据  不用带list
            -->
      <el-table-column
        prop="id"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo" width="width">
        <!--这里第三列用的prop='logoUrl' 最终展示出来的是链接http://47.93.148.192:8080/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg
                不是图片，而我们想要的是图片，所以使用作用域插槽-->
        <template slot-scope="{ row, $index }"
          ><!-- {{ row }}{{ $index }}这里row拿到的是每一个list的数据，$index为每一个数据的下标-->
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页器
            当前第几页，数据总条数，每一页展示的条数，连续页码数
            @size-change="handleSizeChange"
            @current-change="handlerCurrentChange"
        -->

    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :pager-count="7"
      layout="prev,pager,next,jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    ></el-pagination>
    <!-- -> 是向右对齐-->

    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
      :model="tmForm"
    >
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--这里收集图片的数据：不能使用v-model,因为不是表单元素
            action:设置图片上传的地址
            :on-success可以检测到图片上传成功，当图片上传成功会执行一次
            :before-upload可以上传图片之前，回执行一次
            -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    //自定义校验规则
    var validatePass = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("品牌名称2-10位"));
      } else {
        callback();
      }
    };
    return {
      //代表的分页器第几页
      page: 1,
      //当前页数展示数据的条数
      limit: 3,
      //总共条数
      total: 0,
      //列表展示的数据
      list: [],
      //对话框显示与隐藏控制的属性
      dialogFormVisible: false,
      //上传图片使用的属性
      imageUrl: "",
      //收集品牌的信息，待会要传给服务器的
      tmForm: {
        //对象身上的属性不能乱写
      },
      //表单验证规则
      //只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
      rules: {
        //品牌名称的验证规则
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          /*{
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },*/
          //自定义校验规则
          { validator: validatePass, trigger: "change" },
        ],
        //品牌logo的验证规则
        logoUrl: [{ required: true, message: "请选择品牌的图片" }],
      },
    };
  },
  mounted() {
    //获取列表数据的方法
    this.getPageList();
    //console.log(this.$API)
    //console.log(this.$API.trademark)
  },
  methods: {
    //获取品牌列表的数据
    async getPageList(pager = 1) {
      //如果用户没有点击分页器，那么默认显示的页码是当前第一页
      //如果用户有点击，那么这个pager就会改变，再赋值给data中的page
      //console.log(pager);//能够拿到当前点击的页码
      this.page = pager;
      //解构reqTradeMarkList
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      //console.log(result);
      if (result.code == 200) {
        //服务器返回数据成功，将数据存储到当前组件//名字和图片
        //展示数据的总条数
        this.total = result.data.total;
        //列表数据
        this.list = result.data.records; //都是数组
      }
    },
    /*
        //当点击分页器的某一页，修改当前页
        handlerCurrentChange(pager){
            //console.log(pager);//可以拿到当前点击的页码
            this.page=pager;
            //重新发送请求，获取新的数据进行展示
            this.getPageList();
        },*/
    //当分页器某一页需要展示数据条数发生变化时候回触发
    handleSizeChange(limit) {
      //console.log(limit);//可以拿到某一页最大展示数据条数
      this.limit = limit;
      this.getPageList();
    },
    //点击添加品牌的按钮，展示对话框
    showDialog() {
      this.dialogFormVisible = true;
      //再次点击显示对话框时，得将数据清除
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    //点击修改品牌的按钮，展示对话框
    updateTradeMark(row) {
      //显示对话框
      this.dialogFormVisible = true;
      //console.log(row);//能够拿到用户选中的某一行的信息，这里能拿到id
      //将已有品牌信息赋值给收集的tmForm//后面点击确定时，再传给服务器去判断是增加还是修改
      //this.tmForm = row;//当点击修改按钮时，修改文字和图片但还没点击确定的时候不能影响到页面效果//必须得等点击确定后
      //所以用浅拷贝
      this.tmForm = { ...row };
    },
    //上传图片相关的回调
    //图片上传成功
    handleAvatarSuccess(res, file) {
      //res:上传成功之后返回的前端数据
      //file上传之后服务器返回的前端数据
      //console.log(res);//code: 200, message: '成功', data: 'http://139.198.127.41:9000/sph/20230209/12.jpg', ok: true}
      //console.log(file);
      //收集品牌图片数据
      this.tmForm.logoUrl = res.data; //图片地址
      //this.imageUrl = URL.createObjectURL(file.raw);
    },
    //图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //弹出对话框，点击确定按钮后
    addOrUpdateTradeMark() {
      //当全部验证字段通过，再去书写业务逻辑ruleForm
      this.$refs.ruleForm.validate(async (success) => {
        //console.log(success)//true
        //如果全部字段符合条件
        if (success) {
          //将对话框隐藏
          this.dialogFormVisible = false;
          //将数据传给服务器
          let result = await this.$API.trademark.reqAddUpdateTradeMark(
            this.tmForm
          );
          //console.log(result);//{code: 200, message: '成功', data: null, ok: true}
          if (result.code == 200) {
            //返回数据成功：
            //显示添加或者修改数据成功
            this.$message(this.tmForm.id ? "修改品牌成功" : "添加品牌成功");
            //添加或者修改品牌成功，需要再次发起请求更新页面
            //如果添加品牌，停留在第一页。//修改品牌应该留在当前页面//将当前页码传过去
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          return false;
        }
      });
    },
    //点击删除按钮，删除品牌
    deleteTradeMark(row) {
      //弹出删除提示框
      this.$confirm(`你确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //当用户点击确定的按钮时会触发
          //将当前的id传给删除请求接口的函数，通知服务器删除
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            //弹出信息提示框
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //再次向服务器发送请求
            //如果当前页数据条数，则跳转到上一页，否则删除后停留在当前页
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          //当用户点击取消的按钮时会触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

      //删除后显示成功与失败的信息
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
