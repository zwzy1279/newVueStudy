数据可视化
将数据转化为易于人员辨别和理解的视觉表现形式

一.canvas基本使用
1.在html中使用<canvas>标签
写这个标签相当于有了一张白纸(坐标轴横为x,竖为y)
我们通过拿着笔在上面画画
2.在js中拿到这个canvas节点（白纸）
let mycanvas=document.querySelector('canvas');
3.获取这张白纸的画笔(获取画布的上下文)
let ctx=mycanvas.getContext('2d');
4.就可以通过画笔ctx描点
5.连线

二.画线段(需要一条线的起点坐标和结尾坐标)
1.描起点坐标
ctx.moveTo(10,10);
2.描其他点
ctx.lineTo(20,20);
ctx.lineTo(100,100);
3.连线
ctx.stroke();

三.画矩形
法一：ctx.strokeRect(100,200,50,50);//x,y,w,h
x为距离原点的横坐标
y为距离远点的纵坐标
w为以横坐标点进行画的宽度
y为以纵坐标点进行画的高度
法二：ctx.fillRect(300,200,50,50);//同上
区别：法一没有办法填充颜色

四.画圆
1.ctx.arc(100,100,50,0,2*Math.PI,true);//x y r 起始弧度 结束弧度 是否逆时针绘制
x为距离原点的横坐标
y为距离远点的纵坐标
r为半径长度
弧度
默认为逆时针绘制
2.画线
ctx.stroke();

五.注意
画布的宽度和高度通过行内样式来设置

-----------------------------------------------------------------------------------------------------------------------------------------

一.svg的使用
缩放不失像素
1..在html中使用<svg>标签
写这个标签相当于有了一张白纸
我们通过拿着笔在上面画画
2.直接在<svg>标签内使用图形的标签进行绘制图形
<svg class="box">
        <!-- x1 y1第一个点的坐标  x2 y2 第二个点的坐标 -->
        <line x1="100" y1="100" x2="200" y2="200" stroke="red"></line>
        <line x1="100" y1="200" x2="200" y2="100" stroke="red"></line>
        <!-- 绘制折线:可以多个点，多个点的时候，最好带有逗号  第一个点，第二个点，。。。-->
        <polyline points="300 300, 50 100, 120 400,20,20" fill-opacity="0" stroke="cyan"></polyline>
        <!-- 绘制矩形 -->
        <!-- fill属性：设置填充颜色的  fill-opacity设置填充颜色的透明度  stroke：线的颜色 -->
        <rect x="400" y="400" width="150" height="50" fill="pink"></rect>
        <!-- 绘制圆形 -->
        <circle cx='370' cy='95' r='50' style='stroke:cyan; fill:none'></circle>
        <!-- 绘制圆形|椭圆 -->
        <ellipse cx="500" cy="500" rx="100" ry="50" style="fill:black;"></ellipse>
        <!-- 多边行 -->
        <polygon points="600 100, 300 400, 750 100" stroke="red" fill-opacity="0" />
        <!-- 绘制任意图形 -->
        <path fill-opacity="0" stroke="skyblue" d="
  M 10  10
  L 20 400
  L 30 120
  L 40 66
  L 50 99
  L 60 120
  L 70 99
  Z
"></path>
    </svg>

-----------------------------------------------------------------------------------------------------------------------------------------

一.echart的基本使用
1.引入script标签 
 <!-- 引入echarts依赖包 -->
    <script src="https://cdn.bootcdn.net/ajax/libs/echarts/5.1.2/echarts.js"></script>
2.在html中为echart准备一个div容器（也就是白纸）
<!-- 准备一个容器：容器就是显示图标区域 -->
     <div style="width:300px;height:200px"></div>
3.基于准备好的容器，初始化echart实例
var myecharts=echarts.init(document.querySelector('div'));
4.指定图标的配置项和数据var option={};
5.使用刚指定的配置项和数据进行展示数据mycharts.setOption(option);

二.如
mycharts.setOption({
           //图表的标题
           title:{
               //主标题的设置
              text:'数据可视化',
              //子标题
              subtext:"echarts基本使用",
              //主标题的颜色
              textStyle:{
                  color:'cyan'
              },
              //设置标题位置
              left:'center'
           },
           //x轴的配置项
           xAxis:{
               //数据
               data:["衣服",'直播','游戏','电影']
           },
           //y轴的配置项
           yAxis:{
               //显示Y轴的线
               axisLine:{
                   show:true
               },
               //显示Y轴刻度
               axisTick:{
                   show:true
               }
           },
           //系列的设置：绘制什么样类型的图表、数据的展示在这里设置
           series:[
                { 
                    //图表类型的设置
                    type:"bar",
                    //图表的数据 bar柱状图  line折线图 pie饼图
                    data:[10,20,30,40],
                    color:'red'
                }
           ]
     });