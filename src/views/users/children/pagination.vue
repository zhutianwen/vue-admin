<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
export default {
    name:'pagination',
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
        getUsers:{
            type: Function,
            default: null
        },
    },
   
    methods:{  
        handleSizeChange(val){//每页几条数据
            // this.$emit('updatePagesize',val);原版
            this.$emit('update:pagesize',val)
            this.getUsers();
        
        },
        handleCurrentChange(val){//监听页码变化
            this.$emit('update:pagenum',val)
            // console.log(val)
            this.getUsers();
        },
    },
}
</script>

<style>
    .el-pagination{
        margin-top: 25px;
    }
</style>