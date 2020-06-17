<template>
    <div>
        <!-- 面包屑导航 -->
        <bread-crumb>
            <el-breadcrumb-item slot="one">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item slot="two">订单列表</el-breadcrumb-item>
        </bread-crumb> 
        <!-- 卡片 -->
        <el-card>
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <table-from
                :ordersList="ordersList"></table-from>
            <!-- 分页 -->
            <pagination
                :total="total"
                :pagenum.sync="pagenum"
                :pagesize.sync="pagesize"
                @getOrdersList="getOrdersList"></pagination>
        </el-card>
    </div>
</template>

<script>

import {getOrdersList} from 'api/api.js'

import breadCrumb from 'components/breadCrumb/breadCrumb'
import tableFrom from './children/tableFrom'
import Pagination from './children/Pagination'

export default {
    name:"orders",
    data(){
        return{
            query:'',
            pagenum:1,
            pagesize:10,
            ordersList:[],
            total:0,
            
        }
    },
    created(){
        this.getOrdersList()
    },
    methods:{
        getOrdersList(){
            getOrdersList(this.query,this.pagenum,this.pagesize).then(res=>{
                console.log(res)
                this.ordersList = res.data.goods;
                this.total = res.data.total;
            })
        }
    },
    components:{
        breadCrumb,
        tableFrom,
        Pagination
    },
}
</script>

<style>

</style>