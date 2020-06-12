<template>
    <el-table 
        :data="goodsList"
        border
        stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column width="90px" label="商品价格(元)" prop="goods_price"></el-table-column>
        <el-table-column width="70px" label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column width="180px" label="创建时间" prop="add_time">
            <template slot-scope="scope">
                {{scope.row.add_time | dateFormat}}
            </template>
        </el-table-column>
        <el-table-column  width="130px" label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
                <el-button @click="deleteGoods(scope.row.goods_id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>

import {deleteGoodsList} from 'api/api.js'

export default {
    name:'TableForm',
    props:{
        goodsList:{
            type:Array,
            default:[]
        }
    },
    methods:{
       async deleteGoods(id){
            const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err)
            if(confirmResult !=='confirm'){
                return this.$message.info('已取消删除')
            }
            deleteGoodsList(id).then(res=>{
                console.log(res)
                if(res.meta.status !==200){
                    return this.$message.error('删除失败')
                }
                this.$message.success('删除成功')
                this.$emit('getGoodsList')
            })    
        },
    },
}
</script>

<style>

</style>