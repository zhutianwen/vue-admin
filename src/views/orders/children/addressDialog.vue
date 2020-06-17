<template>
    <el-dialog
        title="修改地址"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        @close="clsoseAddress">
        <el-form 
        :model="addressForm" 
        :rules="addressRules" 
        ref="addressRuleForm" 
        label-width="100px">
            <el-form-item label="省市区/县" prop="address1">
                <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address2">
                <el-input v-model="addressForm.address2"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import cityData from './citydata.js'
export default {
    name:'addressDialog',
    data(){
        return{
            cityData,
            addressForm:{
                address1:[],
                address2:''
            },
            addressRules:{
                address1:[
                    { required: true, message: '请选择省市区县', trigger: 'blur' },
                ],
                address2:[
                    { required: true, message: '填写详细地址', trigger: 'blur' },
                ],
            }
        }
    },
    props:{
        dialogVisible:{
            type:Boolean
        },
    },
    methods:{
        handleClose(){
            this.$emit('update:dialogVisible',false)
        },
        clsoseAddress(){
            this.$refs.addressRuleForm.resetFields()
        },
    },
}
</script>

<style>

</style>