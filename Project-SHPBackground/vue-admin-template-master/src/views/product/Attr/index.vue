<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <!--表格：属性平台属性-->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
                >修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加属性|修改属性的结构
        :model="attrInfo"将数据收集到attrInfo
    -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAttrValue"
            :disabled="!attrInfo.attrName"
            >添加属性值</el-button
          >
          <el-button @click="isShowTable = true">取消</el-button>
          <el-table
            style="width: 100%; margin: 20px 0px"
            border
            :data="attrInfo.attrValueList"
          >
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="prop" label="属性名称" width="width">
              <template slot-scope="{ row, $index }">
                <!--span和input进行切换，默认展示input，失去焦点时切换成为span.但是单纯这样子v-if="flag" @blur="flag=false" @keyup.native.enter="flag=false"，v-else @click="flag=true"
                        不能控制单独一个，一个flag没有办法控制单独一个的切换-->
                <el-input
                  placeholder="请属性值名称"
                  v-model="row.valueName"
                  size="mini"
                  v-if="row.flag"
                  @blur="toLook(row)"
                  :ref="$index"
                  @keyup.native.enter="toLook(row)"
                ></el-input>
                <span
                  v-else
                  @click="toEdit(row, $index)"
                  style="display: block"
                  >{{ row.valueName }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="250">
              <template slot-scope="{ row, $index }">
                <!--气泡确认框-->
                <el-popconfirm :title="`确定删除${row.valueName}？`" @onConfirm="deleteAttrValue($index)">
                
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"
                  ></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
          <el-button @click="isShowTable = true">取消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //接收平台属性的数据
      attrList: [],
      //这个属性控制table表格的显示与隐藏
      isShowTable: true, //刚开始默认为显示false
      //收集新增属性|修改属性使用的 reqAddAttr
      //收集到后面保存的时候我们需要将数据传递给服务器的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，属性值有多个所以用数组
          /* {
            attrId: 0, //相应属性名的id
            //"id": 0,//服务器下发的，不用
            valueName: "", //属性值名字
          },*/
        ],
        categoryId: '', //三级分类的id,前面我们是因为三级分类一确定才确定的平台属性
        categoryLevel: 3, //因为服务器也需要区分是几级id,但这里一般是三级id
        //"id": 0
      },
    };
  },
  methods: {
    //自定义事件的回调
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
        this.getAttrList();
      }
    },
    //获取平台属性的数据
    async getAttrList() {
      //console.log(11);
      //解构
      const { category1Id, category2Id, category3Id } = this;
      //发送请求
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      //console.log(result);//{code: 200, message: '成功', data: Array(9), ok: true}
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值回调
    addAttrValue() {
      //前面我们收集用户添加的数据在attrInfo中
      //现在当我们点击添加属性值的时候，我们应该向attrInfo中添加属性值的数据，以便显示输入框
      this.attrInfo.attrValueList.push({
        //attrId: undefined, //相应属性名的id,刚添加我们并不知道他的属性值id是什么
        //对于修改属性，可以在已有的属性值基础上新增新的属性值（新增的属性值的时候，需要把已有的属性的id赋值给attrId
        attrId: this.attrInfo.id, //为什么写这个this.attrInfo.id，是因为前面在attrInfo收集到row选中的数据了
        //如果添加属性值，那么这个id暂时没有就是undefined。
        //如果是修改属性，那么就是已经拿到row的id了
        valueName: "", //属性值名字
        //控制span和input进行切换
        flag: true, //默认展示input//把flag放在这里给每一个添加
        //flag属性：给每一个属性值添加一个标记flag,用户切换查看模式与编辑模式，好处：每一个属性可以控制自己的模式切换
        //当前flag属性，响应式数据（数据变化视图跟着变化)
      });
      //光标聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性的按钮的回调
    addAttr() {
      //alert(1);
      this.isShowTable = false;
      //清除上一次用户添加在框里的数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [],
        categoryId: 0, //三级分类的id,前面我们是因为三级分类一确定才确定的平台属性
        categoryLevel: 3, //因为服务器也需要区分是几级id,但这里一般是三级id
      };
      //将用户输入的数据整理在attrInfo中
      //前面v-model收集好了大部分
      //
    },
    //修改某一个属性
    updateAttr(row) {
      this.isShowTable = false;
      //将选中的数据row赋值给收集到的attrInfo，方便展示数据，以及展示数据
      //由于数据结构当中存在对象里面套数组，数组里面有套对象，因此需要使用深拷贝解决这类问题
      //this.attrInfo={...row};
      this.attrInfo = cloneDeep(row);
      //在修改某一个属性的时候，将相应的的属性值元素添加上flag这个标记
      this.attrInfo.attrValueList.forEach((item) => {
        //this.flag=false
        //这样书写页可以给属性添加上flag，但是会发现flag不是响应式数据，不会跟着变化
        //因为vue无法探测普通新增property，这样书写的属性并非响应式属性
        this.$set(item, "flag", false);
      });
    },
    //input失去焦点时，切换成span
    toLook(row) {
      //如果属性值为空就不能作为属性值，需要给用户提示
      if (row.valueName.trim() == "") {
        this.$message("请输入一个正常的属性值");
        return; //终端当前程序，该函数后面的代码不再执行
      }
      //如果用户输入的属性值跟前面的有一样的，也提示信息，不给继续
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          //当前选中的数据没有跟前面所有的相同
          return row.valueName == item.valueName; //如果true,那么证明重复了
        }
      });
      //console.log(isRepeat)//如果true证明重复了，那么我们重复了
      if (isRepeat) {
        this.$message("您输入重复了，请重新输入");
        return;
      }
      // row.flag=!row.flag;
      row.flag = false;
    },
    //当点击span,切换成input
    toEdit(row, index) {
      row.flag = true;
      //我们想让光标聚焦,获取input节点，实现自动聚焦
      //获取该span节点this.$refs
      //点击span,切换成input.但需要注意，对于浏览器而言，页面重绘和重排消耗时间
      //$nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        //获取响应的input表单元素实现聚焦
        this.$refs[index].focus();
      });
    },
    //气泡确认框确定的按钮的回调
    deleteAttrValue(index){
        //删除属性值
        this.attrInfo.attrValueList.splice(index,1);//此时还没有点击保存，所以删除的还是保存在此组件中的//后面就要把收集到的数据传给服务器
    },
    //点击保存按钮，将收集到的属性和属性值传给服务器保存（进行服务器数据属性和属性值的添加和修改操作）
    async addOrUpdateAttr(){//reqAddOrUpdateAttr
        //alert(1111);
        //整理参数
        //过滤掉属性值为空的还有删除掉flag属性
        this.attrInfo.attrValueList.filter(item=>{
            //过滤掉属性值不是空的的flag值
            if(item.valueName!=''){
                //删除掉flag属性
                delete item.flag;
                return true;
            }
        })
        //发请求
       try{
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
            //console.log(result)//{code: 200, message: '成功', data: null, ok: true}
            //提示信息
            this.$message({type:'success',message:'保存成功'});
            this.isShowTable=true;
            this.getAttrList();
       }catch(error){
        //this.$message('保存成功');
       }
            
        
    }
  },
};
</script>

<style scoped>
</style>
