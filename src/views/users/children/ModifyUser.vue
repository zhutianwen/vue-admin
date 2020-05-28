<template>
    <el-dialog
        title="修改用户信息"
        :visible.sync="modifyVisible"
        width="50%"
        :before-close="handleClose"
        @close="closeModfiy">
        <el-form ref="ModifyUserRef" :model="ModifyUserForm" label-width="70px" :rules="rules2">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ModifyUserForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ModifyUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="ModifyUserForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel2">取 消</el-button>
            <el-button type="primary" @click="modfiyUser">确 定</el-button>
        </span>
        <div>{{ModifyUserForm}}</div>
    </el-dialog>
</template>

<script>

import rules2 from 'assets/js/custom.js'
import {getNewUser} from 'api/api.js'

export default {
    name:"ModifyUser",
    data(){
        return{
            rules2:{
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
    props:{
        modifyVisible:{
            type:Boolean,
        },
        ModifyUserForm:{//修改用户的信息
            type:Object,
            default(){
                return {}
            }
        },
    },
    methods:{
        handleClose(){
            this.$emit('update:modifyVisible',false)
        },
        closeModfiy(){
            //监听修改用户对话框的关闭
            this.$refs.ModifyUserRef.resetFields();
        },
        cancel2(){
            this.$emit('update:modifyVisible',false)
        },
        modfiyUser(){//修改用户资料提交
            this.$refs.ModifyUserRef.validate(vaild=>{
                if(!vaild) return
                // let id = this.ModifyUserForm.id
                let mobile = this.ModifyUserForm.mobile
                let email = this.ModifyUserForm.email
                // console.log(id)
                console.log(email)
                console.log(mobile)
                // console.log(ModifyUserForm.username)
                getNewUser(this.ModifyUserForm.id,mobile,email).then(res=>{
                    console.log(res)
                })
            })
        },
    },
}
</script>

<style>

</style>