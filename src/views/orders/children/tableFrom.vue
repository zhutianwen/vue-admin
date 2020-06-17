<template>
    <el-container>    
        <el-table
            :data="ordersList"
            style="width: 100%"
            border
            stripe>
            <el-table-column
                prop="order_number"
                label="订单编号">
            </el-table-column>
            <el-table-column
                prop="order_price"
                label="订单价格"
                width="90">
            </el-table-column>
            <el-table-column
                prop="order_pay"
                label="是否付款"
                width="90">
                <template slot-scope="scope">
                    <!-- {{scope.row.order_pay}} -->
                    <el-tag type="warning" v-if="scope.row.order_pay === '0'">未支付</el-tag>
                    <el-tag v-else-if="scope.row.order_pay === '1'">支付宝</el-tag>
                    <el-tag v-else-if="scope.row.order_pay === '2'">微信</el-tag>
                    <el-tag v-else>银行卡</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="is_send"
                label="是否发货"
                width="90">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="下单时间"
                width="180">
                <template slot-scope="scope"> 
                    {{scope.row.create_time | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
                <template>
                    <el-tooltip class="item" effect="light" content="修改地址" placement="bottom" :enterable="false">
                        <el-button @click="openDialog" size="mini" type="primary" icon="el-icon-edit"></el-button>
                    </el-tooltip>
                    <el-button @click="showProgressBox" size="mini" type="success" icon="el-icon-location"></el-button>
                </template>
            </el-table-column>
        </el-table>  
        <!-- 修改地址对话框 -->
        <address-dialog 
            :dialogVisible.sync="dialogVisible"
            ></address-dialog>
        <!-- 查询物流对话框 -->
        <progress-dialog
            :progressVisible.sync="progressVisible"
            :progressList="progressList"></progress-dialog>
    </el-container>
</template>

<script>

import {getKuaidi} from 'api/api.js'
import addressDialog from './addressDialog'
import progressDialog from './progressDialog'

export default {
    name:'tableFrom',
    data(){
        return{
            dialogVisible:false,
            progressVisible:false,
            id:"1106975712662",
            progressList:[]
        }
    },
    props:{
        ordersList:{
            type:Array,
            default:[]
        }
    },
    methods:{
        openDialog(){
            this.dialogVisible = true
        },
        showProgressBox(){
            getKuaidi(this.id).then(res=>{
                console.log(res)
                this.progressList = res.data
            })
            this.progressVisible = true
        },

    },
    components:{
        addressDialog,
        progressDialog
    }
}
</script>

<style>

</style>