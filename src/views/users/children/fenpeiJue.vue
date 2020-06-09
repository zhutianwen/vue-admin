<template>
    <el-dialog
        title="分配角色"
        :visible.sync="fenpeiJueDialog"
        width="50%"
        :before-close="handleClose"
        @close="closeDialog"
        >
        <div>
            <p>当前的用户：{{roleinfo.username}}</p>
            <p>当前的角色：{{roleinfo.role_name}}</p>
            <p>分配新角色：
                <el-select v-model="selRoleId" placeholder="请选择">
                    <el-option
                    v-for="item in rolesList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import {putUserRole} from 'api/api.js'

export default {
    name:'',
    data(){
        return{
            selRoleId:this.selectRoleId,
        }
    },
    inheritAttrs: false,
    props:{
        fenpeiJueDialog:{
            type:Boolean
        },
        roleinfo:{
            type:Object,
            default : {}
        },
        rolesList:{
            type:Array,
            default : []
        },
        selectRoleId:{
            type:String,
        }
    },
    methods:{
        handleClose(){
            this.$emit('update:fenpeiJueDialog',false);
        },
        saveRoleInfo(){//分配角色
            if(!this.selRoleId){
                return this.$message.error('请选择要分配的角色')
            }
            putUserRole(this.roleinfo.id,this.selRoleId).then(res=>{
                console.log(res)
                if(res.meta.status !==200){
                   return this.$message.error('分配角色失败')
                }else{
                    this.$message.success('分配角色成功');
                    this.$listeners.getUsers();
                    this.$emit('update:fenpeiJueDialog',false);
                }
            })
        },
        closeDialog(){
            this.selRoleId = '';
            this.$emit('update:roleinfo',{});
        },
    },
}
</script>

<style>

</style>