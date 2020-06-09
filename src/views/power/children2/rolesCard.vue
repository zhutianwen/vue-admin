<template>
    <el-card>
        <el-row>
            <el-col>
                <el-button class="rloesBtn" @click="addRoles" type="primary">添加角色</el-button>   
            </el-col>
            <add-roles :addRolesVisible.sync="addRolesVisible" v-on="$listeners"></add-roles>
        </el-row>
        <el-table :data="allRoles" border>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <!-- <pre>
                    {{scope.row}}
                    </pre> -->
                    <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '' , 'vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
                        <!-- 一级权限 -->
                        <el-col :span="5">
                            <el-tag closable @close="removeById(scope.row,scope.row.id,item1.id)">{{item1.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <!-- 二级权限 三级权限 -->
                        <el-col :span="19">
                            <el-row :class="[i2 === 0 ? '' : 'bdtop' , 'vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                                <el-col :span="6">
                                    <el-tag closable @close="removeById(scope.row,scope.row.id,item2.id)" type="success">{{item2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag @close="removeById(scope.row,scope.row.id,item3.id)" closable v-for="(item3,i3) in item2.children" :key="item3.id" type="warning">
                                        {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>  
                </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="350px">
                <template slot-scope="scope">
                    <el-button type="primary" @click="showDialog(scope.row.id)" class="el-icon-edit">编辑</el-button>
                    <el-button type="danger" @click="deleteRoles(scope.row.id)" class="el-icon-delete">删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" @click="showSetRight(scope.row)">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑角色对话框 -->
        <modify-roles :modifyVisible.sync = 'modifyVisible'
         :modifyRolesForm = "modifyRolesForm"
         v-on="$listeners"></modify-roles>
         <!-- 分配权限对话框 -->
          <fenpei
           :showPowerRight.sync = "showPowerRight" 
           :quanXian = "quanXian"
           :defKeys.sync = "defKeys"
           :roleId.sync = "roleId"
           v-on="$listeners"></fenpei>
    </el-card>
</template>

<script>

import {rolesInfo,
        deleteRoles,
        deleteRolespower,
        getAllRithts
    } from 'api/api.js'

import AddRoles from './addRoles'
import ModifyRoles from './ModifyRoles'
import fenpei from './fenpei'


export default {
    name:"rolesCard",
    data(){
        return{
            addRolesVisible:false,
            modifyVisible:false,
            showPowerRight:false,
            modifyRolesForm:{},
            type : 'tree',
            quanXian:[],
            defKeys:[],//默认选中的节点Id值数组
            roleId:39,//当前即将分配的id
        }
    },
    props:{
        allRoles:{
            type:Array,
            default(){
                return []
            }
        },
    },
    inheritAttrs: false,
    methods:{
        addRoles(){
           this.addRolesVisible = true
        },
        showDialog(id){
           this.modifyVisible = true;
           rolesInfo(id).then(res=>{
               console.log(res)
               this.modifyRolesForm = res.data
           })
        },
        async deleteRoles(id){
            const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).catch((err)=>{
                // console.log(err)
                return err
            })
            // console.log(confirmResult)
            if(confirmResult !== 'confirm'){
                this.$message.info('已取消删除')
            }else{
                deleteRoles(id).then(res=>{
                    // console.log(res)
                    if(res.meta.status == 200){
                        this.$message.success('删除成功');
                        this.$listeners.getAllroles();
                    }else{
                        this.$message.error('删除用户失败')
                    }
                })
            }
        },
        async removeById(role,roleId,rightId){//根据id 删除对应权限
           const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).catch((err)=>{
                // console.log(err)
                return err
            });
            if(confirmResult !== 'confirm'){
                this.$message.info('已取消删除')
            }else{
                deleteRolespower(roleId,rightId).then(res=>{
                    // console.log(res)
                    if(res.meta.status == 200){
                        this.$message.success('删除成功');
                        // this.$listeners.getAllroles();
                        role.children = res.data;
                    }
                })
            }
        },
        showSetRight(role){//展示分配权限对话框
            this.roleId = role.id
            // 获取所遇权限数据
            getAllRithts(this.type).then(res=>{
                console.log(res)
                this.quanXian = res.data
            })
            // 递归获取三级节点的id
            this.getLeafKeys(role,this.defKeys);
            this.showPowerRight = true;
        },
        getLeafKeys(node,arr){//通过递归的形式，获取角色下所有三级权限的id,并保存到数组中
            if(!node.children){
                return arr.push(node.id)
            }else{
                node.children.forEach(item =>
                this.getLeafKeys(item,arr))
            }
        },
    },
    components:{
        AddRoles,
        ModifyRoles,    
        fenpei
    }
}
</script>

<style>
    .rloesBtn{
        margin-bottom: 20px;
    }
    .el-tag{
        margin: 7px;
    }
    .bdtop{
        border-top: 1px solid #eee;
    }
    .bdbottom{
        border-bottom: 1px solid #eee;
    }
    .vcenter{
        display: flex;
        align-items: center;
    }
</style>