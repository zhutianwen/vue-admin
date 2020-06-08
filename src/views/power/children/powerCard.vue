<template>
    <el-card>
        <el-table :data="AllRights" border stripe >
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" label="权限名称" prop="authName"></el-table-column>
            <el-table-column align="center" label="路径" prop="path"></el-table-column>
            <el-table-column align="center" label="权限等级" prop="level">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level =='0' ">一级权限</el-tag>
                    <el-tag v-else-if="scope.row.level == '1'" type="success">二级权限</el-tag>
                    <el-tag v-else type="warning">三级权限</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>



export default {
    name:'powerCard',
    props:{
        AllRights:{
            type:Array,
            default(){
                return []
            }
        }
    },
}
</script>

<style>
    .powe-table{
        text-align: center;
    }
</style>