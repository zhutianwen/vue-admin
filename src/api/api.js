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