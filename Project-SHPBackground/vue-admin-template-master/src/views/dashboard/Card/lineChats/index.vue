<template>
    <!--容器-->
    <div class="charts" ref="charts" style="width:100%;height:100%">
    </div>
  </template>
  
  <script>
  //引入echarts
  import * as echarts from 'echarts';
  export default {
    name: 'lineChats',
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
                    type:'line',
                    data:[10,3,5,23,6,20],
                    //拐点样式的设置
                    itemStyle:{
                        opacity:0
                    },
                    //线条的样式
                    lineStyle:{
                        color:'purple'
                    },
                    //填充颜色设置
                    areaStyle:{
                        color:{
                            type:'linear',
                            x:0,
                            y:0,
                            x2:0,
                            y2:1,
                            colorStops:[
                                {
                                    offset:0,
                                    color:'purple'
                                },
                                {
                                    offset:1,
                                    color:'#fff',
                                },
                            ],
                            global:false,
                        }
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
  