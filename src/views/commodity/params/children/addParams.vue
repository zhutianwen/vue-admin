<template>
    <el-dialog
        :title="'添加'+titleText"
        :visible.sync="addParamsDialog"
        width="50%"
        :before-close="handleClose"
        @close="paramsDialog">
        <el-form :model="addParamsRuleForm"
                :rules="addParamsRules"
                ref="addParamsRuleForm"
                label-width="100px" >
            <el-form-item :label="titleText" prop="attr_name">
                <el-input v-model="addParamsRuleForm.attr_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addParams">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import {addParams} from 'api/api.js'

export default {
    name:"addParams",
    data(){
        return{
            addParamsRules:{
                attr_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ]
            },
           
        }
    },
    props:{
        addParamsDialog:{
            type:Boolean
        },
        titleText:{
            type:String,
        },
        addParamsRuleForm:{
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
            this.$emit('update:addParamsDialog',false)
        },
        paramsDialog(){//对话框关闭重置表单
            this.$refs.addParamsRuleForm.resetFields();
        },
        addParams(){//点击按钮添加参数
            this.$refs.addParamsRuleForm.validate(valid=>{
                console.log(valid)
                if(!valid) return
                addParams(this.catId,this.addParamsRuleForm.attr_name,this.activeName).then(res=>{
                    console.log(res)
                    if(res.meta.status !==201){
                        return this.$message.error('添加失败')
                    }
                    this.$message.success('添加成功');
                    this.$emit('update:addParamsDialog',false);
                    this.$emit('getAttributes')
                })
            })
        },
    },
}
</script>

<style>

</style>