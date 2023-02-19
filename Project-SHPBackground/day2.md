1.product静态组件下的tradeMark品牌管理组件业务
（1）搭建产品product静态组件下的attr商品管理组件（el-button,el-table,el-column)分页器
（2）写获取品牌列表的接口api（product的所有接口统一暴露）
（3）回到main.js中引入相关接口，挂在原型上（后面调用接口直接$API拿到）
（4）去vue.config.js重新解决跨域问题（分别处理登录和获取品牌）
（5）回到TradeMark组件调用接口函数，向服务器发送请求
（6）将服务返回的数据存储到该组件中
（7）动态展示数据（elementUI展示数据，用到作用域插槽）
        展示品牌列表
        解决分页器
（8）完成当点击tradeMark组件的添加，修改按钮的业务
两者弹出的对话框是同一个，用户进行输入的信息要进行规则校验，校验成功后在继续业务
校验方法：
法一：为要验证的表单添加rule属性，规则写在data中。将名字写回要校验的元素的prop属性
法二：自定义校验：在data返回中写{ validator: validatePass, trigger: "change" },然后在返回之外的data中写validatePass的回调函数，里面有三个参数，函数体为校验的规则代码（自定义）

添加按钮
>1.当点击添加按钮时，弹出对话框（ElementUI搭建静态）（绑定的事件不用传参）
>2.收集对话框用户输入的品牌名称和图片地址（el-load)，收集在当前组件的data中
>3.当点击取消按钮时，当前对话框隐藏起来，并且将上一次输入的内容置空
>4.当用户点击确定时，拿着收集到的数据向服务器发送添加品牌的请求this.$API.trademark.reqAddUpdateTradeMark(this.tmForm);
>5.服务器返回成功的话，弹出信息框（this.$message)提示
>6.重新调用获取并展示品牌信息的接口函数,更新this.getPageList();

修改按钮：
>1.当点击添加按钮时，绑定的事件将当前的row传给函数，弹出对话框（ElementUI搭建静态）
>2.将传进来的row参数浅拷贝赋值给this.tmForm(弹出的对话框有信息)
>3.当点击取消按钮时，当前对话框隐藏起来
>4.当用户点击确定时，拿着this.tmForm向服务器发送修改品牌的请求this.$API.trademark.reqAddUpdateTradeMark(this.tmForm);
>5.服务器返回成功的话，弹出信息框（this.$message)提示
>6.重新调用获取并展示品牌信息的接口函数,更新this.getPageList();
(9)完成当点击tradeMark组件的删除按钮的业务
>1.当点击删除按钮时，绑定的事件将当前的row传给函数，弹出提示框（ElementUI搭建静态）
>2.当点击取消按钮时，当前对话框隐藏起来
>3.当用户点击确定时，拿着this.tmForm.id向服务器发送删除品牌的请求this.$API.trademark.reqDeleteTradeMark(row.id);
>4.服务器返回成功的话，弹出信息框（this.$message)提示
>5.重新调用获取并展示品牌信息的接口函数,更新this.getPageList();

2.product静态组件下的attr属性管理组件业务
(1)三级联动静态组件(elementUI)
此三级联动组件因为后面又有组件也是有用到，所以将此组件作为非路由组件（写在components文件夹中）。
然后回到main.js注册成为全局组件（Vue.component)
回到product下的Attr下使用三级联动的标签<CategorySelect>
（2）写好获取一级，二级，三级属性的接口（只有一级接口不需要传参）
（3）回到components文件夹中CategorySelect组件中调用获取一级分裂属性的接口
将返回的一级分类的数据存储到该组件的list1中
（4）动态展示一级分类的option
（5）在组件中收集一级分类的id到组件data中的category1Id
（6）给一级分类绑定触发事件(当一级分类的option发生变化时被触发)handler1
    >1.拿着收集到的一级分类的category1Id调用获取二级分类的接口函数
    >2.将返回的二级分类的数据存储到该组件的list2中
    >3.动态展示二级分类的option
    >4.在组件中收集二级分类的id到组件data中的category2Id
    >5.给二级分类绑定触发事件(当二级分类的option发生变化时被触发)handler2
        >>1.拿着收集到的二级分类的category2Id调用获取三级分类的接口函数
        >>2.将返回的三级分类的数据存储到该组件的list3中
        >>3.动态展示三级分类的option
        >>4.在组件中收集三级分类的id到组件data中的category2Id
        >>5.给三级分类绑定触发事件(当三级分类的option发生变化时被触发)handler3
            将收集到的一二三级分类的category1、2、3Id发送$emit给父组件（CategorySelect传给Attr id和level的信息)
