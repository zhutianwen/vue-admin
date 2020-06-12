<template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
export default {
    name:'Pagination',
    props:{
        total:{
            type:Number
        },
        pagenum:{
            type:Number
        },
        pagesize:{
            type:Number
        }
    },
    methods:{
        handleSizeChange(val){
            this.$emit('update:pagesize',val);
            this.$emit('getGoodsList')
        },
        handleCurrentChange(val){
            this.$emit('update:pagenum',val);
            this.$emit('getGoodsList')
        }
    },
}
</script>

<style>

</style>