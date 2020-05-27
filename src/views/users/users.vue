<template>
    <div class="users">
        <!-- 面包屑导航 -->
        <bread-crumb></bread-crumb>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索 -->
            <search></search>
            <!-- 表格 -->
            <form-table :userList = "userList"></form-table>
            <!-- 分页 -->
            <!-- <pagination :pagesize = "pagesize" @updatePagesize = "updatePagesize"></pagination> 原版-->
            <!-- <pagination :pagesize = "pagesize" @update:pagesize = "updatePagesize"></pagination> 简化-->
            <pagination
             :pagesize.sync = "pagesize"
               :pagenum.sync = "pagenum"
               :total.sync = "total"
                :getUsers="getUsers"></pagination> <!-- 最终版-->
        </el-card>
    </div>
</template>

<script>

import {getUsers} from 'api/api.js'

import BreadCrumb from './children/BreadCrumb'
import Search from './children/Search'
import formTable from './children/formTable'
import pagination from './children/pagination'


export default {
    name:'users',
    data(){
        return{
           query:'',
           pagenum:1,//currentPage4 当前页
           pagesize:2,//page-size 当前显示几条
           total:0,//总页码
           userList:[],//用户列表
           myMsg:'我是父组件参数'
        }
    },
    created(){
        this.getUsers();
    },
    methods:{
        getUsers(){
            getUsers(this.query,this.pagenum,this.pagesize).then(res =>{
                console.log(res)
                this.userList = res.data.users
                this.total = res.data.total
            })
        },
    },
    components:{
        BreadCrumb,
        Search,
        formTable,
        pagination,
    },
}
</script>

<style>
    .el-card{
        box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
    }
</style>