<template>
    <el-row :gutter="20">
        <el-col :span="6">
             <el-input placeholder="请输入内容" @clear="searchUser" v-model="query2" clearable>
                <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span="6">
            <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
        <add-user :addUserVisible.sync="addUserVisible" v-on="$listeners"></add-user>
    </el-row>
</template>

<script>

import AddUser from './AddUser'

export default {
    name:'Search',
    data(){
        return{
            addUserVisible:false,
            query2:this.query,
        }
    },
    props:{
        getUsers:{
            type: Function,
            default: null
        },
        query:{
            type:String
        },
    },
    mounted(){
        // console.log(this.query2 === this.query)
    },
    methods:{
        addUser(){
            this.addUserVisible = true
        },
        searchUser(){
            // console.log(this.query2,'///')
            this.$emit('newQuery',this.query2)
        },
    },
    inheritAttrs: false,
    components:{
        AddUser,
    },
}
</script>

<style>

</style>