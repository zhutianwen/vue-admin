<template>
    <div>
        <!-- 面包屑导航 -->
        <bread-crumb>
            <el-breadcrumb-item slot="one">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item slot="two">分类参数</el-breadcrumb-item>
        </bread-crumb>
        <!-- 卡片 -->
        <el-card>
            <el-alert
                title="注意：只允许为第三级分类设置相关参数"
                type="warning"
                show-icon
                :closable="false">
            </el-alert>
            <!--  -->
            <el-row class="cat_opt">
                <el-col>
                    <span>选择商品分类：</span>
                    <el-cascader
                        v-model="value"
                        :options="cateList"
                        :props="cascaderProps"
                        @change="handleChange"
                        clearable
                        >
                    </el-cascader>
                </el-col>
            </el-row>
            <!-- tab切换 -->
             <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="动态参数" name="many">
                    <el-button @click="addParamsDialog = true"
                                class="elBtn"
                                :disabled="isBtn"
                                size="small"
                                type="primary">添加参数</el-button>
                    <el-table
                        :data="manyList"
                        style="width: 100%"
                        border
                        stripe>
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag @close="handleClose(i,scope.row)" closable v-for="(item,i) in scope.row.attr_vals" :key="i">{{item}}</el-tag>
                                <el-input
                                    class="input-new-tag"
                                    v-if="scope.row.inputVisible"
                                    v-model="scope.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)"
                                    >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column type="index"></el-table-column>
                        
                        <el-table-column
                            prop="attr_name"
                            label="参数名称">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button @click="openEditParamsDialog(scope.row.attr_id)" size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                                <el-button @click="deleteParams(scope.row.attr_id)" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                    <el-button @click="addParamsDialog = true"
                                class="elBtn"
                                :disabled="isBtn"
                                size="small"
                                type="primary">添加属性</el-button>
                    <el-table
                        :data="onlyList"
                        style="width: 100%"
                        border
                        stripe>
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag @close="handleClose(i,scope.row)" closable v-for="(item,i) in scope.row.attr_vals" :key="i">{{item}}</el-tag>
                                <el-input
                                    class="input-new-tag"
                                    v-if="scope.row.inputVisible"
                                    v-model="scope.row.inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)"
                                    >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column
                            prop="attr_name"
                            label="属性名称">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button @click="openEditParamsDialog(scope.row.attr_id)" size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                                <el-button @click="deleteParams(scope.row.attr_id)" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            
        </el-card>
        <!-- 添加动态参数对话框 -->
        <add-params
            :addParamsDialog.sync="addParamsDialog"
            :titleText="titleText"
            :addParamsRuleForm="addParamsRuleForm"
            :catId= "catId"
            :activeName="activeName"
            @getAttributes="getAttributes"></add-params>
        <!-- 修改动态参数对话框 -->
        <edit-params
            :editParamsDialog.sync="editParamsDialog"
            :titleText="titleText"
            :editParamsRuleForm="editParamsRuleForm"
            :catId= "catId"
            :activeName="activeName"
            @getAttributes="getAttributes"></edit-params>
    </div>
</template>

<script>

import {goodsList,getAttributes,queryParams,deleteParams,putParams} from 'api/api.js'
import breadCrumb from 'components/breadCrumb/breadCrumb'
import addParams from './children/addParams'
import editParams from './children/editParams'

export default {
    name:"params",
    data(){
        return{
            cateList:[],
            cascaderProps:{
                expandTrigger: 'hover',
                value:'cat_id',
                label:'cat_name',
                children:'children',
            },
            value:[], 
            activeName:'many',
            manyList:[],
            onlyList:[],
            addParamsDialog:false,
            addParamsRuleForm:{//添加参数的表单数据
                attr_name:""
            },
            editParamsDialog:false,
            editParamsRuleForm:{//修改参数的表单数据
               
            },
            // inputVisible:false,
            // inputValue:'',
        }
    },
    computed:{
        isBtn(){
            if(this.value.length !==3){
                return true
            }
            return false
        },
        catId(){//当前选中的三级id
            if(this.value.length===3){
                return this.value[2]
            }
            return null
        },
        titleText(){//动态计算标题文本
            if(this.activeName==='many'){
                return '动态参数'
            }
            return '静态属性'
        },
    },
    created(){
        this.goodsList();
    },
    methods:{
        goodsList(){
            goodsList().then(res=>{
                // console.log(res);
                this.cateList = res.data
            })
        },
        getAttributes(){
            if(this.value.length !==3){
                this.value = []
                return
            }
            getAttributes(this.catId,this.activeName).then(res=>{
                res.data.forEach(item=>{
                   item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
                   //控制文本框的显示与隐藏
                   item.inputVisible = false;
                   item.inputValue = ""
                })
                // console.log(res.data)
                if(this.activeName === 'many'){
                    this.manyList = res.data
                }else{
                    this.onlyList = res.data
                }
            })
        },
        handleChange(){
            // console.log(this.value)
            this.getAttributes();
        },
        handleClick(){
            // console.log(this.activeName)
            this.getAttributes();
        },
        openEditParamsDialog(attr_id){
            // console.log(id)
            queryParams(this.catId,attr_id,this.activeName).then(res=>{
                // console.log(res)
                if(res.meta.status!==200){
                    return this.$message.error('获取参数失败')
                }
                this.editParamsRuleForm = res.data
                // console.log(this.editParamsRuleForm)
            })
            this.editParamsDialog = true
        },
        async deleteParams(id){
            console.log(id)
          const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>{
                return err
            })
            // console.log(confirmResult)
            if(confirmResult !== 'confirm'){
                return this.$message.info('已取消删除')
            }else{
                deleteParams(this.catId,id).then(res=>{
                    // console.log(res)
                    if(res.meta.status !==200){
                        return this.$message.error('删除失败')
                    }
                    this.$message.success('删除成功')
                    this.getAttributes();
                })
            }
        },
        putParams(row){//添加参数可选项
            putParams(this.catId,
                        row.attr_id,
                        row.attr_name,
                        row.attr_sel,
                        row.attr_vals.join(' ')
            ).then(res=>{
                console.log(res);
                // console.log(this.catId,'///////////')
                if(res.meta.status !==200){
                    return this.$message.err('添加失败')
                }
                this.$message.success('添加成功')
            })  
        },
        handleInputConfirm(row){
            if(row.inputValue.trim().length === 0){
                row.inputValue = '';
                row.inputVisible = false;
                return    
            }
            //如果没有return 则证明输入了内容 处理
                row.attr_vals.push(row.inputValue.trim())   
                row.inputValue = ''; 
                row.inputVisible = false;
            //发起请求保存操作  
                this.putParams(row);
        },
        showInput(row){//点击按钮显示文本框
            row.inputVisible = true;
            this.$nextTick(_ => {//文本框自动获得焦点
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleClose(i,row){//删除对应的参数可选项
            row.attr_vals.splice(i);
            this.putParams(row);
        }
    },
    components:{
        breadCrumb,
        addParams,
        editParams
    },
}
</script>

<style scoped>
    .cat_opt{
        margin: 15px 0;
    }
    .elBtn{
        margin-bottom: 15px;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .el-tag{
        margin: 0 10px;
    }
</style>