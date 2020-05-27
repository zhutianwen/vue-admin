<template>
    <el-row :gutter="20">
        <el-col :span="6">
             <el-input placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span="6">
            <el-button type="primary" @click="addDialog = true">添加用户</el-button>
        </el-col>
        <add-user></add-user>
    </el-row>
</template>

<script>

import AddUser from './AddUser'

export default {
    name:'Search',
    components:{
        AddUser,
    },
}
</script>

<style>

</style>