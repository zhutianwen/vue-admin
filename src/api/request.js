import axios from 'axios'

export function request(config){ //封装函数
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000
    })

    //2.axios拦截器
    //2.1 请求拦截
    instance.interceptors.request.use(config =>{
        return config
    },err=>{
        console.log(err)
    })
    //2.2 响应拦截
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err)
    })
    // 3.发送真正的网络请求
    return instance(config)  //返回promise 可以.then调用
}