<template>
    <div class="home">
        <button @click="logOut">退出</button>
    </div>
</template>

<script>
export default {
    name:'home',
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

</style>