（7）父组件$on将子组件传进来的id用level区分开来等级并存储到Attr组件中
（8）Attr组件拿着各级id向服务器发送获取平台属性列表的请求
（9）将返回的数据存储到Attr组件中
（10）搭建好展示数据的静态结构
（11）动态展示平台属性的数据
（12）搭建好当点击添加或者修改的静态页面
对属性进行增删改
（13）将用户在添加或者修改输入的信息v-model到attrInfo，收集到attrInfo中
input和span之间的切换 @blur(将flag状态值放在data中不能够单独控制单独一个，所以将flag放在每次点击添加属性值里面，给每一条都添加上唯一的flag)
（14）当用户点击取消，组件跳转到默认展示平台属性处
（15）当用户点击删除按钮时，弹出气泡框，当用户点击确认按钮，将数据从保存在attrInfo中attrValueList数组中的数据splice删除掉
（16）当用户点击保存时，整理参数（过滤掉空值的还有删除掉flag)，将收集到的attrInfo传给服务器，发送添加修改服务器中属性或者属性值的数据
（17）重新发送展示平台属性的请求，重新展示数据
（18）优化细节
光标聚焦$refs[index].focus+nextTick
展示Input的都实现光标自动聚焦

禁用:disabled
当不是停留在展示平台属性的状态时，上面的三级联动禁用
当添加或者修改中的属性值条数小于一条时，保存按钮禁用

3.product静态组件下的Spu组件业务
(1)三级联动同上
(2)搭建好展示数据的静态结构
(3)写接口
(4)发送获取页面要展示的数据的接口请求，将数据存到data中spu处
(5)动态展示spu的数据：data

完成spuForm组件的业务
(6)搭建好当点击添加或者修改spu的静态页面
(7)当用户点击添加或者修改spu，切换到对应的组件（不展示有spu数据的页面）切换scene
(8)当用户点击去取消，改变场景scene值，v-if显示出展示spu数据的组件
(9)完成修改spu业务（SpuForm)
>1.写接口，获取其他要展示的数据
>2.动态展示数据
>3.将用户输入的数据:model收集到data中的spu处
照片墙收集收集到另外，到时候再整理
销售属性
>4.写保存的接口
>5.当用户修改完数据点击保存时
整理参数
发送请求
提示成功保存的信息
切换默认展示的场景（涉及到子传父数据：通知父组件切换场景的）
6.清除数据（object.ossign)
(10)完成添加spu的业务(SpuForm)
完成和修改展示的是同一个
(11)完成删除spu数据的业务（splice)(SpuForm)

