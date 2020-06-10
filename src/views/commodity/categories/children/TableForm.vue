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
            :addCateForm="addCateForm"></add-cate-dialog>
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
                <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            </template>
        </zk-table>
    </div>   
    
</template>

<script>

import addCateDialog from './addCateDialog'

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
        }
    },
    methods:{
        addCate(){
            this.cateDialog = true;
        },
    },
    props:{
        cateList:{
            type:Array,
            default:null
        },
    },
    components:{
        addCateDialog,
    },
}
</script>

<style>
    .zk-table{
        margin-top: 20px;
    }
</style>