//用他模拟假数据
//先引入mock模块
import Mock from 'mockjs';
//把json数据格式引入进来（json数据并没有向外暴露，但是可以引入）
//这是因为webpack默认对外暴露的有图片文件，json数据格式
import banner from './banner.json';
import floor from './floor.json';

//模拟数据
//Mock中有一个mock方法，这个方法第一个参数是要访问的假地址（请求地址），第二个参数是请求的数据（Json对象）
Mock.mock('/mock/banner',{code:200,data:banner});//模拟首页轮播图的数据//当code为200，请求返回数据成功，返回的数据是banner对象
Mock.mock('/mock/floor',{code:200,data:floor});

//现在这些数据这样些还不会执行
//还需要写在入口文件//因为他没有对外暴露，所以只用写他的样式就行，跟其他的js文件一样