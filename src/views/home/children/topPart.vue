<template>
    <div class="el-header">
      <div class="left-ico">
            <img src="~assets/images/shop.png" alt="">
            <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logOut">退出</el-button>
    </div>
</template>

<script>
export default {
    name:'topPart',
    methods:{
        logOut(){
            window.sessionStorage.clear();
            this.$router.push({
                path:'/login'
            })
        },
    },
}
</script>

<style>
    .el-header{
        background: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 20px;
        width: 100%;
    }
</style>