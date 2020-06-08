<template>
    <el-container>
        <el-table border stripe :data="userList">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column prop="mg_state" label="状态">
                <template slot-scope="scope">
                    <!-- {{scope.row.mg_state}} -->
                    <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button @click="showModfiy(scope.row.id)" size="small" type="primary" icon="el-icon-edit"></el-button>
                    <el-button @click="deleteUser(scope.row.id)" size="small" type="danger" icon="el-icon-delete"></el-button>
                    <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button size="small" type="warning" icon="el-icon-setting"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 对话框 -->
        <modify-user :modifyVisible.sync = "modifyVisible"
         :ModifyUserForm="ModifyUserForm"
         v-on="$listeners"></modify-user>    
        
    </el-container>
</template>

<script>

import {getSwitchType,getUserId,deleteUser} from 'api/api.js'
import ModifyUser from './ModifyUser'


export default {
    name:'formTable',
    data(){
        return{
           modifyVisible:false,
           ModifyUserForm:{},//修改的用户信息
        }
    },
    props:{
        userList:{
            type:Array,
            default(){
                return []
            }
        },
    },
    methods:{
        userStateChanged(userInfo){//监听switch开关
            getSwitchType(userInfo.id,userInfo.mg_state).then(res=>{
                if(res.meta.status !==200){
                    this.$message.error('更新用户状态失败')
                    userInfo.mg_state = !userInfo.mg_state
                }else{
                    this.$message.success('更新用户状态成功')    
                }
            })
        },
        showModfiy(id){//显示修改用户资料的对话框
            this.modifyVisible = true
            getUserId(id).then(res=>{
                if(res.meta.status !== 200){
                    return this.$message.error('查询用户信息失败')
                }else{
                    this.ModifyUserForm = res.data
                    // console.log('ModifyUserForm',this.ModifyUserForm)
                }
            })
        },
        async deleteUser(id){//根据id删除用户
           const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch((err)=>{
                // console.log(err)
                return err
            })
            //用户删除返回confirm
            //用户取消返回cancle
            if(confirmResult !== 'confirm'){
                this.$message.info('已取消删除')
            }else{
                deleteUser(id).then(res=>{
                    // console.log(res)
                    if(res.meta.status == 200){
                        this.$message.success('删除成功');
                        this.$listeners.getUsers();
                    }else{
                        this.$message.error('删除用户失败')
                    }
                })
            }
        },
    },
    inheritAttrs: false,
    components:{
        ModifyUser,
    }
}
</script>

<style>
    .el-table{
        margin-top: 25px;
    }
</style>