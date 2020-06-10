<template>
    <el-dialog
        title="添加分类"
        :visible.sync="cateDialog"
        width="50%"
        :before-close="handleClose"
         @close="addCateClose">
        <el-form
         :model="addCateForm"
          :rules="cateRules"
           ref="addCateRef"
            label-width="100px"
           >
            <el-form-item label="分类名称:" prop="cat_name">
                <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类:">
                <el-input></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name:'addCateDialog',
    data(){
        return{
            cateRules:{
                cat_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        handleClose(){
            this.$emit('update:cateDialog',false)
        },
        addCateClose(){
            this.$refs.addCateRef.resetFields();
        },
    },
    props:{
        cateDialog:{
            type:Boolean,
        },
        addCateForm:{
            type:Object,
            default:{}
        },
    },
}
</script>

<style>

</style>