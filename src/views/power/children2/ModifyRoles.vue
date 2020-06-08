<template>
     <el-dialog
        title="添加角色"
        :visible.sync="modifyVisible"
        width="50%"
        :before-close="handleClose"
        @close="clsoeClick">
       <el-form
        ref="modifyRolesForm"
         :model="modifyRolesForm"
          label-width="80px"
           :rules = "rolesRule">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="modifyRolesForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="modifyRolesForm.roleDesc"></el-input>
            </el-form-item>
       </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addRoles">确 定</el-button>
        </span>
    </el-dialog>   
</template>

<script>

import {putRolesInfo} from 'api/api.js'

export default {
    name:'ModifyRoles',
    data(){
        return{
            rolesRule:{
                roleName:[
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                roleDesc:[
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
            },
        }    
    },
    inheritAttrs: false,
    props:{
        modifyVisible:{
            type:Boolean
        },
        modifyRolesForm:{
            type:Object,
            default(){
                return {}
            }
        },
        getAllroles:{
            type: Function,
            default: null
        },
    },
    methods:{
        handleClose(){
            this.$emit('update:modifyVisible',false);
        },
        clsoeClick(){
            this.$refs.modifyRolesForm.resetFields();
        },
        addRoles(){
             this.$refs.modifyRolesForm.validate((vaild)=>{
                if(!vaild) return
                putRolesInfo(this.modifyRolesForm.roleId,this.modifyRolesForm.roleName,this.modifyRolesForm.roleDesc).then(res=>{
                    console.log(res)
                    if(res.meta.status == 200){
                        this.$message.success('更改成功');
                        this.$emit('update:modifyVisible',false);
                        this.$listeners.getAllroles();
                    }
                })
             })
        },
    }
}
</script>

<style>

</style>