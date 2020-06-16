<template>
    <div>
         <!-- 面包屑导航 -->
        <bread-crumb>
            <el-breadcrumb-item slot="one">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item slot="two">添加商品</el-breadcrumb-item>
        </bread-crumb>
        <!-- 卡片视图 -->
        <el-card>
            <el-alert
                title="添加商品信息"
                type="info"
                show-icon
                center
                :closable="false">
            </el-alert>
            <!-- 步骤条 -->
            <el-steps align-center :space="200" :active="activeIndex-0" finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <!-- tab -->
            <el-form :model="addForm"
             :rules="addFormRules"
              ref="addFormRef"
               label-width="100px"
               label-position="top">               
                <el-tabs v-model="activeIndex"
                 :tab-position="'left'"
                  :before-leave="beforeLeave"
                  @tab-click="tabClick">
                    <el-tab-pane name="0" label="基本信息">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addForm.goods_name"></el-input>            
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addForm.goods_price" type="number"></el-input>            
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addForm.goods_weight" type="number"></el-input>            
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addForm.goods_number" type="number"></el-input>            
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                            <el-cascader
                                v-model="addForm.goods_cat"
                                :options="cateList"
                                :props="addCascader"
                                @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane name="1" label="商品参数">
                        <el-form-item :label="item.attr_name" v-for="item in manyList" :key="item.attr_id">
                            <!-- 复选框 -->
                            <el-checkbox-group v-model="item.attr_vals">
                                <el-checkbox border :label="item2" v-for="(item2,index) in item.attr_vals" :key="item2.index"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane name="2" label="商品属性">
                        <el-form-item :label="item.attr_name" v-for="item in onlyList" :key="item.attr_id">
                            <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane name="3" label="商品图片">
                        <!-- action 表示图片要上传到后台ApI地址 -->
                        <el-upload
                            :action="uploadUrl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            list-type="picture"
                            :headers="headers"
                            :on-success="handleSuccess">
                            <el-button  size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane name="4" label="商品内容">
                        <!-- 富文本编辑器 -->
                        <quill-editor v-model="addForm.goods_introduce"></quill-editor>
                        <el-button type="primary" @click="add" class="btnAdd">添加商品</el-button>
                    </el-tab-pane>

                </el-tabs>
            </el-form>         
        </el-card>
        <!-- 图片预览对话框 -->
        <el-dialog
            title="图片预览"
            :visible.sync="previewVisible"
            width="50%">
            <img :src="previewPath" alt="">
        </el-dialog>
    </div>
</template>

<script>

import {goodsList,getAttributes,addGoods} from 'api/api.js'

import breadCrumb from 'components/breadCrumb/breadCrumb'
import _ from 'lodash'

export default {
    name:'addGoods',
    data(){
        return{
            activeIndex:'0',
            addForm:{//添加商品的表单
                goods_name:'',
                goods_cat:[],//商品所属的分类数组
                goods_price:0,
                goods_number:0,
                goods_weight:0,
                goods_introduce:'',//商品的详情描述
                pics:[],//图片的数组
                attrs:[],
            },
            addFormRules:{
                goods_name:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                goods_price:[
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                ],
                goods_weight:[
                    { required: true, message: '请输入商品重量', trigger: 'blur' },
                ],
                goods_number:[
                    { required: true, message: '请输入商品数量', trigger: 'blur' },
                ],
                goods_cat:[
                    { required: true, message: '请选择商品分类', trigger: 'blur' },
                ]
            },
            cateList:[],
            addCascader:{
                expandTrigger: 'hover',
                label:'cat_name',
                value:'cat_id',
                children:'children'
            },
            manyList:[],
            onlyList:[],
            uploadUrl:'http://127.0.0.1:8888/api/private/v1/upload',//图片上传的地址
            headers:{//图片上传请求头对象
                Authorization : window.sessionStorage.getItem('token')
            },
            previewPath:'',
            previewVisible:false,
        }
    },
    created(){
        this.goodsList();
    },
    computed:{
        cateId(){
            if(this.addForm.goods_cat.length ===3){
                return this.addForm.goods_cat[2]
            }
            return null
        }
    },
    methods:{
        goodsList(){
            goodsList().then(res=>{
                console.log(res)
                this.cateList = res.data
            })
        },
        handleChange(){
            console.log(this.addForm.goods_cat)
        },
        beforeLeave(activeName,oldActiveName){
            // console.log(activeName,oldActiveName)
            if(oldActiveName === '0' && this.addForm.goods_cat.length !==3){
                this.$message.error('请选择商品分类')
                return false
            }
            
        },
        tabClick(){
            // console.log(this.activeIndex)
            switch(this.activeIndex){
                case '1': //访问动态参数面板
                    // console.log('动态参数面板')
                    getAttributes(this.cateId,'many').then(res=>{
                        // console.log(res)
                        res.data.forEach(item=>{
                        item.attr_vals = item.attr_vals.length ===0 ? [] : item.attr_vals.split(' ')
                        })
                        this.manyList = res.data
                    })
                break;
                case '2':  //  
                    getAttributes(this.cateId,'only').then(res=>{
                        console.log(res)
                        this.onlyList = res.data
                    })
                break    
            }
           
        },
        handlePreview(file){//图片预览
            console.log(file)
            this.previewPath = file.response.data.url;
            this.previewVisible = true
        },
        handleRemove(file){//移除图片
            console.log(file)
            //1.获取将要删除的图片的临时路径
            const filePath = file.response.data.tmp_path
            //2.从pics数组中，找到这个图片对应的索引值
            const i = 
            this.addForm.pics.findIndex(x =>
                x.pic === filePath)
            //3.调用数组的splice方法，把图片信息对象，从pics数组中移除
            this.addForm.pics.splice(i,1)
            console.log(this.addForm)
        },
        handleSuccess(response){//监听图片上传成功的事件
            console.log(response)
            //1.拼接得到一个图片信息对象
            const picInfo = {pic:response.data.tmp_path}
            //2.将图片信息对象，push到 pics数组中
            this.addForm.pics.push(picInfo)
            console.log(this.addForm)
        },
        add(){//添加商品
            this.$refs.addFormRef.validate(valid=>{
                if(!valid){
                    return this.$message.error('请填写必要的表单项目')
                }
                //执行添加
                //ladash cloneDeep(obj)
                const from = _.cloneDeep(this.addForm)
                from.goods_cat =
                from.goods_cat.join(',');
                //处理动态参数  静态属性
                this.manyList.forEach(item =>{
                    const newInfo = {attr_id:item.attr_id,attr_value:item.attr_vals.join( )}
                    this.addForm.attrs.push(newInfo)
                })
                this.onlyList.forEach(item =>{
                    const newInfo = {attr_id:item.attr_id,attr_value:item.attr_vals}
                    this.addForm.attrs.push(newInfo)
                })
                from.attrs = this.addForm.attrs
                console.log(from,'////')
                //发起请求 添加商品
                addGoods(
                    from.goods_name,
                    from.goods_cat,
                    from.goods_price,
                    from.goods_number,
                    from.goods_weight,
                    from.goods_introduce,
                    from.pics,
                    from.attrs
                    ).then(res=>{
                    console.log(res)
                    if(res.meta.status !==201){
                        return this.$message.error('添加商品失败')
                    }
                    this.$message.success('添加商品成功')
                    this.$router.push('/goods')
                })
            })
        },
    },
    components:{
        breadCrumb
    },
}
</script>

<style>
   .el-checkbox{
       margin: 0 10px 0 0!important;
   }
   .btnAdd{
       margin-top:15px ;
   }
</style>