完成skuForm组件的业务
1.写好skuForm组件的静态
2.当用户在父组件点击添加sku的按钮时，切换场景到1，skuForm处
3.在父组件使用<SkuForm>标签处打上ref,在父组件通过$refs拿到子组件节点
调用子组件的方法（通知子组件去发送请求获取数据）(等下写)
在父组件中国将skuForm所需要用到的参数传过去
4.子组件被调用的方法
拿着父组件传过来的参数作为参数向服务器发送请求
返回的数据存到该组件中（有图片信息，平台属性，销售属性）
5.展示数据和收集用户输入的数据
（1）将父组件传进来的spu存储起来到spu
展示spu中的spuName
（2）在data中定义一个skuInfo用来收集数据
在模板中v-model收集用户输入的名称，描述，重量
（3）将服务器返回的数据存储咋data的平台属性和销售属性拿出来展示
平台属性数据的展示和收集
>1.在el-form-item v-for遍历平台属性，就会出现对应有多少个属性
>2.:label展示属性名
>3.在el-option中v-for遍历属性的属性值列表，就会出现对应有多少个option
>4.在el-option中:label展示属性的属性值名字
>5.要知道select收集的是option的value值
在option中:value将属性的id和属性值的id收集起来
在select中v-model将option的value收集到点击的属性中
>6.等到最后我们在切割出来，然后再赋值给最终收集的skuInfo中，再发送保存的请求
6.展示照片和收集照片的数据
展示照片相关数据
>1.在table中:data展示刚才服务器返回赋值的照片的数据，就会出现对应有多少条照片的数据
>2.:prop展示图片名称
>3.图片用作用域插槽展示<template slot-scope={row,$index}><img :src="要展示的数据链接"/>
row是数组中的对象元素，row.imgUrl就可以拿到数组中某一元素的属性
>4.操作中也是作用域插槽展示切换按钮

收集图片相关数据
>1.给table绑定上一个select-change事件，当选项框发生变化时会调用此事件
>2.写select-change方法，里面的参数是选中的某一行的数据
所以可以将选择的某行数据收集起来在data中的imageList(最后我们在整理赋值给skuInfo)
this.imgList=params;
>3.这个时候图片收集的数据还差isDefault
这个isDefault我们可以在前面获取服务器返回的照片数据中froEach添加上isDefault字段，默认为0
>4.给设置默认按钮绑定点击事件
当点击设置默认图片时，将选中的某行数据中的isDefault数值改为1(排他)
>5.给设置按钮和默认按钮进行切换
用v-if='row.isDefault==0'
v-else
7.点击取消按钮的业务
（1）给取消按钮绑定点击事件cancel
（2）this.$emit('changeScene2',0);订阅父组件的changeScene2事件，并将0作为参数传过去
（3）给父组件使用子组件标签处绑定自定义事件changeScene2
（4）在父组件写自定义事件的回调，接收子组件传进来的参数
将当前data中的scene的值改为当前传进来的值，即能成功切换场景
（5）不要忘记在子组件的cancel事件中清除掉数据
Object.assign(this._data,this.$options.data());
8.点击保存按钮的业务
（1）给保存按钮绑定自定义事件save
（2）整理收集的平台属性，销售属性，照片数据（map,reduce）
（3）将整理好的参数赋值给skuInfo相对应的属性
（4）拿着skuInfo去发送保存的请求
（5）服务器返回成功后，提示成功的信息
（6）this.$emit('changeScene2',0);通知父组件切换场景
（7）清除数据
Object.assign(this._data,this.$options.data());
9.点击查看sku按钮业务
（1）给查看sku按钮绑定点击事件lookSkuList(row)
（2）事件方法将传进来的spu数据存储到data中的spu中（后面需要用到spuName展示数据和spuId作为参数发送获取sku列表的请求）
（3）写好对话框的静态代码
（4）对话框默认隐藏起来 
（5）动态展示对话框的标题el-dialog(:title)
（6）当点击查看skuList按钮时，对话框状态为显示
（7）写api，在绑定事件中发送获取skuList的请求，将数据存储到data中的skuList中
（8）动态展示skuList数据
el-table(:data='skuList')
...
（9）优化（loading加载数据显示动效）
>1.给el-dialog对话框添加上v-loading="loading"
>2.在data中添加loading字段，默认为加载状态true
>3.当前面服务器返回获取skuList列表数据成功，停止加载loading设置为false.
>4.以上即可实现数据加载，但是会出现一些另外摁按钮的加载问题
解决：
给el-dialog添加上:before-close="handleClose"（在叉掉对话框之前的回调）
在方法中将当前的加载设置为true（默认将加载开启）
将服务器返回的skuList设置为空
方法中的done参数，记得done()关闭对话框





//let result=this.$API.sku.reqSpuImageList(spu.id);//Promise {<pending>}//没有await和async返回的是Promise对象


