import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import home from '@/views/home/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login',
      component:login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
  ]
})

//挂在路由导航守卫
router.beforeEach((to,from,next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数 表示放行
  if(to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login');
  next()
})

export default router