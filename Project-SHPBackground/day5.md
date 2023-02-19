一.完成首页业务
分为上中下三个部分
上部分是四个卡片（Card组件）
中间是售卖属性相关
结尾没有做
1.完成首页上部分业务
(1)在dashboard文件夹中创建时一个新的文件夹Card，里面有index.vue
(2)这个组件在dashboard组件中引入，并且注册一下（就拥有了首页中有Card组件）
(3)Card组件中有四个卡片，每个卡片就是一个Detail组件
(4)在Card的index.vue中引入并且注册Detail组件
(5)在Card中使用四个Detail标签（生成四个卡片）
(6)每个Detail中用到不同的数据由父组件Card模板中使用Detail标签处自定义属性<Detail title="支付笔数" count="6890">
(7)在子组件Detail中props:[]接收
(8)在Detail中用双花括号展示prop中的数据{{}}
另：每个Detail中用到不同的echarts那么由父组件Card模板中使用Detail标签处使用模板<Detail title="支付笔数" count="6890">
                    <template slot="charts">
                        <barCharts></barCharts><!--这里使用的echarts,我们在另外起三个组件做好barCharts,lineChats,progressCharts,-->
                    </template>
                    <template slot="footer">
                        <span>转换率64%</span>
                    </template>
                </Detail>将数据传给子组件Detail
子组件Detail用具名插槽接收<slot name="charts"></slot>

2.完成中间部分的业务
分为头部和主要内容部分（上下部分）
头部又分为左右两个部分（左边是标题tab栏，右边是日期的选择）
主要部分分为左右两个部分（左边是echarts,右边是排行榜）
(1)在dashboard文件夹中创建时一个新的文件夹Sale,里面有index.vue
(2)Sale这个组件在父组件dashboard中引入并且注册
(3)完成头部业务
一个div作为头部，头部包含左右两部分
完成左边部分标题tab栏（el-tabs)
右边是一个div,里面有span和el-date-picker日历（dayjs)
(4)完成主要内容的业务
左边是echarts,右边是一个ul li排行榜

