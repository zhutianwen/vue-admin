<template>
    <div>
        <el-row>
            <el-col>
                    <el-button @click="addCate" class="rloesBtn" type="primary">添加分类</el-button>   
            </el-col>
        </el-row>
        <!-- 添加分类的对话框 -->
        <add-cate-dialog 
            :cateDialog.sync="cateDialog"
            :addCateForm="addCateForm"
            :parentCateList="parentCateList"
            v-on="$listeners"></add-cate-dialog>
        <!-- 表格 -->
        <zk-table
                :data="cateList"
                :columns="columns"
                :selection-type="false"
                :expand-type="false"
                show-index
                index-text="#"
                border
                :show-row-hover="false">
            <!-- 是否有效 -->
            <template slot="isOk" slot-scope="scope" >
                <i style="font-size:15px;color:lightgreen" class="el-icon-circle-check" v-if="scope.row.cat_deleted === false"></i>
                <i style="font-size:15px;color:red" class="el-icon-circle-close" v-else></i>
            </template>  
            <!-- 排序 -->
            <template slot="order" slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.cat_level ===0 ">一级</el-tag>    
                <el-tag size="mini" v-else-if="scope.row.cat_level ===1 " type="success">二级</el-tag>    
                <el-tag size="mini" v-else type="warning">三级</el-tag>    
            </template>
            <!-- 操作 -->
            <template slot="action" slot-scope="scope">
                <el-button @click="CateEdit(scope.row.cat_id)" size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button @click="deleteCate(scope.row.cat_id)" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
        </zk-table>
        <!-- 修改分类对话框 -->
        <edit-cate
         :editCateDialog.sync="editCateDialog"
         :editCateRuleForm="editCateRuleForm"
         v-on="$listeners"></edit-cate>
    </div>   
    
</template>

<script>

import {goodsList,getCateById,deleteCateById} from 'api/api.js'

import addCateDialog from './addCateDialog'
import editCate from './editCate'

export default {
    name:'TableForm',
    data(){
        return{
            columns:[
                {
                    label:'分类名称',
                    prop:'cat_name'
                },
                {
                    label:'是否有效',
                    type:'template',
                    template:'isOk',
                },
                {
                    label:'排序',
                    type:'template',
                    template:'order',
                },
                {
                    label:'操作',
                    type:'template',
                    template:'action',
                },
            ],
            cateDialog:false,
            addCateForm:{//添加分类表单数据对象
                cat_name:'',
                cat_pid:0,//父级id
                cat_level:0,//分类等级1
            },
            type:2,
            parentCateList:[],//父级分类列表
            editCateDialog:false,
            editCateRuleForm:{},
        }
    },
    methods:{
        addCate(){
            this.goodsList();//先获取父级分类的列表
            this.cateDialog = true;
        },
        goodsList(){//获取父级分类的列表
            goodsList(this.type).then(res=>{
                // console.log(res.data)
                this.parentCateList = res.data;
            })
        },
        CateEdit(id){
            // console.log(id)
            getCateById(id).then(res=>{
                this.editCateRuleForm = res.data
                // console.log(this.editCateRuleForm)
            })
            this.editCateDialog = true;
        },
       async deleteCate(id){//根据id删除分类
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>{
                // console.log(err)
                return err
            })
            if(confirmResult !== 'confirm'){
                this.$message.info('已取消删除')
            }else{
                deleteCateById(id).then(res=>{
                    console.log(res)
                    if(res.meta.status !== 200){
                        return this.$message.error('删除失败')
                    }else{
                        this.$message.success('删除成功');
                        this.$emit('goodsList')
                    }
                })
            }
        },
    },
    inheritAttrs: false,
    props:{
        cateList:{
            type:Array,
            default:null
        },
    },
    components:{
        addCateDialog,
        editCate
    },
}
</script>

<style>
    .zk-table{
        margin-top: 20px;
    }
</style>