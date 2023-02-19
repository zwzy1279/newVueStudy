<template>
    <!--容器-->
    <div class="charts" ref="charts" style="width:100%;height:100%">
    </div>
  </template>
  
  <script>
  //引入echarts
  import * as echarts from 'echarts';
  export default {
    name: 'progressCharts',
    mounted(){
        //初始化echarts实例
        let lineCharts=echarts.init(this.$refs.charts);
        //为指定实例配置数据
        lineCharts.setOption({
            xAxis:{
                //隐藏x轴
                show:false,
                //最大值和最小值的设置
                min:0,
                max:100
            },
            yAxis:{
                //隐藏y轴
                show:false,
                type:'category',
            },
            //系列
            series:[
                {
                    type:'bar',
                    data:[78],
                    color:'cyan',
                    //柱状图的宽度
                    barWidth:10,
                    color:'yellowgreen',
                    //背景颜色设置
                    showBackground:true,
                    backgroundStyle:{
                        color:'#eee'
                    }
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
  