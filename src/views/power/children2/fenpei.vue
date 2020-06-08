<template>
    <el-dialog
    title="分配权限"
    :visible.sync="showPowerRight"
    width="30%"
    :before-close="handleClose" 
    @close="setRightClose">
    <!-- 树形控件 -->
    <el-tree 
            :data="quanXian"
            :props="TreeProps"
            show-checkbox 
            node-key='id'
            default-expand-all
            :default-checked-keys="defKeys"
            ref="treeRef"></el-tree>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="allotRughts">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>

import {putRoleRights} from 'api/api.js'

export default {
    name:'fenpei',
    data(){
        return{
            TreeProps:{
                label:'authName',
                children:'children',
            },
            
        }
    },
    inheritAttrs: false,
    props:{
        showPowerRight:{
            type:Boolean
        },
        roleId:{
            type:Number
        },
        quanXian:{
            type:Array,
            default(){
                return []
            }
        },
        defKeys:{
            type:Array,
            default(){
                return []
            }
        },
        getAllRithts:{
            type:Function,
            default:null
        },
    },
    
    methods:{
        handleClose(){
            this.$emit('update:showPowerRight',false);
        },
        setRightClose(){//监听分配权限对话框的关闭
            this.$emit('update:defKeys',[])
        },
        allotRughts(){//分配权限
            const keys = [
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys()
            ];
            // console.log(keys)
            const idStr = keys.join(',')
             
            putRoleRights(this.roleId,idStr).then(res=>{
                if(res.meta.status !==200 ){
                    return this.$message.error('分配失败'); 
                }
                this.$message.success('分配成功')
                this.$emit('update:showPowerRight',false);
                this.$listeners.getAllroles();
            })
        },
    },
}
</script>

<style>

</style>