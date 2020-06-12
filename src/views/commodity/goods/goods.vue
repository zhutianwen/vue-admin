<template>
  <div>
       <!-- 面包屑导航 -->
        <bread-crumb>
            <el-breadcrumb-item slot="one">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item slot="two">商品列表</el-breadcrumb-item>
        </bread-crumb>
        <!-- 卡片 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input @clear="getGoodsList()" v-model="query" placeholder="请输入内容" clearable>
                        <el-button @click="getGoodsList()" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button @click="goAddPage" type="primary">添加商品</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <table-form 
                    :goodsList="goodsList"
                    @getGoodsList="getGoodsList">
            </table-form>
            <!-- 分页 -->
            <pagination
                :total = "total"
                :pagenum.sync= "pagenum"
                :pagesize.sync = "pagesize"
                @getGoodsList="getGoodsList">
            </pagination>
        </el-card>
  </div>
</template>

<script>

import {getGoodsList} from 'api/api.js'

import breadCrumb from 'components/breadCrumb/breadCrumb'
import TableForm from './children/TableForm'
import Pagination from './children/Pagination'

export default {
    name:'goods',
    data(){
        return{
            query:'',
            pagenum:1,
            pagesize:10,
            total:0,
            goodsList:[]
        }
    },
    created(){
        this. getGoodsList();
    },
    methods:{
        getGoodsList(){//获取商品数量列表
            getGoodsList(this.query,this.pagenum,this.pagesize).then(res=>{
                this.goodsList = res.data.goods;
                this.total = res.data.total;
                console.log(this.goodsList)
            })
        },
        goAddPage(){
            this.$router.push({
                path:'/goods/addGoods'
            })
        },
    },
    components:{
        breadCrumb,
        TableForm,
        Pagination
    }
}
</script>

<style>

</style>