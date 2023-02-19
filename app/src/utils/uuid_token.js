import {v4 as uuidv4} from 'uuid'
//要生成一个随机字符串，且每次执行不能变化，游客身份持久化存储
export const getUUID=()=>{
    //有了我就生成，没有我就本地存储一个
    //先从本地存储获取uuid(看一下本地存储里面是否有uuid)
    let uuid_token=localStorage.getItem('UUIDTOKEN');//没有的时候为null
    //如果没有我生成
    if(!uuid_token){//本来为null,现在！就有了，成真了
        //生成游客临时身份
        uuid_token=uuidv4();//
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    //别忘记返回了，不然detail仓库中是没有uuid_token 数据的
    return uuid_token;//现在仓库中就有数据了，但是我们还得把数据拿给服务器
}