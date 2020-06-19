import axios from 'axios'
//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
export function request(config){ //封装函数
    //1.创建axios实例
    const instance = axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000
    })

    //2.axios拦截器
    //2.1 请求拦截
    instance.interceptors.request.use(config =>{
        //为请求头对象，添加Token 验证的Authorization字段
        config.headers.Authorization = window.sessionStorage.getItem('token')
        NProgress.start();
        return config
    },err=>{
        console.log(err)
    })
    //2.2 响应拦截
    instance.interceptors.response.use(res=>{
        NProgress.done();
        return res.data
    },err=>{
        console.log(err)
    })
    // 3.发送真正的网络请求
    return instance(config)  //返回promise 可以.then调用
}