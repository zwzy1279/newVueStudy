import request from '@/utils/request';

//获取图片的数据
///admin/product/spuImageList/{spuId}  get
export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'});


//获取销售属性的数据
///admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'});


//获取平台属性的数据
//GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 
export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'});


//添加SKU
///admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo});


//获取SKU列表数据的接口
//GET /admin/product/findBySpuId/{spuId}  
export const reqSkuList = (spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'});

/////////////////////////////////////////////////////////spu和sku分割处////////////////////////////////////////////////////////////////////


//sku列表的接口
///admin/product/list/{page}/{limit}
export const reqSkuList2 = (page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'}); 

//上架
///admin/product/onSale/{skuId}
export const reqSale = (skuId)=>request({url:`/admin/product/onSale/${skuId}`,method:'get'});

//下架
///admin/product/cancelSale/{skuId}
export const reqCancel = (skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'});

//获取SKU详情的接口
///admin/product/getSkuById/{skuId}  get
export const reqSkuById = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'});