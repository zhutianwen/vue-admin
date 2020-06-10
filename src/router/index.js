import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import home from '@/views/home/home'
import welcome from '@/views/welcome/welcome'
import users from '@/views/users/users'
import rights from '@/views/power/rights'
import roles from '@/views/power/roles'
import goods from '@/views/commodity/goods/goods'
import params from '@/views/commodity/params/params'
import categories from '@/views/commodity/categories/categories'

Vue.use(Router)

const router = new Router({
  mode:'history',
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
      component: home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:welcome
        },
        {
          path:'/users',
          component:users
        },
        {
          path:'/rights',
          component:rights
        },
        {
          path:'/roles',
          component:roles
        },
        {
          path:'/goods',
          component:goods
        },
        {
          path:'/params',
          component:params
        },
        {
          path:'/categories',
          component:categories
        },
      ]
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