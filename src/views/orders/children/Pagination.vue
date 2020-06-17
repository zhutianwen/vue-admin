<template>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 12, 13, 14]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>

<script>
export default {
    name:"Pagination",
    data(){
        return{
            
        }
    },
    props:{
        total:{
            type:Number,
        },
        pagenum:{
            type:Number,
        },
        pagesize:{
            type:Number,
        },
    },
    methods:{
        handleSizeChange(val){
            console.log(val)
            this.$emit('update:pagesize',val)
            this.$emit('getOrdersList')
        },
        handleCurrentChange(val){
            console.log(val)
            this.$emit('update:pagenum',val)
            this.$emit('getOrdersList')
        },
    }
}
</script>

<style>

</style>