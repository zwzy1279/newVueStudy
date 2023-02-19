<template>
    <!--容器-->
    <div class="charts" ref="charts" style="width:100%;height:100%">
    </div>
  </template>
  
  <script>
  //引入echarts
  import * as echarts from 'echarts';
  export default {
    name: 'barCharts',
    mounted(){
        //初始化echarts实例
        let lineCharts=echarts.init(this.$refs.charts);
        //为指定实例配置数据
        lineCharts.setOption({
            xAxis:{
                //隐藏x轴
                show:false,
                type:'category'
            },
            yAxis:{
                //隐藏y轴
                show:false,
            },
            //系列
            series:[
                {
                    type:'bar',
                    data:[10,3,5,23,6,20],
                }
            ],
            //布局调试
            grid:{
                left:0,
                top:0,
                right:0,
                bottom:0
            }
        })
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .echarts {
        width:100%;
        height:100%
    }
  </style>
  