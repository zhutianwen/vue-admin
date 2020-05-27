// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入全局样式
import 'assets/css/glob.css'


//引入阿里巴巴矢量图标
import './fonts/iconfont.css'

//引入axios
// import axios from 'axios'
// axios.defaults.baseURL = ''
// Vue.prototype.$http = axios

// import axios from 'axios'
// axios.defaults.baseURL = '/api'
// Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
