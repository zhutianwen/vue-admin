<template>
    <el-dialog
        title="添加用户"
        :visible.sync="addUserVisible"
        width="50%"
        :before-close="handleClose"
        @close="addUserDialog">
        <el-form :model="addUserForm" :rules="rules" ref="addUserForm" label-width="70px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="addUserForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="addUserForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="addUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="addUserForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="determine">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import {getAddUser} from 'api/api.js'
import  rules2 from 'assets/js/custom.js'

export default {
    name:'AddUser',
    data(){
        return{
            addUserForm: {
                name: '',
                password: '',
                email: '',
                mobile: ''
            },
            rules: {
                name:[
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator:rules2.FormValidate.Form().checkEmail, trigger: 'blur' }
                ],
                mobile:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator:rules2.FormValidate.Form().checkMobile, trigger: 'blur' }
                ],
            },
        }
    },
    inheritAttrs: false,
    props:{
        addUserVisible:{
            type:Boolean,
        },
        getUsers:{
            type: Function,
            default: null
        },
    },
    created(){
        
    },
    methods:{
        cancel(){
            this.$emit('update:addUserVisible',false)
        },
        determine(){//添加新用户
                let username = this.addUserForm.name
                let password = this.addUserForm.password
                let email = this.addUserForm.email
                let mobile = this.addUserForm.mobile
            this.$refs.addUserForm.validate((vaild)=>{
                if(!vaild) return
                getAddUser(username,password,email,mobile).then(res=>{
                    console.log(res)
                    if(res.meta.status != 201){
                        this.$message.error('添加用户失败')
                    }else{  
                        this.$message.success('添加用户成功')
                        this.$emit('update:addUserVisible',false)
                        this.$listeners.getUsers()
                    }
                })
            })
            
        },
        handleClose(){
            this.$emit('update:addUserVisible',false)
        },
        addUserDialog(){//监听对话框关闭 重置
            this.$refs.addUserForm.resetFields();
        },
    },
}
</script>

<style>

</style>