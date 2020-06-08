<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot name="one"></slot>    
        </el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot name="two"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>    
</template>

<script>
export default {
    name:'breadCrumb'
}
</script>

<style>
    .el-breadcrumb{
        margin-bottom: 20px;
    }
</style>