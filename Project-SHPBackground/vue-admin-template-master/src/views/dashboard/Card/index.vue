<template>
    <div>
      <!--我是顶部显示card的组件-->
      <el-row :gutter="10">
        <el-col :span="6">
            <el-card>
                <!--第一个card-->
                <Detail title="总销售额" count="￥12650">
                    <template slot="charts">
                        <span>周同比&nbsp;55.67%<svg t="1676650549013" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3767" width="16" height="16"><path d="M936.170667 669.952L534.613333 268.394667a32 32 0 0 0-42.986666-2.069334l-2.282667 2.069334L87.829333 669.952a8.533333 8.533333 0 0 0-2.496 6.037333v66.346667a8.533333 8.533333 0 0 0 14.570667 6.058667l412.074667-412.096 412.117333 412.096a8.533333 8.533333 0 0 0 14.570667-6.037334v-66.346666a8.533333 8.533333 0 0 0-2.496-6.058667z" fill="#d81e06" p-id="3768"></path></svg></span>
                        <span>日同比&nbsp;19.56%<svg t="1676650654289" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4985" width="16" height="16"><path d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z" fill="#1afa29" p-id="4986"></path></svg></span>
                    </template>
                    <template slot="footer">
                        <span>日销售额￥12345</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <!--第二个card-->
                <Detail title="总访问量" count="8890">
                    <template slot="charts">
                        <lineChats></lineChats>
                    </template>
                    <template slot="footer">
                        <span>日访问量1234</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <!--第三个card-->
                <Detail title="支付笔数" count="6890">
                    <template slot="charts">
                        <barCharts></barCharts>
                    </template>
                    <template slot="footer">
                        <span>转换率64%</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <!--第四个card-->
                <Detail title="运营活动效果" count="78%">
                    <template slot="charts">
                        <progressCharts></progressCharts>
                    </template>
                    <template slot="footer">
                        <span>周同比&nbsp;55.67%<svg t="1676650549013" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3767" width="16" height="16"><path d="M936.170667 669.952L534.613333 268.394667a32 32 0 0 0-42.986666-2.069334l-2.282667 2.069334L87.829333 669.952a8.533333 8.533333 0 0 0-2.496 6.037333v66.346667a8.533333 8.533333 0 0 0 14.570667 6.058667l412.074667-412.096 412.117333 412.096a8.533333 8.533333 0 0 0 14.570667-6.037334v-66.346666a8.533333 8.533333 0 0 0-2.496-6.058667z" fill="#d81e06" p-id="3768"></path></svg></span>
                        <span>日同比&nbsp;19.56%</span>
                    </template>
                </Detail>
            </el-card>
        </el-col>
    </el-row>  
    </div>
  </template>
  
  <script>
  import Detail from './Detail/index.vue'
  import lineChats from './lineChats/index.vue'
  import barCharts from './barCharts/index.vue'
  import progressCharts from './progressCharts/index.vue'
  export default {
    name: 'Card',
    components:{
        Detail,
        lineChats,
        barCharts,
        progressCharts
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  