<template>
    <div class="users">
        <!-- 面包屑导航 -->
        <bread-crumb>
            <el-breadcrumb-item slot="one">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item slot="two">用户列表</el-breadcrumb-item>
        </bread-crumb>
        <!-- 卡片区域 -->
        <el-card>
            <!-- 搜索 -->
            <search
             @getUsers="getUsers" 
              :getUsers="getUsers" 
             :query = "query"
             @newQuery="newQuery"
             ></search>
            <!-- 表格 -->
            <form-table :userList = "userList" @getUsers="getUsers"></form-table>
            <!-- 分页 -->
            <!-- <pagination :pagesize = "pagesize" @updatePagesize = "updatePagesize"></pagination>  -->
            <!-- <pagination :pagesize = "pagesize" @update:pagesize = "updatePagesize"></pagination> 简化-->
            <pagination
             :pagesize.sync = "pagesize"
               :pagenum.sync = "pagenum"
               :total.sync = "total"
                :getUsers="getUsers"></pagination> <!--最终版-->
            
        </el-card>
    </div>
</template>

<script>

import {getUsers} from 'api/api.js'

import breadCrumb from 'components/breadCrumb/breadCrumb'
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
                this.userList = res.data.users
                this.total = res.data.total
            })
        },
        newQuery(val){
            // console.log(val)
            this.query = val
            this.getUsers();
        },
    },
    // watch:{
    //     query(query){
    //         console.log(query)
    //     }
    // },
    components:{
        breadCrumb,
        Search,
        formTable,
        pagination,
        
    },
}
</script>

<style>
    
</style>