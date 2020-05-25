<template>
    <el-aside :class="isCollapse?width1:width2" :width="isCollapse?width1:width2">
        <div class="toggle-button" @click="toogle">| | |</div>
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409bff"
      unique-opened
       :collapse="isCollapse"
       :collapse-transition="false"
       router
        :default-active="activePath">
      <!-- 一级菜单 -->
      <el-submenu :index="item.id+''" v-for="item in menusList" :key="item.id">
        <template slot="title">
          <i :class="iconObject[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index=" '/' + subItem.path"
         v-for="subItem in item.children"
          :key="subItem.id"
          @click="menuClick('/' + subItem.path)">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
            </template>
        </el-menu-item>
        <!--  -->
      </el-submenu>
    </el-menu>
    </el-aside>
</template>

<script>

import {getMenus} from 'api/api.js'

export default {
    name:'leftPart',
    data(){
        return{
            menusList:[],
            iconObject:{
                '125':'iconfont icon-yonghu1',
                '103':'iconfont icon-quanxian',
                '101':'iconfont icon-shangpinguanli',
                '102':'iconfont icon-dingdanguanli',
                '145':'iconfont icon-icon-test',
            },
            isCollapse:false,
            width1:'width1',
            width2:'width2',
            activePath:'',
        }
    },
    created(){
        this.getMenus();
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods:{
        getMenus(){
            getMenus().then(res => {
                this.menusList = res.data
                // console.log(this.menusList)
            })
        },
        toogle(){//侧边栏展开折叠
            this.isCollapse = !this.isCollapse
        }, 
        menuClick(activePath){
            // console.log(activePath,'///')
           window.sessionStorage.setItem('activePath',activePath) 
           this.activePath = activePath
        }
    }, 
}
</script>

<style>
    .iconfont{
        margin-right: 5px;
    }
    .el-menu{
        border: none;
    }
    .toggle-button{
        text-align: center;
        line-height: 24px;
        align-items: center;
        color: #fff;
        background: #4a5064;
        cursor: pointer;
    }
    .width1{
        width: 64px;
        transition: all 0.3s;
    }
    .width2{
        width: 200px;
        transition: all 0.3s;
    }
</style>