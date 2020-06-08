<template>
    <div>
        <!-- 面包屑导航 -->
        <bread-crumb>
            <el-breadcrumb-item slot="one">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item slot="two">角色列表</el-breadcrumb-item>
        </bread-crumb>
        <!-- 卡片 -->
        <rolesCard :allRoles="allRoles" @getAllroles = "getAllroles"></rolesCard>
    </div> 
</template>

<script>

import breadCrumb from 'components/breadCrumb/breadCrumb'
import rolesCard from './children2/rolesCard'
import {getAllroles} from 'api/api.js'

export default {
    name:'roles',
    data(){
        return{
            allRoles:[],
        }
    },
    created(){
        this.getAllroles();
    },
    methods:{
        getAllroles(){
            getAllroles().then(res=>{
                // console.lo(res)
                this.allRoles  = res.data
            })
        },
    },
    components:{
        breadCrumb,
        rolesCard
    },
}
</script>

<style>

</style>