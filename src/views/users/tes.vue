<template>
    <div class="users">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容" v-model="query" @clear="getUsers" clearable>
                        <el-button @click="getUsers" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialog = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table :data="this.usersList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column prop="mg_state" label="状态">
                    <template slot-scope="scope">
                        <!-- {{scope.row.mg_state}} -->
                        <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope"> 
                        <el-button @click="update(scope.row.id)" size="small" type="primary" icon="el-icon-edit"></el-button>
                        <el-button size="small" type="danger" icon="el-icon-delete"></el-button>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button size="small" type="warning" icon="el-icon-setting"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            <!-- 添加用户对话框 -->
            <el-dialog
                title="添加用户"
                :visible.sync="addDialog"
                width="50%"
                 @close="addDialogClose">
                <el-form :model="addForm"
                 :rules="addFormRules"
                  ref="addFormRuleForm"
                   label-width="70px">
                    <el-form-item prop="name" label="用户名" >
                        <el-input v-model="addForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码" >
                        <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="email" label="邮箱" >
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" label="手机" >
                        <el-input v-model="addForm.phone"></el-input>
                    </el-form-item>
                    
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改用户对话框 -->
            <el-dialog
                title="修改用户"
                :visible.sync="xiugai"
                width="50%"
                @close="xiugaiClsoe"
                >
                <el-form ref="userIdInfo"
                 :rules="editFormRules"
                 :model="userIdInfo"
                  label-width="70px">
                    <el-form-item label="用户名">
                        <el-input v-model="userIdInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="userIdInfo.email" ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone2">
                        <el-input v-model="userIdInfo.mobile" ></el-input>
                    </el-form-item>
                    
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="xiugai = false">取 消</el-button>
                <el-button type="primary" @click="userInfo">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>

import {getUsers,getSwitchType,getAddUser,getUserId} from 'api/api.js'

export default {
    name:'users',
    data(){
        var checkPhone =(rule,value,callback) =>{
            const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if(regPhone.test(value)){
               return callback()
           }else{
               return callback(new Error('手机号有误'));
           } 
        };
        var checkEmail =(rule,value,callback) =>{
           const regEmail =/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
           if(regEmail.test(value)){
               return callback()
           }else{
               return callback(new Error('邮箱有误'));
           } 
        };
        return{
            query:'',
            pagenum:1,//currentPage4 当前页
            pagesize:2,  //page-size 当前显示几条
            usersList:[],
            total:0,
            userIdInfo:{},//用户信息
            addDialog:false, //对话框隐藏
            xiugai:false,//修改用户
            addForm:{//添加用户表单数据
                name:'',
                password:'',
                phone:"",
                email:''
            },
            addFormRules:{//添加表单验证
                name:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 密码
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }    
                ],
                // 邮箱
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur'}  
                ],
                // 手机
                phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkPhone, trigger: 'blur' }
                ],
            },
            editFormRules:{//修改表单验证
                // 邮箱
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur'}  
                ],
                // 手机
                phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkPhone, trigger: 'blur' }
                ],
                
            }
        }
    },
    created(){
        this.getUsers();
    },
    methods:{
        getUsers(){
            let query = this.query
            let pagenum = this.pagenum
            let pagesize = this.pagesize
            getUsers(query,pagenum,pagesize).then(res =>{
                // console.log(res)
                this.usersList = res.data.users
                this.total = res.data.total
                // console.log(this.usersList)
            })
        },
        handleSizeChange(val){//监听pagesize 改变事件
            // console.log(val)
            this.pagesize = val
            this.getUsers();
        },
        handleCurrentChange(val){//监听当前页
            // console.log(val)
            this.pagenum = val 
            this.getUsers();
        },
        userStateChanged(userInfo){//监听switch开关的改变
            // console.log(userInfo.id)
            // console.log(userInfo.mg_state)
            // alert(typeof (userInfo.id))
            getSwitchType(userInfo.id,userInfo.mg_state).then( res=> {
                // console.log(res)
                if(res.meta.status !== 200){
                    userInfo.mg_state = !userInfo.mg_state
                    this.$message.closeAll()
                    this.$message.error('更新用户状态失败')
                }else{  
                    this.$message.closeAll()
                    this.$message.success('更新用户状态成功')
                }
            })
       },    
       addDialogClose(){//监听添加用户对话框关闭
            this.$refs.addFormRuleForm.resetFields();
       },
       addUser(){//添加新用户
                let username = this.addForm.name
                let password = this.addForm.password
                let mobile = this.addForm.phone
                let email = this.addForm.email
            this.$refs.addFormRuleForm.validate((vaild)=>{
                if(!vaild) return
                getAddUser(username,password,mobile,email).then(res=>{
                    console.log(res)
                    if(res.meta.status != 201){
                        this.$message.error('添加用户失败')
                    }else{  
                        this.$message.success('添加用户成功')
                        this.addDialog = false;
                        this.getUsers()
                    }
                })
            })
       },
       update(id){//显示修改用户资料的对话框
    //    console.log(id)
            this.xiugai = true
            getUserId(id).then(res=>{
                if(res.meta.status !== 200){
                    return this.$message.error('查询用户信息失败')
                }else{
                    this.userIdInfo = res.data
                    console.log(this.userIdInfo)
                }
            })
       },
       xiugaiClsoe(){//监听修改用户对话框的关闭
            this.$refs.userIdInfo.resetFields();
       },
       userInfo(){//修改用户并提交
            this.$refs.userIdInfo.validate(vaild=>{
                console.log(vaild)
            })
       },
    },
    components:{
     
    },
}
</script>

<style>
    .el-breadcrumb{
        margin-bottom: 20px;
    }
    .el-card{
        box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
    }
    .el-table{
        margin-top: 25px;
    }
    .el-pagination{
        margin-top: 25px;
    }
</style>