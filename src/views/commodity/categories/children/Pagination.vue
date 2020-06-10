<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5 , 6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
export default {
    name:'Pagination',
    props:{
        pagenum:{
            type:Number,
        },
        pagesize:{
            type:Number,
        },
        total:{
            type:Number,
        },
        goodsList:{
            type: Function,
            default: null
        },
    },
   
    methods:{  
        handleSizeChange(val){//每页几条数据
            this.$emit('update:pagesize',val) 
            this.goodsList();
        },
        handleCurrentChange(val){//监听页码变化
            this.$emit('update:pagenum',val)
            this.goodsList();
        },
    },
}
</script>

<style>
    .el-pagination{
        margin-top: 25px;
    }
</style>