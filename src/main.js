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
// axios.defaults.baseURL = ''
// Vue.prototype.$axios = axios

/* eslint-disable no-new */

//引入树形插件
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable);

////////////////
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt;
};  
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
//////////////////
Vue.filter('dateFormat',function(originval){
    const dt = new Date(originval);

    const y = dt.getFullYear();
    const m = (dt.getMonth()+1 + '').padStart(2,0);
    const d = (dt.getDate()+'').padStart(2,0);
    const hh = (dt.getHours() + '').padStart(2,0)
    const mm = (dt.getMinutes() + '').padStart(2,0)
    const ss = (dt.getSeconds() + '').padStart(2,0)

  //  return 'yyyy-mm-dd hh:mm:ss' 
   return `${y}-${m}-${d} ${hh}:${mm}:${ss}` 
})

////引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
