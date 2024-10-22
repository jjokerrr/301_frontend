import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import echarts from 'echarts';
// Vue.prototype.$echarts = echarts;
import axios from 'axios'
Vue.prototype.axios = axios;
import qs from 'qs'
Vue.prototype.qs = qs;
import Cookies from 'js-cookie'
// Vue.use(ElementUI);
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

Vue.config.productionTip = false
// 引入BootStrap
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video


// require('video.js/dist/video-js.css')
// import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
