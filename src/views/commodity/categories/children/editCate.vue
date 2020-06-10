<template>
    <el-dialog
        title="编辑分类"
        :visible.sync="editCateDialog"
        width="50%"
        :before-close="handleClose">
        <el-form
         :model="editCateRuleForm" 
         :rules="editCateRules"
          ref="editCateRuleForm" 
          label-width="100px">
            <el-form-item label="分类名称：" prop="cat_name">
                <el-input v-model="editCateRuleForm.cat_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="eiditCate">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import {putCateById} from 'api/api.js'

export default {
    name:'editCate',
    data(){
        return{
            editCateRules:{
                cat_name:[
                     { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        handleClose(){
            this.$emit('update:editCateDialog',false)
        },
        eiditCate(){
            // console.log(this.editCateRuleForm.cat_pid)
            // console.log(this.editCateRuleForm.cat_name)
            this.$refs.editCateRuleForm.validate(vaild=>{
                if(!vaild) return
                putCateById(this.editCateRuleForm.cat_id,this.editCateRuleForm.cat_name).then(res=>{
                    console.log(res)
                    if(res.meta.status !==200){
                        return this.$message.error('修改失败')
                    }else{
                        this.$message.success('修改成功');
                        this.$emit('update:editCateDialog',false);
                        this.$listeners.goodsList();
                    }
                    
                })
            })
           
        },
    },
    inheritAttrs:false,
    props:{
        editCateDialog:{
            type:Boolean,
        },
        editCateRuleForm:{
            type:Object,
            default :{}
        },
        goodsList:{
            type:Function,
            default :null
        },
    },
}
</script>

<style>

</style>