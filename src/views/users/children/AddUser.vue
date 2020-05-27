<template>
    <el-dialog
        title="提示"
        :visible.sync="addUserVisible"
        width="50%"
        >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUserVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name:'AddUser',
    data(){
        return{
            addUserVisible:true
        }
    }
}
</script>

<style>

</style>