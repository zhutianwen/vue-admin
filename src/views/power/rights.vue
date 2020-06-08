<template>
    <div class="">
        <!-- 面包屑导航 -->
        <bread-crumb>
            <el-breadcrumb-item slot="one">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item slot="two">权限列表</el-breadcrumb-item>
        </bread-crumb>
        <!-- 卡片 -->
        <power-card :AllRights="AllRights"></power-card>
    </div>
</template>

<script>

import breadCrumb from 'components/breadCrumb/breadCrumb'
import powerCard from './children/powerCard'
import {getAllRights} from 'api/api.js'

export default {
    name:'rights',
    data(){
        return{
            type:'list',
            AllRights:[],
        }
    },
    created(){
        this.getAllRights();
    },
    methods:{
        getAllRights(){
            getAllRights(this.type).then(res=>{
                this.AllRights = res.data
            })
        },
    },
    components:{
        breadCrumb,
        powerCard
    },
}
</script>

<style>

</style>