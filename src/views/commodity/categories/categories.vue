<template>
    <div>
        <!-- 面包屑导航 -->
        <bread-crumb>
            <el-breadcrumb-item slot="one">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item slot="two">商品分类</el-breadcrumb-item>
        </bread-crumb>
        <!-- 卡片 -->
        <el-card>
            <table-form :cateList="cateList" @goodsList="goodsList"></table-form>
            <!-- 分页 -->
            <pagination
            :pagenum.sync="pagenum"
            :pagesize.sync="pagesize"
            :total="total"
            :goodsList="goodsList"></pagination>
        </el-card>
    </div>
</template>

<script>

    import {goodsList} from 'api/api.js'

    import breadCrumb from 'components/breadCrumb/breadCrumb'
    import TableForm from './children/TableForm'
    import Pagination from './children/Pagination'

export default {
    name:'categories',
    data(){
        return{
            cateList:[],
            type:3,
            pagenum:1,
            pagesize:5,
            total:0
        }
    },
    created(){
        this.goodsList();
    },
    methods:{
        goodsList(){
            let type = this.type
            let pagenum = this.pagenum
            let pagesize = this.pagesize
            goodsList(type,pagenum,pagesize).then(res=>{
                // console.log(res.data)
                this.cateList = res.data.result
                this.total = res.data.total
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