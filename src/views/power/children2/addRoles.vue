<template>
    <el-dialog
        title="添加角色"
        :visible.sync="addRolesVisible"
        width="50%"
        :before-close="handleClose"
        @close="clsoeClick">
       <el-form
        ref="addRolesForm"
         :model="addRolesForm"
          label-width="80px"
           :rules = "rolesRule">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="addRolesForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="addRolesForm.roleDesc"></el-input>
            </el-form-item>
       </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addRoles">确 定</el-button>
        </span>
    </el-dialog>    
</template>

<script>
import {addRoles} from 'api/api.js'

export default {
    name:'addRoles',
    data(){
        return{
            addRolesForm:{
                roleName:"",
                roleDesc:"",
            },
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
    props:{
        addRolesVisible:{
            type:Boolean,
        },
        getAllroles:{
            type: Function,
            default: null
        },
    },
    inheritAttrs: false,
    methods:{
        handleClose(){
            this.$emit('update:addRolesVisible',false);
        },
        clsoeClick(){
            this.$refs.addRolesForm.resetFields();
        },
        addRoles(){
            this.$refs.addRolesForm.validate((vaild)=>{
                if(!vaild) return
                addRoles(this.addRolesForm.roleName,this.addRolesForm.roleDesc).then(res=>{
                    if(res.meta.status == 201 ){
                        this.$message.success('添加成功');
                        this.$emit('update:addRolesVisible',false);
                        this.$listeners.getAllroles();
                    }else{
                        this.$message.error('添加失败');   
                    }
                })
            })
            
        },
    },
}
</script>

<style>

</style>