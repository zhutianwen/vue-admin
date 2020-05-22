import {request} from './request'

export function getLogin(username,password){
    return request({
        method:'post',
        url:'/login',
        params:{
            username,
            password
        }
    })
}