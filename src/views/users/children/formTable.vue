<template>
    <el-table border stripe :data="userList">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
                <!-- {{scope.row.mg_state}} -->
                <el-switch v-model="scope.row.mg_state"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="small" type="primary" icon="el-icon-edit"></el-button>
                <el-button size="small" type="danger" icon="el-icon-delete"></el-button>
                <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                    <el-button size="small" type="warning" icon="el-icon-setting"></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name:'formTable',
    props:{
        userList:{
            type:Array,
            default(){
                return []
            }
        }
    }

}
</script>

<style>
    .el-table{
        margin-top: 25px;
    }
</style>