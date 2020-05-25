<template>
    <div class="users">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table :data="this.usersList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>

import {getUsers} from 'api/api.js'

export default {
    name:'users',
    data(){
        return{
            query:'',
            pagenum:1,
            pagesize:2,  
            usersList:[],
            total:0,
           
        }
    },
    created(){
        this.getUsers();
    },
    methods:{
        getUsers(){
            let query = this.query
            let pagenum = this.pagenum
            let pagesize = this.pagesize
            getUsers(query,pagenum,pagesize).then(res =>{
                console.log(res)
                this.usersList = res.data.users
                this.total = res.data.total
                console.log(this.usersList)
            })
        },
    },
}
</script>

<style>
    .el-breadcrumb{
        margin-bottom: 20px;
    }
    .el-card{
        box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
    }
    .el-table{
        margin-top: 25px;;
    }
</style>