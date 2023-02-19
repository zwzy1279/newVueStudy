//引入axios(axios进行二次封装）)
import request from '@/utils/request'

//获取品牌列表接口
///admin/product/baseTrademark/{page}/{limit} get
export const reqTradeMarkList=(page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});

//添加品牌接口
//POST /admin/product/baseTrademark/save 携带两个参数：品牌名称，品牌logo
//切记：对于新增的品牌，给服务器传递数据，不需要传递id,id是服务器生成

//修改品牌接口
//PUT /admin/product/baseTrademark/update 携带三个参数：id,品牌名称，品牌logo
//切记：对于修改某一个品牌的操作，前端携带的参数需要带上id,需要告诉服务器修改的是哪一个品牌（由添加品牌的接口返回的id)

export const reqAddUpdateTradeMark=(tradeMark)=>{
    //如果带个服务器的参数有id,那就是修改品牌的请求
    if(tradeMark.id){
        return request({url:`/admin/product/baseTrademark/update`,data:tradeMark,method:'put'})
    }else{
        //添加品牌的请求接口
        return request({url:`/admin/product/baseTrademark/save`,data:tradeMark,method:'post'})
    }
}

//删除品牌
//DELETE /admin/product/baseTrademark/remove/{id} delete
export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})