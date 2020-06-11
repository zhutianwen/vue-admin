<template>
    <el-dialog
        :title="'修改'+titleText"
        :visible.sync="editParamsDialog"
        width="50%"
        :before-close="handleClose"
        @close="paramsDialog">
        <el-form :model="editParamsRuleForm"
                :rules="editParamsRules"
                ref="editParamsRuleForm"
                label-width="100px" >
            <el-form-item :label="titleText" prop="attr_name">
                <el-input v-model="editParamsRuleForm.attr_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="editparams">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import {putParams} from 'api/api.js'

export default {
    name:'editParams',
    data(){
        return{
            editParamsRules:{
                attr_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ]
            },
        }
    },
    props:{
        editParamsDialog:{
            type:Boolean
        },
        titleText:{
            type:String
        },
        editParamsRuleForm:{
            type:Object,
            default:{}
        },
        catId:{
            type:Number,
        },
        activeName:{
            type:String,
        },
    },
    methods:{
        handleClose(){
            this.$emit('update:editParamsDialog',false)
        },
        paramsDialog(){//对话框关闭重置表单
            this.$refs.editParamsRuleForm.resetFields();
        },
       editparams(){//修改参数
             this.$refs.editParamsRuleForm.validate(valid=>{
                if(!valid) return
                putParams(
                    this.catId,
                    this.editParamsRuleForm.attr_id,
                    this.editParamsRuleForm.attr_name,
                    this.activeName
                ).then(res=>{
                    console.log(res)
                    if(res.meta.status !==200){
                        return this.$message.error('修改失败')
                    }else{
                        this.$message.success('修改成功')
                        this.$emit('update:editParamsDialog',false)
                        this.$emit('getAttributes')
                    }
                })
            })
        },
    },
}
</script>

<style>

</style>