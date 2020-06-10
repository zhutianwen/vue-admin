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
                <el-cascader
                    v-model="selectedKeys"
                    :options="parentCateList"
                    :props="cascaderProps"
                    @change="parentCateChange"
                    clearable
                    change-on-select>
                </el-cascader>
            </el-form-item>
        </el-form>
        <!-- <div>{{parentCateList}}</div> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addCate">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

import {addCategories} from 'api/api.js'

export default {
    name:'addCateDialog',
    data(){
        return{
            cateRules:{
                cat_name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ]
            },
            cascaderProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children',
                expandTrigger:'hover'
            },
            selectedKeys:[],//选中的父级分类id数组
        }
    },
    methods:{
        handleClose(){
            this.$emit('update:cateDialog',false)
        },
        addCateClose(){
            this.$refs.addCateRef.resetFields();
            this.selectedKeys = [];
            this.addCateForm.cat_pid = 0;
            this.addCateForm.cat_level =0;
        },
        parentCateChange(){//
            // console.log(this.selectedKeys);
            if(this.selectedKeys.length > 0){
                this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length-1]
                this.addCateForm.cat_level = this.selectedKeys.length
                return
            }else{
                this.addCateForm.cat_pid = 0;
                this.addCateForm.cat_level =0;
            }
        },
        addCate(){
            this.$refs.addCateRef.validate(valid=>{
                console.log(valid)
                if(!valid) return
                addCategories(this.addCateForm.cat_pid,
                            this.addCateForm.cat_name,
                            this.addCateForm.cat_level).then(res=>{
                    if(res.meta.status !== 201){
                        return this.$message.error('添加分类失败')
                    }
                    this.$message.success('添加分类成功');
                    this.$emit('update:cateDialog',false)
                    this.$listeners.goodsList();

                })
            })
            // console.log(this.addCateForm)
        },
    },
    inheritAttrs: false,
    props:{
        cateDialog:{
            type:Boolean,
        },
        addCateForm:{
            type:Object,
            default:{}
        },
        parentCateList:{
            type:Array,
            default:[]
        },
        goodsList:{
            type: Function,
            default: null
        }
    },
}
</script>

<style>
    .el-cascader{
        width: 100%;
    }
</style>