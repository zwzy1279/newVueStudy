//将product产品引入大仓库reqTradeMarkList
import * as trademark from './product/tradeMark';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from './product/sku';

//引入权限相关的接口文件
import * as user from './acl/user';
import role from './acl/role';
import permission from './acl/permission';
//对外暴露
export default{
    trademark,
    attr,
    spu,
    sku,
    user,
    role,
    permission
}