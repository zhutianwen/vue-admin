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

export function getNewUser(id){//根据id查询用户信息
    return request({
        method:'put',
        url:`users/${id}`,
    })
}