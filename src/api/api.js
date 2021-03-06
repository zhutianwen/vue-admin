import {request} from './request'

export function getLogin(username,password){//登录
    return request({
        method:'post',
        url:'/login',
        params:{
            username,
            password
        }
    })
}
export function getMenus(){//左侧菜单栏
    return request({
        url:'/menus',
    })
}

export function getUsers(query,pagenum,pagesize){//用户列表
    return request({
        url:'/users',
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}

export function getSwitchType(uId,type){//switch状态
    return request({
        method:'put',
        // url:'users/:uId/state/:type',
        url:`users/${uId}/state/${type}`,
    })
}
export function getAddUser(username,password,email,mobile){//添加用户
    return request({
        method:'post',
        url:'users',
        data:{
            username,password,email,mobile
        }
    })
}

export function getUserId(id){//根据id查询用户信息
    return request({
        url:`users/${id}`,
        // url:'users/'+id,
    })
}

export function getNewUser(id,email,mobile){//根据id查询用户信息
    return request({
        method:'put',
        url:`users/${id}`,
        data:{
            email,mobile
        }
    })
}

export function deleteUser(id){//根据id查询用户信息
    return request({
        method:'delete',
        url:`users/${id}`,
        data:{
            id
        }
    })
}
export function getAllRights(type){//所有权限列表
    return request({
        url:`rights/${type}`,
        data:{
            type
        }
    })
}
export function getAllroles(){//所有角色列表
    return request({
        url:'roles',
    })
}
export function addRoles(roleName,roleDesc){//添加角色
    return request({
        method:'post',
        url:'roles',
        data:{
            roleName,
            roleDesc
        }
    })
}
export function rolesInfo(id){//根据id查询角色
    return request({
        url:`roles/${id}`,
    })
}
export function putRolesInfo(id,roleName,roleDesc){//提交角色信息
    return request({
        method:'put',
        url:`roles/${id}`,
        data:{
            id,roleName,roleDesc
        }
    })
}
export function deleteRoles(id){//提交角色信息
    return request({
        method:'delete',
        url:`roles/${id}`,
        data:{
            id
        }
    })
}

export function putUserRole(id,rid){//分配角色
    return request({
        method:'put',
        url:`users/${id}/role`,
        data:{
            id,rid
        }
    })
}

export function deleteRolespower(roleId,rightId){//删除指定角色权限
    return request({
        method:'delete',
        url:`roles/${roleId}/rights/${rightId}`,
        data:{
            roleId,
            rightId
        }
    })
}


export function getAllRithts(type){//获取所有权限列表
    return request({
        url:`rights/${type}`,
    })
}

export function putRoleRights(roleId,rids){//角色授权
    return request({
        method:'post',
        url:`roles/${roleId}/rights`,
        data:{
            roleId,
            rids
        }
    })
}

export function goodsList(type,pagenum,pagesize){//商品分类数据列表
    return request({
        url:'categories',
        params:{
            type,
            pagenum,
            pagesize
        }
    })
}

export function addCategories(cat_pid,cat_name,cat_level){//添加分类
    return request({
        method:'post',
        url:'categories',
        data:{
            cat_pid,cat_name,cat_level
        }
    })
}

export function getCateById(id){//根据id查询分类
    return request({
        url:`categories/${id}`,
    })
}

export function putCateById(id,cat_name){//编辑提交分类
    return request({
        method:'put',
        url:`categories/${id}`,
        data:{
            id,cat_name
        }
    })
}

export function deleteCateById(id){//删除分类
    return request({
        method:'delete',
        url:`categories/${id}`,
        data:{
            id
        }
    })
}

// 分类参数管理
export function getAttributes(id,sel){// 参数列表
    return request({
        url:`categories/${id}/attributes`,
        params:{
            sel
        }
    })
}

export function addParams(id,attr_name,attr_sel){// 添加动态参数或者静态属性
    return request({
        method:'post',
        url:`categories/${id}/attributes`,
        data:{
            attr_name,attr_sel
        }
    })
}

export function queryParams(id,attrId,attr_sel){//  根据 ID 查询参数
    return request({
        url:`categories/${id}/attributes/${attrId}`,
        params:{
            id,
            attrId,
           attr_sel
        }
    })
}

export function putParams(id,attrId,attr_name,attr_sel,attr_vals){//  编辑提交参数
    return request({
        method:'put',
        url:`categories/${id}/attributes/${attrId}`,
        data:{
            id,
            attrId,
           attr_name,
           attr_sel,
           attr_vals
        }
    })
}

export function deleteParams(id,attrId){//   删除参数
    return request({
        method:'delete',
        url:`categories/${id}/attributes/${attrId}`,
        data:{
            id,
            attrId,
        }
    })
}

//商品管理
export function getGoodsList(query,pagenum,pagesize){//    商品列表数据
    return request({
        url:'goods',
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}

export function deleteGoodsList(id){//    删除商品
    return request({
        method:'delete',
        url:`goods/${id}`,
        data:{
            id
        }
    })
}

export function addGoods(goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs){//    添加商品
    return request({
        method:'post',
        url:'goods',
        data:{
            goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs
        }
    })
}

// 订单管理

export function getOrdersList(query,pagenum,pagesize,user_id,pay_status,is_send,order_fapiao_title,order_fapiao_company,order_fapiao_content,consignee_addr){// 订单数据列表
    return request({
        url:'orders',
        params:{
            query,pagenum,pagesize,user_id,pay_status,is_send,order_fapiao_title,order_fapiao_company,order_fapiao_content,consignee_addr
        }
    })
}

export function getKuaidi(id){// 查看物流信息
    return request({
        url:`/kuaidi/${id}`,
        params:{
            id
        }
    })
}

/////////////数据统计
export function getReports(){// 基于时间统计的折线图
    return request({
        url:'reports/type/1',
    })
}