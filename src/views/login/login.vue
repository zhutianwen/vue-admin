<template>
    <div class="login">
        <div class="login-box">
            <!-- 头像 -->
            <div class="avatar-box">
                <img src="~assets/images/avatar.jpg" alt="">
            </div>
            <!-- 表单 -->
            <el-form
             class="login-form" 
             :model="form"
              :rules="rules"
                ref="form">
                <!-- 用户名 -->
                <el-form-item prop="name">
                    <el-input v-model="form.name" prefix-icon="iconfont icon-yonghu"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input  type="password" v-model="form.password" prefix-icon="iconfont icon-mima"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" round @click="login">确认登录</el-button>
                    <el-button type="info" round @click="reset">重置密码</el-button>
                </el-form-item>
            </el-form>
        </div> 
    </div>
</template>

<script>

import {getLogin} from 'api/api.js'

export default {
    name:'login',
    data(){
        return{
            form:{
                name:'admin',
                password:'123456',
            },
            rules:{
                // 验证用客户名
                name:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                //验证密码
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
            },
        }
    },
    methods:{
        reset(){//重置
            this.$refs.form.resetFields();
        },
        login(){//登录
            let username = this.form.name;
            let password = this.form.password
            this.$refs.form.validate(vaild => {
                // console.log(vaild)
                if(vaild){//如果vaild为true 发起请求
                    getLogin(username,password).then(res =>{
                        if(res.meta.status != 200){
                            this.$message({
                                message:'登陆失败',
                                type:'error',
                                // offset:340,
                                duration:2000
                            })
                        }else{
                            // console.log(res);
                            window.sessionStorage.setItem("token",res.data.token)//蒋token值存储到sessionStorage
                            this.$router.push({
                                path:'/home'
                            });
                            this.$message({
                                message:'登陆成功',
                                type:'success',
                                // offset:340,
                                duration:2000
                            })
                        }
                    })
                }else{
                    return false;
                }
            })
        },
    },
}
</script>

<style>
    .login{
        background: #2b4b6b;
        height: 100%;
    }
    .login-box{ 
        width: 460px;
        height: 300px;
        background: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -150px;
        margin-left: -230px;
    }
    .avatar-box{
        height: 110px;
        width: 110px;
        border-radius:50% ;
        padding: 5px;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .avatar-box img{
        border: 1px solid #ccc;
        border-radius:50% ;
        box-shadow: 0 0 10px #ccc;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login-form{
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 0 20px 0 20px;
        box-sizing: border-box;
    }
</style>