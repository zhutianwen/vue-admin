<template>
    <el-container class="home-container">
        <el-header>
            <topPart></topPart>
        </el-header>
        <el-container>
            <!-- 左侧菜单栏 -->
            <!-- <el-aside width="200px"> -->
                <leftPart></leftPart>
            <!-- </el-aside> -->
            <!-- 右侧 -->
            <rightPart></rightPart>
        </el-container>
    </el-container>
</template>

<script>

import topPart from "./children/topPart";
import leftPart from './children/leftPart'
import rightPart from './children/rightPart'

export default {
    name:'home',
    data(){
        return{
           
        }
    },
    methods:{
                   
    },
    components:{
        topPart,
        leftPart,
        rightPart
    },
}
</script>

<style>
    .home-container{
        height: 100%;
    }
  
    .el-aside{
        background: #333744;
    }
    .el-main{
        background: #eaedf1;
    }
    .left-ico{
        display: flex;
        align-items: center;
    }
    .left-ico span{
        margin-left: 15px;
    }
    .left-ico img{
        width: 15%;
    }
    
</style>